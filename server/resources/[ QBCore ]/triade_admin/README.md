# Triade Admin

Painel administrativo completo para a **Base Triade** (vRP + ox_inventory + ox_lib + oxmysql).
Interface NUI em tema escuro com 16 abas: Servidor, Jogadores, Advertencias, Mapa, Chamados,
Setagem, Alterar RG, Itens, Veiculos, Locais, Clima, Personagens, Metricas, Registos,
Ferramentas e Resources.

---

## Instalacao

1. A pasta ja esta em `server/resources/[ Gerais ]/triade_admin`.
   Como o `server.cfg` ja faz `ensure "[ Gerais ]"`, o recurso arranca sozinho.
   Se preferir controlar a ordem, adicione depois de `ensure "[ Gerais ]"`:

   ```cfg
   ensure triade_admin
   ```

2. As tabelas SQL sao criadas automaticamente no arranque. Para importar a mao existe
   o ficheiro `install.sql`.

3. Abrir o painel: comando `/painel` (ou `/adm`, `/admin`).
   Abrir chamados (jogador): comando `/chamado`.
   Ambos sao configuraveis em `config.lua` > `TriadeAdmin.Open`.

> **Porque nenhum dos dois tem tecla por omissao?** Nao ha tecla livre nesta base. O `F11` e do
> `triade_identity` e as F1-F10 tambem estao todas tomadas. Quando dois recursos registam a
> mesma tecla o FiveM dispara **os dois** -- nao ha prioridade, e `DisableControlAction` nao
> alcanca este tipo de bind. Os dois comandos continuam a aparecer em
> *Definicoes > Atalhos de Teclado > FiveM* para quem quiser atribuir uma tecla.
>
> Se um dia fixar uma tecla no config, lembre-se que mudar o `defaultKey` **nao move a tecla de
> quem ja entrou** -- o FiveM guarda o bind no perfil do jogador. Tem de mudar tambem o NOME do
> comando (`triade_admin_panel` / `triade_admin_ticket`).

---

## Dependencias

| Recurso        | Para que serve                                   |
| -------------- | ------------------------------------------------ |
| `vrp`          | Passaportes, identidade, grupos, dinheiro        |
| `ox_lib`       | Callbacks cliente/servidor                       |
| `oxmysql`      | Base de dados                                    |
| `ox_inventory` | Itens e inventario (opcional, com fallback vRP)  |

---

## Cargos e permissoes

Os cargos do painel estao em `config.lua` > `TriadeAdmin.Roles` e sao resolvidos pelas
permissoes vRP que o jogador ja tem:

| Cargo         | Resolve por                                         |
| ------------- | --------------------------------------------------- |
| Dono          | `Admin-1` (tier 1 do grupo Admin — `Owner`)         |
| Administrador | `Admin-2` (tier 2 — `Admin`)                        |
| Moderador     | `Admin-3` (tier 3 — `Mod`)                          |
| Suporte       | `Admin-4` (tier 4 — `Sup`)                          |

> **Porque `Admin-N` e nao `owner.permissao`?** Nesta base `hasPermission(uid, "Admin")` casa
> com **qualquer** tier do grupo, e `"Owner"`/`"Mod"`/`"Sup"` nao resolvem de todo (sao o campo
> `Group` da hierarquia, nao chaves de `Groups`). Alem disso, as strings `.permissao` so
> resolvem com o jogador **online** -- para offline o vRP compara com a coluna `permiss`, que
> guarda o nome do grupo. `Admin-N` acerta nos dois casos.

> **Staff fora de servico nao abre o painel.** O `/staff` do `Controller` renomeia o grupo para
> `waitAdmin` na tabela `permissions`. E de proposito, e vale para o painel todo.

Cada acao do painel tem uma chave de permissao (`TriadeAdmin.Permissions`) com o valor
padrao por cargo. O Dono pode ligar/desligar qualquer uma em tempo real na aba
**Servidor > Permissoes do Painel** — as alteracoes ficam guardadas em
`triade_admin_permissions` e sao validadas **no servidor** em cada chamada, nao apenas na UI.

### Protecao de hierarquia

- Nenhum membro da staff consegue executar acoes sobre alguem de cargo igual ou superior.
- Nenhum membro consegue conceder ou remover um cargo que dê acesso igual ou superior ao seu
  (excepto o Dono).

