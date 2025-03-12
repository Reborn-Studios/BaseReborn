Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
DesmancheServer = Tunnel.getInterface("Desmanche")
---------------------------------------------------------------------
-- VARIAVEIS
---------------------------------------------------------------------
local veh = nil
local etapa = 0
local placa = nil
local PosVeh = {}
local TipoVeh = ""
local PecasVeh = 0
local nomeCarro = nil
local modeloCarro = nil
local PecasRemovidas = {}
local qtdPecasRemovidas = 0
local proximoDesmanche = false
---------------------------------------------------------------------
-- CODIGO
---------------------------------------------------------------------
CreateThread(function()
    for _,v in pairs(Farms.desmanche) do
        local laptop = CreateObject(GetHashKey("prop_laptop_lester"),v.Computador[1], v.Computador[2], v.Computador[3]-0.97,true,true,true)
        SetEntityHeading(laptop, v.Computador[4])
    end
    while true do
        local index = nil
        local trava = 3000
        local lastDist = 20.0
        local ped = PlayerPedId()
        local pedCoords = GetEntityCoords(ped)
        for k,v in pairs(Farms.desmanche) do
            local distance = #(pedCoords - vector3(v.IniciarServico[1],v.IniciarServico[2],v.IniciarServico[3]))
            if distance <= lastDist then
                index = k
                lastDist = distance
            end
        end
        if index then
            if not proximoDesmanche then
                if etapa == 0 then
                    local IniciarServico = Farms.desmanche[index].IniciarServico
                    local dist = Vdist(pedCoords.x,pedCoords.y,pedCoords.z, IniciarServico[1], IniciarServico[2], IniciarServico[3])
                    if dist < 10 then
                        trava = 4
                        if dist < 1 then
                            local LocalDesmancharCarro = Farms.desmanche[index].LocalDesmancharCarro
                            Text3D(IniciarServico[1], IniciarServico[2], IniciarServico[3]-0.5, '~y~[E] ~w~PARA DESMANCHAR O VEÍCULO')
                            DrawMarker(21, LocalDesmancharCarro[1], LocalDesmancharCarro[2], LocalDesmancharCarro[3]-0.5, 0, 0, 0, 180.0, 0, 0, 0.4, 0.4, 0.4, 207, 158, 25, 150, false, false, 0, true)
                            if IsControlJustPressed(1,38) then
                                if DesmancheServer.CheckPerm(index) then
                                    veh = CheckVeiculo(LocalDesmancharCarro[1], LocalDesmancharCarro[2], LocalDesmancharCarro[3])
                                    if veh then
                                        local VehPermitido,ClasseVeh = CheckClasse(veh)
                                        placa = GetVehicleNumberPlateText(veh)
                                        if GetResourceState("will_garages_v2") == "started" then
                                            nomeCarro = exports['will_garages_v2']:getModelName(veh)
                                        else
                                            nomeCarro = vRP.getModelName(veh)
                                        end
                                        modeloCarro = GlobalState['VehicleGlobal'] and GlobalState['VehicleGlobal'][nomeCarro] and GlobalState['VehicleGlobal'][nomeCarro].name or nomeCarro
                                        if VehPermitido then
                                            if nomeCarro then
                                                if DesmancheServer.CheckItem(index) then
                                                    if ClasseVeh == 8 then
                                                        TipoVeh = 'moto'
                                                    else
                                                        TipoVeh = 'carro'
                                                    end
                                                    TriggerEvent('Notify', 'sucesso', 'Veículo identificado: <br>Veículo: <b>' .. modeloCarro .. ' (' .. nomeCarro.. ')</b><br>Placa: <b>'..placa..'</b><br><br>Continue. Pegue as ferramentas para desmanchar o veículo.', 8000)
                                                    etapa = 1
                                                    FreezeEntityPosition(veh, true)
                                                    SetVehicleDoorsLocked(veh, 4)
                                                else
                                                    TriggerEvent('Notify', 'negado', 'Você necessita de um <b>'..Farms.desmanche.ItemNecessario..'</b> para iniciar o serviço.', 6000)
                                                    DesmancheServer.backIniciado(index)
                                                end
                                            else
                                                TriggerEvent('Notify', 'negado', 'Esse veículo não pode ser desmanchado.', 6000)
                                                etapa = 0
                                                DesmancheServer.backIniciado(index)
                                            end
                                        else
                                            TriggerEvent('Notify', 'negado', 'Esse veículo não pode ser desmanchado.', 6000)
                                            etapa = 0
                                            DesmancheServer.backIniciado(index)
                                        end
                                    else
                                        TriggerEvent('Notify', 'negado', 'Não há nenhum carro próximo para ser desmanchado.', 4000)
                                        DesmancheServer.backIniciado(index)
                                    end
                                else
                                    TriggerEvent('Notify', 'negado', 'Você não tem permissao para fazer isso.', 4000)
                                end
                            end
                        end
                    end
                elseif etapa == 1 then
                    local LocalFerramentas = Farms.desmanche[index].LocalFerramentas
                    local dist = Vdist(pedCoords.x,pedCoords.y,pedCoords.z, LocalFerramentas[1], LocalFerramentas[2], LocalFerramentas[3])
                    if dist < 10 then
                        trava = 4
                        DrawMarker(21, LocalFerramentas[1], LocalFerramentas[2], LocalFerramentas[3]-0.5, 0, 0, 0, 180.0, 0, 0, 0.4, 0.4, 0.4, 207, 158, 25, 150, false, false, 0, true)
                        if dist < 1 then
                            Text3D(LocalFerramentas[1], LocalFerramentas[2], LocalFerramentas[3]-0.5, '~y~[E] ~w~PARA PEGAR AS ~y~FERRAMENTAS')
                            if IsControlJustPressed(0,38) and veh then
                                if TipoVeh == 'carro' then
                                    PosVeh['Porta_Direita'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"handle_dside_f"))
                                    PosVeh['Porta_Esquerda'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"handle_pside_f"))
                                    PosVeh['Roda_EsquerdaFrente'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"wheel_lf"))
                                    PosVeh['Roda_DireitaFrente'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"wheel_rf"))
                                    PosVeh['Roda_EsquerdaTras'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"wheel_lr"))
                                    PosVeh['Roda_DireitaTras'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"wheel_rr"))
                                    PosVeh['Capo'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"bumper_f"))
                                    PecasVeh = 6
                                else
                                    PosVeh['Roda_Frente'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"wheel_lf"))
                                    PosVeh['Roda_Tras'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"wheel_lr"))
                                    PosVeh['Banco'] = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh,"chassis_dummy"))
                                    PecasVeh = 3
                                end
                                FreezeEntityPosition(ped, true)
                                SetEntityCoords(ped, LocalFerramentas[1], LocalFerramentas[2], LocalFerramentas[3]-0.97)
                                SetEntityHeading(ped, LocalFerramentas[4])
                                vRP._playAnim(false, {"amb@medic@standing@kneel@idle_a", "idle_a"}, true)
                                TriggerEvent('Progress', 5000, 'PEGANDO FERRAMENTAS')
                                Wait(5000)
                                etapa = 2
                                TriggerEvent('Notify', 'sucesso', 'Você pegou todas as ferramentas, vá e desmanche o veículo.', 6000)
                                FreezeEntityPosition(ped, false)
                                ClearPedTasks(ped)
                            end
                        end
                    end
                elseif etapa == 2 then
                    if qtdPecasRemovidas == PecasVeh then
                        etapa = 3
                        TriggerEvent('Notify', 'sucesso', 'Veículo desmanchado, vá até a bancada e anuncie o chassi do veículo.', 6000)
                    end
                    for k , v in pairs(PosVeh) do
                        local x,y,z = table.unpack(v)
                        if not PecasRemovidas[k] then
                            local dist = Vdist(pedCoords.x,pedCoords.y,pedCoords.z,x,y,z)
                            if dist < 10 then
                                trava = 4
                                DrawMarker(21, x, y, z+1, 0, 0, 0, 180.0, 0, 0, 0.4, 0.4, 0.4, 207, 158, 25, 150, false, false, 0, true)
                                if dist < 1.0 then
                                    if IsControlJustPressed(0, 38) and veh then
                                        TaskTurnPedToFaceEntity(ped,veh,500)
                                        Wait(500)
                                        if k == 'Capo' or k == 'pMalas' then
                                            vRP._playAnim(false, {"mini@repair", "fixing_a_player"}, true)
                                        elseif k == 'Porta_Direita' or k == 'Porta_Esquerda' or k == 'Banco' then
                                            vRP._playAnim(false,{task='WORLD_HUMAN_WELDING'},true)
                                        else
                                            vRP._playAnim(false, {"amb@medic@standing@tendtodead@idle_a" , "idle_a"}, true)
                                        end
                                        Wait(5000)
                                        ClearPedTasks(ped)
                                        PecasRemovidas[k] = true
                                        qtdPecasRemovidas = qtdPecasRemovidas + 1
                                        if k == 'Roda_EsquerdaFrente' then
                                            SetVehicleTyreBurst(veh, 0, true, 1000)
                                            TriggerEvent("Notify","sucesso","Pneu removido com sucesso, guarde ele para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_wheel_tyre",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Roda_DireitaFrente' then
                                            SetVehicleTyreBurst(veh, 1, true, 1000)
                                            TriggerEvent("Notify","sucesso","Pneu removido com sucesso, guarde ele para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_wheel_tyre",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Roda_EsquerdaTras' then
                                            SetVehicleTyreBurst(veh, 4, true, 1000)
                                            TriggerEvent("Notify","sucesso","Pneu removido com sucesso, guarde ele para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_wheel_tyre",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Roda_DireitaTras' then
                                            SetVehicleTyreBurst(veh, 5, true, 1000)
                                            TriggerEvent("Notify","sucesso","Pneu removido com sucesso, guarde ele para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_wheel_tyre",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Porta_Direita' then
                                            SetVehicleDoorBroken(veh, 0, true)
                                            TriggerEvent("Notify","sucesso","Porta removida com sucesso, guarde ela para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_car_door_01",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Porta_Esquerda' then
                                            SetVehicleDoorBroken(veh, 1, true)
                                            TriggerEvent("Notify","sucesso","Porta removida com sucesso, guarde ela para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_car_door_01",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Capo' then
                                            SetVehicleDoorBroken(veh, 4, true)
                                        elseif k == 'Roda_Frente' then
                                            SetVehicleTyreBurst(veh, 0, true, 1000)
                                            TriggerEvent("Notify","sucesso","Pneu removido com sucesso, guarde ele para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_wheel_tyre",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        elseif k == 'Roda_Tras' then
                                            SetVehicleTyreBurst(veh, 4, true, 1000)
                                            TriggerEvent("Notify","sucesso","Pneu removido com sucesso, guarde ele para desmanchar o restante..")
                                            vRP._playAnim(true,{{"anim@heists@box_carry@","idle"}},true)
                                            vRP._CarregarObjeto("anim@heists@box_carry@","idle","prop_wheel_tyre",50,28422,0.0,-0.10,-0.2,0.0,0.0,0.0) -- 50,28422,0.07,0.1,-0.21,100.0,0.5,0.1
                                        end
                                        proximoDesmanche = true
                                    end
                                end
                            end
                        end
                    end
                elseif etapa == 3 then
                    local AnuncioChassi = Farms.desmanche[index].AnuncioChassi
                    local dist = Vdist(pedCoords.x,pedCoords.y,pedCoords.z, AnuncioChassi[1], AnuncioChassi[2], AnuncioChassi[3])
                    if dist < 10 then
                        trava = 4
                        DrawMarker(21, AnuncioChassi[1], AnuncioChassi[2], AnuncioChassi[3]-0.5, 0, 0, 0, 180.0, 0, 0, 0.4, 0.4, 0.4, 207, 158, 25, 150, false, false, 0, true)
                        if dist < 1 then
                            Text3D(AnuncioChassi[1], AnuncioChassi[2], AnuncioChassi[3]-0.5, '~y~[E] ~w~PARA ANUNCIAR O ~y~CHASSI')
                            if IsControlJustPressed(0,38) then
                                FreezeEntityPosition(ped, true)
                                SetEntityCoords(ped, AnuncioChassi[1], AnuncioChassi[2], AnuncioChassi[3]-0.97)
                                SetEntityHeading(ped, AnuncioChassi[4])
                                vRP._playAnim(false, {"anim@heists@prison_heistig1_p1_guard_checks_bus", "loop"}, true)
                                TriggerEvent('Progress', 5000, 'ANUNCIANDO CHASSI DO VEÍCULO')
                                Wait(5000)
                                FreezeEntityPosition(ped, false)
                                ClearPedTasks(ped)
                                DesmancheServer.GerarPagamento(placa, nomeCarro, modeloCarro, index)
                                DeletarVeiculo(veh)
                                etapa = 0
                                PosVeh = {}
                                PecasRemovidas = {}
                                qtdPecasRemovidas = 0
                                PecasVeh = 0
                            end
                        end
                    end
                end
            else
                local localPecas = Farms.desmanche[index].LocalPecas
                local dist = Vdist(pedCoords.x,pedCoords.y,pedCoords.z, localPecas[1], localPecas[2], localPecas[3])
                if dist < 10 then
                    trava = 4
                    DrawMarker(21, localPecas[1], localPecas[2], localPecas[3]-0.5, 0, 0, 0, 180.0, 0, 0, 0.7, 0.7, 0.7, 207, 198, 25, 150, false, false, 0, true)
                    if IsControlJustPressed(1,38) and dist < 2 then
                        proximoDesmanche = false
                        vRP.removeObjects()
                        TriggerEvent('Notify', 'aviso', 'Peça guardada, pegue a proxima.', 6000)
                    end
                end
            end
        end
        if etapa > 0 then
            if IsControlJustPressed(0,168) then
                etapa = 0
                FreezeEntityPosition(PlayerPedId(), false)
                ClearPedTasks(PlayerPedId())
                if veh then
                    FreezeEntityPosition(veh, false)
                end
                if index then
                    DesmancheServer.backIniciado(index)
                end
                etapa = 0
                PosVeh = {}
                PecasRemovidas = {}
                qtdPecasRemovidas = 0
                PecasVeh = 0
                TriggerEvent('Notify', 'aviso', 'Você cancelou o serviço.', 6000)
            end
        end
        Wait(trava)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- Check Classe
-----------------------------------------------------------------------------------------------------------------------------------------
function CheckClasse(vehicle)
    local classe = GetVehicleClass(vehicle)
    if classe ~= 0 and classe ~= 1 and classe ~= 2 and classe ~= 3 and classe ~= 4 and classe ~= 5 and classe ~= 6 and classe ~= 7 and classe ~= 8 and classe ~= 9 and classe ~= 11 and classe ~= 12 then
        return false, 0
    else
        return true,classe
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TEXT3D
-----------------------------------------------------------------------------------------------------------------------------------------
function Text3D(x,y,z,text)
	local onScreen,_x,_y = World3dToScreen2d(x,y,z)
	SetTextFont(4)
	SetTextScale(0.35,0.35)
	SetTextColour(255,255,255,150)
	SetTextEntry("STRING")
	SetTextCentre(true)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text))/370
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,80)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VERIFICAR VAGA VAGA
-----------------------------------------------------------------------------------------------------------------------------------------
function CheckVeiculo(x,y,z)
    local check = GetClosestVehicle(x,y,z,5.001,0,71)
    if DoesEntityExist(check) then
        return check
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DELETAR VEICULO
-----------------------------------------------------------------------------------------------------------------------------------------
function DeletarVeiculo(vehicle)
    TriggerServerEvent("will_garages_v2:syncDeleteVehicle",VehToNet(vehicle))
end
