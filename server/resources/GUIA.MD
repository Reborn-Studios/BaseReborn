# Guia da base

## Economia

### Salários:

[`[ System ] > vrp > Reborn > Groups.lua > (salary)`](./[%20System%20]/vrp/Reborn/Groups.lua)

### Empregos:

[`[ Reborn ] > will_jobs > Config.lua > (levelRewards)`](./[%20Reborn%20]/will_jobs/Config.lua)

### Compra de veiculos:

[`[ Reborn ] > will_conce_v2 > config.lua > config.veiculos`](./[%20Reborn%20]/will_conce_v2/config.lua)

## Locais

| Facs/Orgs     | Farms         | Inicio                    | Baus                      | Farm Loc                  |
| ------------- | ------------- | ------------------------- | ------------------------- | ------------------------- |
| **Vermelhos** | Maconha       | `1329.17,-157.73,111.33`  | `1200.60,-93.10,74.08`    | `99.78,6344.38,31.38`     |
| **Azuis**     | Cocaina       | `2230.08,149.66,224.11`   | `2250.59,52.02,251.41`    | `-1105.13,4952.35,218.65` |
| **Verdes**    | Metanfetamina | `1869.64,472.17,171.52`   | `1982.65,497.33,167.94`   | `1493.17,6390.24,21.26`   |
| **Bahamas**   | Itens ilegais | `-1884.33,2036.26,140.75` | `-1884.34,2069.88,145.58` | `-1855.11,2056.79,135.46` |
| **Mafia**     | Armas         | `575.42,-3122.05,18.77`   | `-2679.79,1336.11,144.25` | `-2678.92,1330.06,140.89` |
| **Milicia**   | Munição       | `1400.4,1125.07,114.34`   | `889.58,1143.94,326.97`   | `897.84,1152.0,333.66`    |
| **Motoclub**  | Desmanche     | `982.66,-104.24,74.85`    | `977.22,-104.03,74.85`    | `474.78,-1308.48,29.2`    |
| **Vanilla**   | Lavagem       | `133.22,-1306.38,29.14`   | `90.03,-1290.90,29.27`    | `97.48,-1293.61,29.33`    |
| **Policia**   | -----------   | `94.53,-383.45,43.62`     | `-1077.92,-815.81,11.04`  | ----------------------    |
| **Hospital**  | -----------   | `1152.53,-1524.83,36.52`  | `-465.81,-293.78,34.92`   | ----------------------    |

### Favelas

Favela 1 - Cemiterio - -1757.05,-83.48,99.72
Favela 2 - -771.07,1018.94,278.06
Favela 3 - 1442.08,-1421.55,95.56
Favela 4 - 2001.88,-1178.5,150.72
Favela 5 - -1926.13,756.52,181.29
Favela 6 - 2602.37,1807.34,53.89
Favela 7 - 2541.97,2529.91,56.5
Favela 12 - -2937.08,1406.89,83.2
Favela 15 - -328.0,1575.83,369.68
Favela 16 - 494.51,931.39,257.03
Favela 17 - 1685.17,6488.25,47.26
Favela 18 - Rio da barragem - 2046.32,464.35,218.59
Favela 19 - Helipa - 1385.13,-768.03,106.61
Favela 20 - barragem - 1269.05,-87.82,122.6

### Mansões

Acapulco: 764.78, 3407.21, 64.71
Atlanta: -116.89, 984.38, 238.32
Bahamas -2706.31, -67.52, 18.61
Baltimore -1994.09, -636.68, 8.45
Branca -884.07, 38.78, 50.85
Casa Hospital -821.33, 269.65, 87.93
Detroit -773.64, 334.43, 243.21
Malibu -3272.46, 503.24, 8.48
Miami: -2582.18, 1920.52, 168.88

### Ilegais

Motoclub 1013.15, -2522.91, 30.26
Neko nightclub 373.07, 256.37, 104.51
Vanilla 130.16, -1303.96, 30.16
Yakuza -952.81, -1477.31, 8.68
Manicomio -1568.18, 771.91, 189.61
ModernHouse (Mafia) -2658.65, 1324.79, 149.41
Vinhedo -1891.82, 2049.56, 142.16

### Legais

Juridico -542.68, -208.37, 39.34
Catcafe -580.85, -1074.33, 24.22
Hospital 1152.53, -1524.83, 36.52
DP 94.53, -383.45, 43.62

## Mudanças

### Alterar Farms:

[`[ Reborn ] > ld_routes > config.lua`](./[%20Reborn%20]/ld_routes/config.lua)

[`[ Gerais ] > Farms > Config.lua`](./[%20Gerais%20]/Farms/Config.lua)

### Adicionar garagens/veiculos:

`/addgarage` ou `/adm2` - Comando para criar garagem dentro do jogo

### Criar item

[`[ Scripts ] > ox_inventory > data > items.lua`](./[%20Scripts%20]/ox_inventory/data/items.lua)

### Alterar Baús:

> Baú so aparece para quem tiver com o grupo correto

> Criação com `/stashes` ou em

[`[ Scripts ] > ox_inventory > data > stashes.lua`](./[%20Scripts%20]/ox_inventory/data/stashes.lua)