---

## Abas

### Servidor
Permissoes do painel, historico de ban/unban (com staff, ID, data, hora e motivo) e os comandos
gerais: liberar/remover whitelist, banir, desbanir, consultar RG, aviso geral, adicionar/remover
dinheiro, mensagem privada, advertencia, ir ao waypoint, teleportar por coordenadas, hash do
veiculo, reparar veiculo, reviver todos, limpar veiculos, limpar props, deletar veiculo e limpar
dados do ID.

### Jogadores
Contadores de online (total, staff, mecanicos, policia, medicos, ilegais — configuraveis em
`TriadeAdmin.Counters`), busca por nome/ID, carteira, banco, multas, advertencias, ping, cargos
e as acoes rapidas: ir ate, puxar, ver tela, reviver, congelar, descongelar, mensagem, advertencia,
RG, adicionar/remover dinheiro, limpar armas, kick, banir. Inclui inspecao de inventario com
busca, adicionar item, remover item e limpar inventario.

### Advertencias
Totais, castigos ativos, jogadores advertidos, busca por ID/nome/sobrenome/motivo/staff, tabela
com motivo, tempo, data, hora, staff responsavel e ID da staff, ranking por jogador, botao para
libertar do castigo e para excluir a advertencia.

O castigo usa uma dimensao isolada (`TriadeAdmin.Warn.Bucket`) e sobrevive a reconexao:
ao voltar, o jogador continua o tempo que faltava.

### Mapa
Mapa em tempo real com os jogadores online, ID, ping e dimensao. Suporta arrastar, zoom com a
roda do rato, botoes +/-, tela cheia e, ao clicar num marcador, puxar / ir ate / congelar / ver tela.

Se os marcadores ficarem deslocados no seu servidor, ajuste `TriadeAdmin.Map` em `config.lua`
(`minX`, `maxX`, `minY`, `maxY`) — a imagem usada e `web/img/map.png` (2048x2048).

### Chamados
Sistema completo: o jogador abre por `/chamado` (ou pela tecla que tiver atribuido) e escolhe
Staff, Policia, Mecanica ou Hospital; a staff com a permissao correspondente recebe um popup no jogo com **Aceitar** / **Fechar**. No painel ficam
os chamados abertos, historico, ranking da staff, avaliacoes (estrelas + comentario) e notas
da staff (media, melhor e pior nota, quantidade de atendimentos). Depois de finalizado, o jogador
recebe a janela de avaliacao.

### Setagem
Carrega um passaporte, mostra os cargos atuais (com remover) e todos os cargos disponiveis lidos
do `Groups.lua` da vRP, com organizacao, tipo e nivel, mais busca por cargo ou organizacao.

### Alterar RG
Consulta por passaporte e altera individualmente: ID, nome, sobrenome, idade, telefone, RG,
carteira e banco. Telefone e RG sao validados contra duplicados. A troca de ID so e permitida
com o jogador offline e com o passaporte de destino livre, e migra `permissions`, `vrp_user_data`,
`vehicles`, `accounts_ids`, advertencias e chamados.

> A idade e guardada na coluna `age` da tabela `characters` se ela existir; caso contrario fica em
> `vrp_user_data` (chave `triade:age`). O painel deteta isto sozinho no arranque.

### Itens
Lista todos os itens do servidor (ox_inventory + `Itemlist.lua` da vRP) com imagem, busca por nome
ou spawn e spawn com quantidade e passaporte de destino. **Paginada** — ver abaixo.

### Veiculos
Separa **Veiculos do jogo** e **Veiculos addon**. Acoes: spawnar, spawnar pelo nome, dar veiculo na
garagem, remover da garagem, reparar, tunar, deletar e adicionar veiculo ao catalogo.
As tres listas (jogo, addon e a garagem do ID) sao **paginadas**, e cada uma guarda a sua propria
pagina. A busca da garagem aceita tambem a **placa**.

#### Paginacao

As listas grandes -- centenas de veiculos e o catalogo de itens inteiro -- nao cabem numa pagina
so. Cada uma tem uma barra **em cima e em baixo** da grelha com:

- quantos esta a ver de quantos (`337-384 de 999`);
- quantos por pagina: 24, 48 (padrao), 96 ou 200;
- primeira / anterior / **campo para escrever o numero da pagina** / proxima / ultima.

