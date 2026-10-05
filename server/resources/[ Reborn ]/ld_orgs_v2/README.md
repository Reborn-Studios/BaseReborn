# ld_orgs_v2

Painel de organizações para FiveM/vRP, com vínculos e tempo online separados por organização.

## Configuração e abertura

- `config.lua`: opções gerais, Discord e permissões disponíveis.
- `groups.lua`: organizações, cargos, salários e metas. Cada cargo deve pertencer a uma única organização.
- `/painelfac`: abre diretamente com um vínculo; com vários, mostra o seletor.
- `/painelfac Hospital`: abre a organização indicada se o jogador tiver vínculo.
- `/paineladm Hospital`: atribui ao administrador o cargo de `tier = 1` nessa organização e abre o painel. Os nomes dos comandos de abertura ficam em `Config.Main.cmd` e `Config.Main.cmdAdm`.
- `/blacklist ID`: remove a blacklist de convites do jogador indicado.
- A blacklist de convites é global. O tempo online conta em todos os vínculos e é salvo em lote a cada 60 segundos e ao desconectar.

As permissões administrativas ficam em `Config.Permissions`, no `config.lua`:

| Opção | Ação | Valor inicial |
| --- | --- | --- |
| `adminPanel` | Usar o comando administrativo de abertura | `admin.permissao` |
| `removeBlacklist` | Usar `/blacklist ID` | `admin.permissao` |

Informe os nomes de permissão usados pela sua base. As permissões dos cargos dentro do painel continuam em `Config.defaultPermissions` e são editadas pelo líder na interface.

## Organizações e hierarquia

Em `groups.lua`, a chave da organização deve corresponder ao grupo do vRP. A organização `LSCustoms` usa o mesmo nome do grupo no vRP e dispensa o campo `permission`. Se os nomes forem diferentes em outra organização, use esse campo opcional para informar o grupo correspondente.

Cada chave de `List` identifica um cargo do script e deve ser única entre as organizações. `prefix` é o nome exibido; `tier` define o nível da hierarquia no vRP, com `1` para o líder. As chaves não são apenas textos visuais: também identificam permissões e uniformes salvos.

## Integrações no servidor

```lua
-- Log de depósito no baú: ID permanente, ação, item, quantidade, organização.
exports.ld_orgs_v2:addLogChest(user_id, "deposit", "bandage", 10, "Hospital")

-- Log de retirada no baú.
exports.ld_orgs_v2:addLogChest(user_id, "withdraw", "bandage", 2, "Hospital")

-- Meta: contabiliza uma vez em cada organização do jogador que configure o item.
exports.ld_orgs_v2:addGoal(user_id, "bandage", 10)

-- Salário: ID permanente, intervalo em minutos, valor, validade em dias, organização.
exports.ld_orgs_v2:addOrganizationPayday(user_id, 60, 1000, 7, "Hospital")

-- Atualize os vínculos após uma alteração externa de grupos.
exports.ld_orgs_v2:syncPlayer(user_id)
-- Alternativa ao export; basta usar uma das opções.
TriggerEvent("ld_orgs_v2:syncPlayer", user_id)
```

Nos exports de baú e salário, a organização pode ser omitida quando o jogador tiver apenas um vínculo. Com vários vínculos, informe o destino; o painel aberto não determina a organização.

Os eventos `vRP:playerJoinGroup` e `vRP:playerLeaveGroup` atualizam o cache automaticamente. Integrações que alterem grupos sem emitir esses eventos precisam chamar `syncPlayer` após a alteração. O export e o evento enfileiram a atualização do jogador, agrupando chamadas repetidas; o retorno do export confirma o agendamento. Use as APIs da base para adicionar e remover grupos.

O `functions.lua` usa `vRP.getGroup`, `vRP.addUserGroup` e `vRP.removeUserGroup`. A leitura usa a consulta `vRP/get_perm` da base para confirmar os dados persistidos; a inicialização reutiliza os registros obtidos em lote. Tabelas antigas que guardam diretamente o nome do cargo também são aceitas.

As chamadas da interface ficam no client. `CallPanelServer` envia a sessão da abertura atual; o servidor rejeita pedidos de um painel que já foi fechado ou substituído por outra organização.

## Instalação e banco

Inicie o recurso após o vRP e o oxmysql. A migração de `ld_orgs_player_infos` é automática: `server/core/members.lua` verifica a chave e, quando necessário, altera para `(user_id, organization)`, preservando os registros e garantindo o índice da organização. Essa rotina está no código; não depende de arquivo SQL externo nem de execução manual.

`web/src/` contém a interface. Execute `npm run build` dentro de `web` para atualizar `web/build`, que é carregado pelo recurso. Consulte [web/README.md](web/README.md) para o fluxo de edição da NUI.

Ao mover o projeto, mantenha o nome do recurso `ld_orgs_v2` e copie também `server/core` e `web/build`. Os caminhos de carregamento são relativos à pasta do recurso. Confira a compatibilidade das APIs de grupos e do banco ao trocar de base.

## Uniformes por cargo

Em Configurações, escolha o cargo na seção Uniforme por cargo e edite as roupas masculina e feminina. O botão Vestir consulta no servidor o cargo atual do jogador na organização aberta. Campos vazios removem o uniforme daquele sexo. O uniforme geral antigo é reaproveitado como configuração inicial de cada cargo; ao salvar, os cargos passam a ser gravados separadamente no mesmo campo do banco, sem alteração da tabela. Somente o líder pode editar.

## Metas por item

Cada item tem quantidade, ativação e pagamento próprios. O líder edita pelo lápis à direita do contador. Itens sem pagamento salvo recebem o `defaultReward` vigente da organização, e o valor é persistido; editar um item não altera os demais. O resgate diário soma os pagamentos dos itens ativos e exige concluir todos eles. Itens desativados ficam fora do total. No calendário dos membros, o dia fica completo após a conclusão e o resgate do pagamento de todas as metas ativas.

Em `config.lua`, `Config.Main.itemImagesUrl` define a pasta das imagens (padrão: `https://api.rebornsystem.com.br/imagens/`). A interface busca `<URL>/<item>.png`, por exemplo `bandage.png`.

## Armazém

A tela mostra os últimos 150 registros, com filtros de depósitos e retiradas e o maior registro de cada tipo. O inventário deve chamar `addLogChest` após uma movimentação bem-sucedida, usando `deposit` ou `withdraw`. A integração atual do `AdminControl` envia apenas depósitos; para retiradas reais, também precisa enviar a chamada `withdraw` acima. Com múltiplos vínculos, informe a organização do baú no último argumento.

`addLogChest` registra somente o histórico: não movimenta o inventário nem soma metas. Envie o identificador do item, como `bandage`, para que o nome e a imagem sejam resolvidos corretamente. Os registros expiram conforme `Config.Main.clearChestLogs`.

## Avisos e aparência

Novos avisos capturam a mugshot do personagem ao publicar e salvam a miniatura junto do aviso. A foto continua disponível após a saída do jogador; avisos antigos sem imagem usam um avatar padrão. Não é necessário um recurso externo de mugshot.

O seletor mostra o logo e a cor principal de cada organização. Sem configuração própria, usa o logo de `Config.Main.serverLogo` e as cores padrão. Excluir uma parceria, salvar cores ou restaurar as cores padrão exige confirmação. As cores são aplicadas sem fechar o painel, e Escape fecha primeiro a modal aberta.