### Painel de facção

[`[ Reborn ] > ld_factions > config > config.lua`](./[%20Reborn%20]/ld_factions/config/config.lua)

### Rotas e crafts

[`[ Reborn ] > ld_routes > config.lua`](./[%20Reborn%20]/ld_routes/config.lua)

### Webhooks

[`[ System ] > vrp > Reborn > webhooks.lua`](./[%20System%20]/vrp/Reborn/webhooks.lua)

### Documentação:

- [Ox Lib](https://overextended.dev/ox_lib)
- [Ox Inventory](https://overextended.dev/ox_inventory)
- [Ox Target](https://overextended.dev/ox_target)

# COMANDOS ADM

`/adm` - Painel de admin <br>
`/adm2` - Painel de configurações <br>
`/doorlock` - Painel para controle das portas <br>
`/item (item) (quantidade)` - Pegar item <br>
`/itemall (item) (quantidade)` - Dar item para todos do server <br>
`/skin (id) (model)` - Setar modelo no ped <br>
`/debug` - Modo debug <br>
`/capuz` - Retirar capuz <br>
`/kick (id)` - Kickar ID <br>
`/ban (id)` - Banir ID <br>
`/unban (id)` - Desbanir ID <br>
`/wl (id)` - Liberar wl <br>
`/unwl (id)` - Retirar wl <br>
`/money (quantidade)` - Pegar dinheiro <br>
`/tpcds` - Ir até uma cds <br>
`/cds` - Pegar CDS <br>
`/cds2` - Pegar CDS com Heading (Rotaçao) <br>
`/tptome (id)` - Puxar player <br>
`/tpto (id)` - Ir para o player <br>
`/tpway` - Ir até a marcaão do mapa <br>
`/group (id) (grupo?)` - Setar grupo em um usuario <br>
`/ungroup (id) (grupo)` - Retirar grupo de um usuario <br>
`/rg (id)` - Informaçoes do ID <br>
`/rg2 (id)` - Setagem do ID <br>
`/limparinv (id)` - Limpar inventario de um ID <br>
`/getcar` - Informaçoes para setar veiculo <br>
`/hash` - Pegar hash do veiculo <br>
`/delnpcs (range)` - Deleta npcs mortos por perto <br>
`/tuning` - Tunar veiculo <br>
`/limparea` - Limpa a area por perto <br>
`/players` - Quantidade de players online <br>
`/pon` - Players no chat <br>
`/anuncio` - Soltar anuncio <br>
`/pegarip (id)` - Pegar IP do player <br>
`/spec (id)` - Spectar player <br>
`/kill (id)` - Matar player <br>
`/id` - Pegar id do player proximo <br>
`/freeze (id)` - Congelar player <br>
`/dm (id)` - Mandar mensagem privada para player <br>
`/checar (grupo)` - Retorna todos players que possuem o grupo <br>
`/setdoor` - Setar porta <br>
`/deus` - Tirar/devolver poderes <br>
`/god (id)` - Reviver player <br>
`/good (id)` - Reviver com colete, fome e sede cheio <br>
`/wall` - Informaçoes dos jogadores por perto <br>
`/time (horas) (minutos)` - Setar horario do jogo <br>
`/weather (tempo)` - Setar tempo do jogo <br>
`/addgarage` - Adicionar garagem no jogo <br>
`/car (veiculo)` - Spawnar veiculo <br>
`/dv` - Deletar veiculo proximo <br>
`/fix` - Reparar veiculo proximo <br>
`/remprisao (id)` - Retirar da prisao<br>
`/kickall` - Kickar todos os players <br>
`/addcar (id) (veiculo)` - Adicionar veiculo para o jogador <br>
`/remcar (id) (veiculo)` - Remover veiculo do jogador <br>
`/addtempcar (id) (veiculo) (dias)` - Adicionar veiculo temporario para o jogador <br>
`/coins (id) (quantidade)` - Adicionar coins para o jogador <br>
`/money (id) (quantidade)` - Adicionar money para o jogador <br>

### ARMAS

> WEAPON_MINISMG <br>
> WEAPON_SNSPISTOL <br>
> WEAPON_ASSAULTSMG <br>
> WEAPON_PISTOL_MK2 <br>
> WEAPON_ASSAULTRIFLE <br>
> WEAPON_MACHINEPISTOL <br>
> WEAPON_SPECIALCARBINE <br>
> WEAPON_SMG <br>
> WEAPON_BZGAS <br>
> WEAPON_COMBATPDW <br>
> WEAPON_STUNGUN_MP <br>
> WEAPON_PUMPSHOTGUN <br>
> WEAPON_CARBINERIFLE <br>
> WEAPON_SMOKEGRENADE <br>

### MUNIÇÕES

> ammo-9 <br>
> ammo-22 <br>
> ammo-38 <br>
> ammo-44 <br>
> ammo-45 <br>
> ammo-50 <br>
> ammo-emp <br>
> ammo-rifle <br>
> ammo-flare <br>
> ammo-sniper <br>
> ammo-musket <br>
> ammo-rifle2 <br>
> ammo-shotgun <br>
> ammo-heavysniper <br>