Detalhes que valem a pena saber:

- **Buscar volta a pagina 1.** Sem isso, procurar uma coisa estando na pagina 9 mostrava grelha
  vazia.
- **Trocar o numero por pagina mantem o lugar.** Estando no item 433, passar de 48 para 96 por
  pagina leva-o para a pagina que contem o 433, nao para a pagina 1.
- **Cada aba guarda a sua pagina.** Sair dos addons na pagina 4 e voltar leva-o de volta a
  pagina 4 dos addons.
- **Folhear a garagem nao refaz o pedido ao servidor** -- a lista fica em cache e so e pedida
  outra vez quando o passaporte muda ou quando um veiculo e removido.

> Antes disto o codigo cortava as listas em `.slice(0, 600)` **sem avisar ninguem**: quem
> procurasse pela busca encontrava, mas quem quisesse folhear nao via nada depois do item 600 e
> nada na tela dizia que havia mais.

#### So mostra o que esta mesmo no jogo

O catalogo do servidor e montado a partir de FICHEIROS -- o `config/Vehicles.lua` da vRP, o que
a concessionaria vende e os `vehicles.meta` dos packs -- e nenhuma dessas fontes sabe se o carro
nasce. Tres formas de estar listado e nao existir: o pack foi retirado e o catalogo ficou para
tras, o meta declara e o `.yft` nao esta la, ou e um DLC que a lista antiga da vRP nao cobre.

Por isso a aba **pergunta ao jogo**: o cliente do admin que a abre responde com
`GetAllVehicleModels()`, e o resultado fica em cache para todos. O que nao existir e escondido.

Nada e apagado em silencio -- uma faixa diz quantos e quando foi validado, e um botao mostra-os
marcados como **NAO ESTA NO JOGO**. Neles o Spawn e o Dar ficam bloqueados (dar um destes cria
carro fantasma na garagem); o Remover continua ativo, que e como se limpa um que ja la esteja.

A lista de addons vem de `data/vehicles_addon.json`. O gerador confere o `.yft` de cada modelo:
so entram os que tem ficheiro, e os outros ficam em `semAsset` para o diagnostico os nomear.

#### Capturar as imagens a partir do jogo

Os packs desta base **nao trazem miniatura nenhuma** -- varri o NewCars inteiro (443 `.ytd`,
28.126 texturas, 8 `.rar`) e nao ha uma unica imagem de catalogo. Dos 383 addons, 15 tem
imagem; os outros 368 so podem sair do proprio jogo.

O cartao **Imagens dos veiculos**, na aba Veiculos, faz isso: isola voce num mundo vazio, poe
cada carro parado no ar, enquadra-o pelo tamanho real do modelo e grava o `.png` com o nome do
spawn direto em `TriadeAdmin.Capture.Folder`. Um lote de 368 leva cerca de 25 minutos.

> **Voce fica preso enquanto corre** -- e o seu cliente que desenha a cena. Da para parar a
> qualquer momento pelo botao, e se cair o lote para sozinho. No fim volta ao sitio onde estava.

Precisa do `screenshot-basic` a correr e do catalogo ja validado no jogo (basta ter aberto a
aba Veiculos uma vez). O que ja foi capturado fica registado, entao "Capturar as que faltam"
pode ser corrido varias vezes sem repetir trabalho. Angulo, hora, clima e pasta ficam em
`config.lua` > `TriadeAdmin.Capture`.

#### Porque nao e gerado dentro do jogo

O sandbox de Lua do FXServer nao deixa lancar processos: `io.popen` existe mas devolve sempre `nil`.
Sem isso nao ha forma de listar pastas de dentro de um recurso, por isso a varredura corre **fora**
do jogo.

#### Depois de instalar ou remover carros addon

1. Corre o gerador (faz duplo clique ou executa na consola):

   ```
   tools\gerar_catalogo.bat        (Windows)
   tools/gerar_catalogo.sh         (Linux)
   ```

   Ele varre todos os `vehicles.meta` do servidor e reescreve `data/vehicles_addon.json`.

2. Recarrega o catalogo na consola do servidor, sem reiniciar:

   ```
   triadeadmin_veiculos
   ```

Para um carro isolado nao precisas do gerador: usa **Adicionar veiculo** na propria aba, que guarda
em `triade_admin_catalog` e recarrega logo.

