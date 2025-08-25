-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")

Cloakroom = Tunnel.getInterface("Cloakrooms")

CreateThread(function()
    while true do
        local timeDistance = 1000
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)
        for k,v in pairs(Services) do
            local distance = #(coords - vector3(v[2],v[3],v[4]))
            if distance <= 10 then
                timeDistance = 4
                DrawMarker(23,v[2],v[3],v[4]-0.99, 0, 0, 0, 0, 0, 0, 0.7, 0.7, 0.5, 95, 140, 50, 240, false, false, 0, false)
                if distance <= 2 then
                    DrawBase3D(v[2],v[3],v[4]+0.1, "[ ~y~"..v[1].."~w~ ]")
                    DrawBase3D(v[2],v[3],v[4], "Aperte ~y~E~w~ para abrir o sistema")
                    if IsControlJustPressed(0,38) then
                        local checkPermission,checkLider,uniforms = Cloakroom.requestPermission(k)
                        if checkPermission then
                            exports["dynamic"]:AddMenu("Equipar","Todas os uniformes de sua corporação.","uniforms")
                            exports["dynamic"]:AddButton("Sair","Retirar o seu uniforme.","Cloakrooms:applyPreset","sairPtr","uniforms",true)
                            if checkLider then
                                exports["dynamic"]:AddMenu("Opções","Gerenciamento de uniformes líder.","optionsUniforms")
                                exports["dynamic"]:AddButton("Adicionar","Adicione o uniforme que está em seu corpo.","Cloakrooms:applyPreset","apply-"..k,"optionsUniforms",true)
                                if uniforms and uniforms[1] then
                                    exports["dynamic"]:AddMenu("Remover","Remover uniformes.","removeUniforms")
                                    for _,x in pairs(uniforms) do
                                        exports["dynamic"]:AddButton(x.name,"Remover roupa.","Cloakrooms:applyPreset",'remove-'..x.name,"removeUniforms",true)
                                    end
                                end
                            end
                            if uniforms then
                                for _,x in pairs(uniforms) do
                                    exports["dynamic"]:AddButton(x.name,"Roupa para utilizar em serviço.","Cloakrooms:applyPreset",x.name,"uniforms",true)
                                end
                            end
                            exports["dynamic"]:Open()
                        end
                    end
                end
            end
        end
        Wait(timeDistance)
    end
end)