### Locais
Categorias com contagem, criacao de categoria, cadastro de local (coordenada atual capturada
automaticamente ou escrita a mao), busca, teleporte e exclusao.

### Personagens
A tabela `characters` inteira -- online ou nao -- com banco, multas, veiculos, advertencias,
telefone e RG por personagem, e as marcas de ONLINE, BANIDO e SEM WL. Busca por passaporte,
nome, sobrenome, telefone ou RG. Paginada **no servidor**: o cliente so recebe a pagina que
pediu. Atalhos para Alterar RG, Setagem, banir/desbanir e apagar dados.

### Metricas
Totais do servidor (personagens, contas, whitelist, banidos, veiculos, casas, advertencias,
chamados), o dinheiro guardado, o uptime e quatro rankings de 25: maiores saldos, mais veiculos,
maiores dividas em multas e mais advertencias.

> A **carteira nao entra** em nenhum total. E o item `dollars` do ox_inventory e so existe para
> quem esta ligado -- somar isso daria um numero que muda conforme quem esta online.

### Registos
Duas vistas:

**Acoes da staff** -- tudo o que foi executado pelo painel (`triade_admin_logs`), com quem
executou, quando e sobre quem. Busca livre e atalhos pelas acoes mais frequentes. O Dono pode
limpar tudo ou so o que for mais antigo que N dias.

**Chat da staff** -- conversa interna da equipa, guardada em `triade_admin_chat`, portanto
sobrevive a restart. Chega ao vivo a toda a staff online que tenha `chat.read`; quem estiver
noutra aba recebe um aviso. Quem tem `chat.read` mas nao `chat.send` le sem escrever.

### Ferramentas
**Em voce:** modo divindade e invisibilidade. Os dois sao reaplicados num laco lento de
proposito -- o ped do jogador e trocado varias vezes nesta base (reviver, roupa, creator) e o
efeito perder-se-ia sozinho. Parar o recurso desfaz os dois.

**Veiculo atual ou o mais proximo (8 m):** lavar, encher o tanque, trancar e destrancar.

**Opcoes de programador:** mostrar veiculos / peds / objetos / coordenadas por cima do jogo,
info da entidade na mira (modelo, hash, tipo, coordenadas, heading, net id), distancia de visao
e apagar o ped ou o objeto mais proximo. Custam FPS enquanto ligadas.

### Resources
Lista de todos os recursos com estado, versao, filtros (todos / a correr / parados), busca e
paginacao. Iniciar, parar e reiniciar. **So do Dono.**

Os recursos de `TriadeAdmin.ProtectedResources` nao podem ser parados nem reiniciados pelo
painel: parar o proprio `triade_admin` prende a NUI com o rato capturado, e parar a `vrp` ou o
`oxmysql` derruba o servidor. A interface desativa os botoes e o servidor recusa na mesma.
Iniciar continua permitido -- e o caminho de recuperacao.

> Se parar um recurso aqui e ele voltar a ligar sozinho, e o **AdminControl**: ele religa
> recursos parados quando um admin cria item, loja ou garagem pelo `/adm` dele.

### Clima
Os 15 climas, clima atual, congelar clima, clima rotativo, barra de horario global e congelar
horario. Usa o mesmo `GlobalState` do `Controller/Weather` da base (`weatherSync`, `clockHours`,
`clockMinutes`, `freezeTime`), por isso nao entra em conflito com `/weather` e `/time`.

---

## Imagens

As imagens de itens e veiculos sao servidas pelo proprio recurso a partir do disco
(`server/sv_assets.lua`), sem embalar nada no `resource.rpf`. As pastas pesquisadas estao em
`TriadeAdmin.Images.Folders`. Se a imagem nao existir localmente, a NUI tenta o CDN de
`TriadeAdmin.Images.RemoteURL`.

Nesta base **nao ha pasta de imagens dentro de nenhum recurso**: o `ox_inventory` carrega tudo
do CDN que o `Reborn.images()` devolve (`vrp/Base_Config.lua:23`), e esse CDN e o XAMPP desta
propria maquina. Por isso o painel aponta direto para o disco -- nao depende da rede nem do
Apache estar de pe:

```
C:/xampp/htdocs/imagens    2556 ficheiros (itens)
C:/xampp/htdocs/vehicles   2509 ficheiros (veiculos)
C:/xampp/htdocs/img
@will_battlepass/html/images
```

Para limpar a cache de imagens sem reiniciar o recurso:

```
triadeadmin_cache
```

---

## Instalar noutra base

O painel deteta e regista o ambiente no arranque:

| O que deteta | Como se adapta |
| ------------ | -------------- |
| Inventario | Usa `ox_inventory` se estiver a correr; senao cai nas funcoes nativas da vRP |
| Garagens | `qs-advancedgarages` (`owned_vehicles` + `vehicles`), `will_garages_v2`, ou so a tabela `vehicles` |
| Coluna de identificador | `characters.identifier` ou `characters.steam`, o mesmo para `accounts` |
| Idade | Coluna `characters.age` se existir; senao guarda em `vrp_user_data` |
| Pastas de imagens | Por nome de recurso (`@recurso/sub`), caminho absoluto ou relativo a `resources/` |
| Clima | Confirma se o `GlobalState` da base tem `weatherSync` e `clockHours` |
| Cargos e veiculos | Lidos do `Groups.lua` e do `vehicleGlobal()` da propria base |
| Tabelas do personagem | Mapa de `sv_character.lua` validado contra o `INFORMATION_SCHEMA` |

**O que NAO se adapta sozinho** e tem de ser revisto a mao noutra base: os cargos
(`TriadeAdmin.Roles`), os contadores, os tipos de chamado e as categorias de locais. Todos
dependem dos nomes de grupo daquela base.

Nada disto e obrigatorio: o que faltar e marcado como indisponivel e a funcionalidade
correspondente degrada, em vez de rebentar.

### Confirmar que ficou bem

Com `TriadeAdmin.Diagnostics.OnStart` e `SelfTestOnStart` a `true` (o padrao), cada arranque
imprime na consola:

1. **Relatorio de compatibilidade** — estado de cada recurso, tabelas em falta, colunas
   detetadas, sondagem da API da vRP, pastas de imagens resolvidas, contagens do registo
   interno e a lista de avisos.
2. **Auto-teste** — executa as 20 consultas de leitura do painel **sem precisar de ninguem
   ligado**, com o tempo de resposta de cada uma. Valida todo o SQL e a integracao com a vRP
   antes de alguem sequer abrir o painel.

Podes correr os dois a qualquer momento:

```
triadeadmin_diagnostico
triadeadmin_selftest
```

Quando estiver tudo validado, poe os dois flags a `false` no `config.lua` para o arranque
ficar silencioso.

> **Limitacao honesta:** o `Proxy` da vRP cria closures para qualquer nome, por isso nao ha
> forma de saber se uma funcao existe apenas indexando-a - so chamando. A sondagem cobre as
> funcoes de **leitura** (`getUsers`, `Groups`, `vehicleGlobal`, `format`, `getUserGroups`);
> as que alteram dados nao sao sondadas porque teriam efeito colateral.

---

## Comandos de consola

| Comando                  | Efeito                                       |
| ------------------------ | -------------------------------------------- |
| `triadeadmin_veiculos`   | Recarrega o catalogo e forca nova validacao no jogo |
| `triadeadmin_veiculos_fantasma` | Lista o que esta no catalogo e nao existe no jogo |
| `triadeadmin_captura`    | Estado da captura de imagens e quantos faltam |
| `triadeadmin_itens`      | Recarrega o catalogo de itens                |
| `triadeadmin_cache`      | Limpa a cache do servidor de imagens         |
| `triadeadmin_diagnostico`| Relatorio de compatibilidade da base         |
| `triadeadmin_selftest`   | Auto-teste das 20 consultas do painel        |
| `triadeadmin_personagem <id>` | **Simula** um wipe: mostra o que seria apagado, sem apagar |

---

## Exports

```lua
exports["triade_admin"]:hasPanelAccess(source) -- true se o jogador tem acesso ao painel
exports["triade_admin"]:panelRole(source)      -- "dono" | "admin" | "mod" | "sup" | nil
```

Para fechar o painel a alguem a partir de outro recurso:

```lua
TriggerClientEvent("triade_admin:closePanel", source)
```

---

## Registo de acoes

Tudo o que a staff executa fica em `triade_admin_logs` (staff, ID, acao, detalhes, data) e,
se `config/webhooks.lua` da vRP tiver `webhookadmin` configurado, tambem e enviado para o Discord.
