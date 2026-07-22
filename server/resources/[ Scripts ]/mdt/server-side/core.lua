-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module('vrp','lib/Tunnel') or {}
local Proxy = module('vrp','lib/Proxy') or {}
vRP = Proxy.getInterface('vRP')
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface('mdt', Creative)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
Patrols = {}
Operations = {}
local Index = 0
local Permission = {}

vRP.Prepare("accounts/All","SELECT id,registration,phone,name,name2,bank FROM characters WHERE deleted = 0")
vRP.Prepare("characters/Characters","SELECT * FROM characters WHERE identifier = @License and deleted = 0")
vRP.Prepare("vehicles/plateVehicles","SELECT * FROM vehicles WHERE plate = @Plate")
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEPARTMENT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Department(Group)
	local source = source
	local Passport = vRP.Passport(source)
	Permission[Passport] = Passport and Group and vRP.HasPermission(Passport, Group) and Group or false
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PENALCODE 
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PenalCode(Mode)
    if Mode == "Arrest" then
        local Articles = exports['oxmysql']:query_async("SELECT id AS Id, id AS Value, Section, Article, Contravention, Fine, Arrest, Bail, `Order` FROM mdt_penalcode_articles")
      return Articles
  elseif Mode == "Fine" then
      local Articles = exports['oxmysql']:query_async("SELECT id AS Id, id AS Value, Article, Contravention, Fine, Bail, Arrest, CONCAT(Article, ' - ', Contravention) AS Label FROM mdt_penalcode_articles WHERE Fine > 0")
      return Articles
  else
      local Data = {}
      local Sections = exports['oxmysql']:query_async("SELECT id, `Order`, Type, Description, Title FROM mdt_penalcode_sections")
      for _, Section in ipairs(Sections) do
          local Articles = exports['oxmysql']:query_async("SELECT id AS Id, Article, Contravention, Fine, `Order`, Bail, Arrest FROM mdt_penalcode_articles WHERE Section = ?", { Section.id })
          Data[tostring(Section.id)] = { Order = Section.Order, Infractions = Articles, Id = Section.id, Type = Section.Type, Description = Section.Description, Title = Section.Title }
      end
      return Data
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEPENALCODE 
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreatePenalCode(Mode,Data)
	if Mode == "Section" then
		local Order = 0
		local Consult = exports["oxmysql"]:query_async('SELECT * FROM mdt_penalcode_sections')
		if Consult and #Consult > 0 then
			for k,v in pairs(Consult) do
				Order = v.Order + 1
			end
		else
			Order = 1
		end
		exports['oxmysql']:insert_async('INSERT INTO mdt_penalcode_sections (Title, Description, Type, `Order`) VALUES (?, ?, ?, ?)', { Data.Title, Data.Description, Data.Type, Order })
	elseif Mode == "Article" then
		local Order = 0
		local Consult = exports["oxmysql"]:query_async('SELECT * FROM mdt_penalcode_articles WHERE Section = ?', { Data.Section })
		if Consult and #Consult > 0 then
			for k,v in pairs(Consult) do
				Order = v.Order + 1
			end
		else
			Order = 1
		end
		exports['oxmysql']:insert_async('INSERT INTO mdt_penalcode_articles (Section, Article, Contravention, Fine, Bail, Arrest, `Order`) VALUES (?, ?, ?, ?, ?, ?, ?)', { Data.Section, Data.Article, Data.Contravention, Data.Fine, Data.Bail, Data.Arrest or false, Order })
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEPENALCODE 
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdatePenalCode(Id,Mode,Data)
  local source = source
	if Mode == "Section" then
		exports['oxmysql']:execute_async('UPDATE mdt_penalcode_sections SET Title = ?, Description = ?, Type = ? WHERE id = ?', { Data.Title, Data.Description, Data.Type, Id })
	elseif Mode == "Article" then
		exports['oxmysql']:execute_async('UPDATE mdt_penalcode_articles SET Article = ?, Contravention = ?, Fine = ?, Bail = ?, Arrest = ? WHERE id = ?', { Data.Article, Data.Contravention, Data.Fine, Data.Bail, Data.Arrest, Id })
	end
  TriggerClientEvent("mdt:Refresh",source,"Open")
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DESTROYPENALCODE 
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DestroyPenalCode(Id,Mode)
	if Mode == "Section" then
		exports['oxmysql']:execute_async('DELETE FROM mdt_penalcode_sections WHERE id = ?', { Id })
	elseif Mode == "Article" then
		exports['oxmysql']:execute_async('DELETE FROM mdt_penalcode_articles WHERE id = ?', { Id })
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ORDERPENALCODE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.OrderPenalCode(Id, Mode, Direction, Section)
	local Table, Clause, Values

	if Mode == "Article" then
		Table = "mdt_penalcode_articles"
		Clause = "`id` = ? AND `Section` = ?"
		Values = { Id, Section }
	elseif Mode == "Section" then
		Table = "mdt_penalcode_sections"
		Clause = "`id` = ?"
		Values = { Id }
	else
		return false
	end

	local Current = exports["oxmysql"]:single_async(('SELECT `Order` FROM %s WHERE %s'):format(Table, Clause), Values)
	if not Current or not Current.Order then
		return false
	end

	local CurrentOrder = Current.Order
	local NewOrder = Direction == "Up" and CurrentOrder - 1 or CurrentOrder + 1

	if NewOrder == CurrentOrder then
		return false
	end

	local Conflicted = exports["oxmysql"]:single_async(('SELECT `id` FROM %s WHERE `Order` = ?'):format(Table), { NewOrder })
	if Conflicted and Conflicted.id then
		local BumpOrder = Direction == "Up" and NewOrder + 1 or NewOrder - 1
		exports['oxmysql']:execute_async(('UPDATE %s SET `Order` = ? WHERE `Order` = ?'):format(Table), { BumpOrder, NewOrder })
	end

	exports['oxmysql']:execute_async(('UPDATE %s SET `Order` = ? WHERE %s'):format(Table, Clause), { NewOrder, table.unpack(Values) })
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Player()
    local source = source
    local Passport = vRP.Passport(source)
    local Groups = vRP.Groups()
    local PoliceGroups = {}
    for k,v in pairs(Groups) do
        if v["QBESXGroup"] and v["QBESXGroup"] == "police" then
            PoliceGroups[k] = true
        end
    end

    if not Permission[Passport] then
        for Group,v in pairs(PoliceGroups) do
            if vRP.HasPermission(Passport, Group) then
                Permission[Passport] = Group
                break
            end
        end
    end
    if not Permission[Passport] then
        Permission[Passport] = "police"
    end
    local Hierarchy, Name = vRP.HasPermission(Passport, Permission[Passport])
    local Player = { Name = vRP.FullName(Passport), Level = Hierarchy, Avatar = "", Passport = Passport }
    local Permissions = Config.OtherPermissions[Permission[Passport]]?[Hierarchy] or Config.OtherPermissions[Permission[Passport]] or Config.Permissions
    local Group = { Max = vRP.Permissions(Permission[Passport], 'Members'), Name = Name, Hierarchy = vRP.Hierarchy(Permission[Passport]), }

    return { Group, Player, Permissions }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HOME
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Home()
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]

  local Consult = exports["oxmysql"]:query_async('SELECT * FROM mdt_board WHERE Permission = @Permission', { Permission = Permission })

  local Title = "Titulo do aviso"
  local Description = "Descrição do aviso."
  if Consult and Consult[1] then
    Title = Consult[1].Title or Title
    Description = Consult[1].Description or Description
  end
  local Divisions = {}
  local Hierarchy = vRP.Hierarchy(Permission) or {}
  for Level, _ in pairs(Hierarchy) do
    Divisions[#Divisions + 1] = { Amount = vRP.AmountService(Permission,Level), Name = vRP.NameHierarchy(Permission,Level) }
  end
  return { Title = Title, Description = Description, Divisions = Divisions }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEBOARD
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdateBoard(Title,Description)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Board == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', ' Você não possui permissões necessárias.', 'vermelho')
      return false
  end

  local Consult = exports["oxmysql"]:query_async('SELECT * FROM mdt_board WHERE Permission = @Permission', { Permission = Permission })
  if Consult[1] then
    exports['oxmysql']:execute_async('UPDATE mdt_board SET Title = ?, Description = ? WHERE Permission = ?', { Title,Description,Permission })
  else
    exports['oxmysql']:execute_async('INSERT INTO mdt_board (Title, Description, Permission) VALUES (?, ?, ?)', { Title,Description,Permission })
  end

  local Name = vRP.FullName(Passport)
  local Groups = vRP.NumPermission(Permission)
  for _, Target in pairs(Groups) do
    if Target ~= source then
      TriggerClientEvent('Notify', Target, Name, '<b class=\'text-white\'>'..Title..'</b>: '.. Description, 'amarelo')
    end
  end

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEARCHOFFICER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.SearchOfficer(Search,Select)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Search = tostring(Search):lower()
  local Results = {}

  local Groups = vRP.DataGroups(Permission)
  for Target in pairs(Groups) do
      local Identity = vRP.Identity(Target)
      if Identity then
          local Found = false
          if tostring(Target) == Search then
              Found = true
          else
              if Identity['name'] and Identity['name']:lower():find(Search) then
                  Found = true
              elseif Identity['name2'] and Identity['name2']:lower():find(Search) then
                  Found = true
              end
          end

          if Found then
              Results[#Results+1] = { Passport = Target,Name = vRP.FullName(Target) }
          end
      end
  end

  return Results
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEARCHOFFICER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.SearchUser(Search,Select)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Search = tostring(Search):lower()
  local Results = {}

  local Consult = vRP.Query("accounts/All")
  for _, Character in pairs(Consult) do
      local Identity = vRP.Identity(Character.id)
      if Identity then
        local Found = false
        if tostring(Character.id) == Search then
            Found = true
        else
            if Identity['name'] and Identity['name']:lower():find(Search) then
                Found = true
            elseif Identity['name2'] and Identity['name2']:lower():find(Search) then
                Found = true
            end
        end

        if Found then
            Results[#Results+1] = { Passport = Character.id, Name = vRP.FullName(Character.id) }
        end
    end
  end

  return Results
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- USER 
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.User(Passport)
  if not Passport then
      return
  end

  local Total, Records = 0, {}
  local Consult = exports['oxmysql']:execute_async([[ SELECT id, 'fine' as Type, Timestamp, Officer, Fine, Arrest, Description, Infractions, Paid, Hour FROM mdt_fines WHERE Passport = ? UNION ALL SELECT id, 'arrest' as Type, Timestamp, Officer, Fine, Arrest, Description, Infractions, 0 as Paid, NULL as Hour FROM mdt_arrest WHERE Passport = ? UNION ALL SELECT id, 'warning' as Type, Timestamp, Officer, 0 as Fine, 0 as Arrest, Description, NULL as Infractions, 0 as Paid, NULL as Hour FROM mdt_warning WHERE Passport = ? ORDER BY Timestamp DESC ]], { Passport, Passport, Passport })

  for k, v in ipairs(Consult) do
      if not v.Paid or v.Paid == 0 and v.Type == "fine" then
          Total = Total + v.Fine
      end
      Records[#Records + 1] = { Id = v.id, Type = v.Type, Date = v.Timestamp, Officer = v.Officer, Fine = v.Fine, Arrest = v.Arrest, Description = v.Description, Infractions = v.Infractions, Paid = v.Paid, Hour = v.Hour }
  end

  local Wanted = exports['oxmysql']:scalar_async([[ SELECT COUNT(*) FROM mdt_wanted WHERE Passport = ? ]], { Passport })

  local Avatars = exports['oxmysql']:single_async('SELECT Image FROM avatars WHERE Passport = ?', {Passport})
  local Avatar = Avatars and Avatars.Image or ""
  local Identity = vRP.Identity(Passport)
  return {
    {
      Name = vRP.FullName(Passport),
      Flyingarms = vRP.DatatableInformation(Passport,"Flyingarms") or false,
      Firearms = vRP.DatatableInformation(Passport,"Firearms") or false,
      Gender = Identity.Sex,
      Passport = Passport,
      Services = Identity.Prison,
      Wanted = Wanted,
      Fines = Total,
      Avatar = Avatar,
      Phone = Identity.Phone
    }, Records }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- AVATAR
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Avatar(Passport, Image)
    local source = source
    local UserPassport = vRP.Passport(source)
    local Permission = Permission[UserPassport]
    
    local Avatar = exports['oxmysql']:single_async('SELECT id FROM avatars WHERE Passport = ?', {Passport})
    
    if Avatar then
        local Consult = exports['oxmysql']:execute_async('UPDATE avatars SET Image = ?, Permission = ? WHERE Passport = ?', 
            {Image, Permission, Passport})
        
        if Consult then
            TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Avatar atualizado com sucesso.', 'verde')
            return true
        else
            TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar o avatar.', 'vermelho')
            return false
        end
    else
        local Consult = exports['oxmysql']:insert_async('INSERT INTO avatars (Passport, Image, Permission) VALUES (?, ?, ?)', 
            {Passport, Image, Permission})
        
        if Consult then
            TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Avatar definido com sucesso.', 'verde')
            return true
        else
            TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao definir o avatar.', 'vermelho')
            return false
        end
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FIREARMS 
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Firearms(OtherPassport)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport,Permission)

  if Passport and OtherPassport then
      if not Config.Permissions.Firearms == Hierarchy then
          TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
          return false
      end
  
      local Datatable = vRP.Datatable(OtherPassport)      
      vRP.UpdateDatatable(OtherPassport, "Firearms", not Datatable.Firearms)
      return true
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FLYINGARMS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Flyingarms(OtherPassport)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport,Permission)

  if Passport and OtherPassport then
      if not Config.Permissions.Flyingarms == Hierarchy then
          TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
          return false
      end
  
      local Datatable = vRP.Datatable(OtherPassport)      
      vRP.UpdateDatatable(OtherPassport, "Flyingarms", not Datatable.Flyingarms)
      return true
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLEARRECORD
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ClearRecord(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.ClearRecord == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
  end

  local Records = { warning = "mdt_warning", arrest = "mdt_arrest", fine = "mdt_fines"}

  local Record = Records[Data.Type]
  if not Record then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Tipo de registro inválido.', 'vermelho')
      return false
  end

  local Consult = exports['oxmysql']:single_async('SELECT * FROM ' .. Record .. ' WHERE id = ?', { Data.Id })
  if not Consult then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Registro não encontrado.', 'vermelho')
      return false
  end

  local Result = exports['oxmysql']:execute_async('DELETE FROM ' .. Record .. ' WHERE id = ?', { Data.Id })
  if Result then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Registro removido com sucesso.', 'verde')
      return true
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao remover o registro.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLEARRECORDS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ClearRecords(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.ClearRecord == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
  end

  local Records = true
  local ResultWarning = exports['oxmysql']:execute_async('DELETE FROM mdt_warning WHERE Passport = ?', { Passport })
  local ResultArrest = exports['oxmysql']:execute_async('DELETE FROM mdt_arrest WHERE Passport = ?', { Passport })
  local ResultFine = exports['oxmysql']:execute_async('DELETE FROM mdt_fines WHERE Passport = ?', { Passport })

  if Records then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Todos os registros foram removidos com sucesso.', 'verde')
      return true
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao remover os registros.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- RECORD
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Record(Data)
  local Records = {
      ['fine'] = "SELECT id, 'fine' as Type, Timestamp, Officer, Fine, Arrest, Description, Paid, Hour, Infractions FROM mdt_fines WHERE id = ?",
      ['arrest'] = "SELECT id, 'arrest' as Type, Timestamp, Officer, Officers, Fine, Arrest, Description, Infractions FROM mdt_arrest WHERE id = ?",
      ['warning'] = "SELECT id, 'warning' as Type, Timestamp, Officer, Description FROM mdt_warning WHERE id = ?"
  }

  if not Records[Data.Type] or not Data.Id then return {} end

  local Consult = exports['oxmysql']:query_async(Records[Data.Type], { Data.Id })
  if not Consult[1] then return {} end

  local Result = Consult[1]
  Result.Officer = ('#%i - %s'):format(Result.Officer, vRP.FullName(Result.Officer))
  
  local Infractions = json.decode(Result.Infractions)
  if type(Infractions) == 'table' then
      local Rows = exports['oxmysql']:query_async("SELECT CONCAT(Article, ' - ', Contravention) AS Label FROM mdt_penalcode_articles WHERE id IN ("..string.rep('?,', #Infractions):sub(1, -2)..")", Infractions)
      local Labels = {}
      for _, Row in ipairs(Rows) do
          Labels[#Labels + 1] = Row.Label
      end
      Result.Infractions = table.concat(Labels, ", ")
  end

  return { Id = Result.id, Type = Result.Type, Date = Result.Timestamp, Officer = Result.Officer, Officers = Result.Officers, Fine = Result.Fine, Arrest = Result.Arrest, Description = Result.Description, Infractions = Result.Infractions, Paid = Result.Paid, Hour = Result.Hour } 
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PATROL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Patrol()
  return Patrols
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETPATROL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetPatrol(Id)
  return Patrols[tostring(Id)]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEPATROL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreatePatrol(Car,Unit,Officers)
  local source = source
  local Passport = vRP.Passport(source)
  local Polices = {}
  Index += 1
  
  for _, Passport in ipairs(Officers) do
      Polices[#Polices + 1] = { Name = vRP.FullName(Passport), Passport = Passport }
  end

  Patrols[tostring(Index)] = { Unit = Unit, Car = Car, Officers = Polices, Creator = { Passport = Passport, Name = vRP.FullName(Passport) } }

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEPATROL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdatePatrol(Id,Car,Unit,Officers)
  local Polices = {}
  for _, Passport in ipairs(Officers) do
      Polices[#Polices + 1] = { Name = vRP.FullName(Passport), Passport = Passport }
  end

  Patrols[tostring(Id)].Car = Car
  Patrols[tostring(Id)].Unit = Unit
  Patrols[tostring(Id)].Officers = Polices

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DESTROYPATROL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DestroyPatrol(Id)
  Patrols[tostring(Id)] = nil
  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- OPERATIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Operations()
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  
  Operations[Permission] = Operations[Permission] or {}
  
  local Operation = {}
  for Index, Data in pairs(Operations[Permission]) do
    Operation[tostring(Index)] = { Location = Data.Location, Radio = Data.Radio, Creator = Data.Creator, Escalates = Data.Escalates or {[1] = Data.Creator} }
  end
  
  return Operation
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETOPERATION
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetOperation(Id)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  return Operations[Permission][tostring(Id)]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEOPERATION
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateOperation(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  Index += 1
  Operations[Permission][tostring(Index)] = { Candidates = {}, Radio = Data.Radio, Location = Data.Location, Escalates = { { Passport = Passport, Name = vRP.FullName(Passport) } }, Creator = { Passport = Passport, Name = vRP.FullName(Passport) } }
  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEOPERATION
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdateOperation(Id,Location,Radio)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  Operations[Permission][tostring(Id)].Location = Location
  Operations[Permission][tostring(Id)].Radio = Radio
  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DESTROYOPERATION
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DestroyOperation(Id)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  Operations[Permission][tostring(Id)] = nil
  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ESCALATEDOPERATION
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.EscalatedOperation(Id,Mode,Passport)
  local Permission = Permission[Passport]
  if Mode == "Add" then
    Operations[Permission][tostring(Id)].Escalates[#Operations[Permission][tostring(Id)].Escalates + 1] = { Passport = Passport, Name = vRP.FullName(Passport) }
    for i, Candidates in ipairs(Operations[Permission][tostring(Id)].Candidates) do
      if Candidates.Passport == Passport then
        table.remove(Operations[Permission][tostring(Id)].Candidates, i)
        break
      end
    end
  elseif Mode == "Remove" then
    Operations[Permission][tostring(Id)].Candidates[#Operations[Permission][tostring(Id)].Candidates + 1] = { Passport = Passport, Name = vRP.FullName(Passport) }
    for i, Candidates in ipairs(Operations[Permission][tostring(Id)].Escalates) do
      if Candidates.Passport == Passport then
        table.remove(Operations[Permission][tostring(Id)].Escalates, i)
        break
      end
    end
  end
  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARRESTRECORDS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ArrestRecords()
  local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_arrest ORDER BY Timestamp DESC')
  local Records = {}

  for _, v in ipairs(Consult) do
      Records[#Records + 1] = { Id = v.id, Passport = v.Passport, Name = vRP.FullName(v.Passport), Arrest = v.Arrest, Fine = v.Fine, Date = v.Timestamp, Avatar = "", Officers = v.Officers }
  end

  return Records
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARREST
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Arrest(Data)
  local source = source
  local Passport = Data.Offender
  local Officer = vRP.Passport(source)
  local Timestamp = os.time()

  if not Data.Infractions or #Data.Infractions == 0 then
      return
  end

  local Articles = exports['oxmysql']:query_async(("SELECT Article, `Fine`, `Arrest` FROM `mdt_penalcode_articles` WHERE `id` IN (%s)"):format(string.rep("?,", #Data.Infractions):sub(1, -2)), Data.Infractions)
  
  local Fine, Services = 0, 0
  for _, Article in ipairs(Articles) do
      Fine = Fine + (Article.Fine or 0)
      Services = Services + (Article.Arrest or 0)
  end

  if Data.ReductionFine and Data.ReductionFine > 0 then
      Fine = math.floor(Fine * (1 - (Data.ReductionFine / 100)))
  end
  if Data.ReductionArrest and Data.ReductionArrest > 0 then
      Services = math.floor(Services * (1 - (Data.ReductionArrest / 100)))
  end

  local Description = Data.Description
  Description = Description:gsub("<script>.-</script>", "")
  Description = Description:gsub("on%w+=", "data-removed=")

  local Infractions = {}
  for i = 1, #Articles do Infractions[i] = Articles[i].Article end
  local Arrest = exports['oxmysql']:insert_async("INSERT INTO `mdt_arrest` (`Passport`, `Officer`, `Officers`, `Timestamp`, `Infractions`, `Arrest`, `Fine`, `Description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ", { Passport, Officer, Data.OfficersInvolved, Timestamp, table.concat(Infractions, ", "), Services, Fine, Description })

  if Arrest then
      if Services > 0 then
          vRP.InsertPrison(Passport, Services)

          local Target = vRP.Source(Passport)
          if Target then
              Player(Target)["state"]["Prison"] = true
              TriggerClientEvent("Notify", Target, "Boolingbroke", "Todas as lixeiras do pátio estão disponíveis para <b>vasculhar</b> em troca de redução penal.", "amarelo", 30000)
          end
      end

      TriggerClientEvent("mdt:Notify", source, "Sucesso", "Prisão efetuada com sucesso.", "verde")
  end

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FINE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Fine(Data)
  if not Data then
      return
  end
  
  local source = source
  local Passport = Data.Offender
  local Officer = vRP.Passport(source)
  local Timestamp = os.time()
  local Date = os.date("%d/%m/%Y", Timestamp)
  local Hour = os.date("%H:%M:%S", Timestamp)

  local Articles = exports['oxmysql']:query_async( ("SELECT `Fine` FROM `mdt_penalcode_articles` WHERE `id` IN (%s)"):format(table.concat(Data.Infractions, ","):gsub("[^,]", "?")), Data.Infractions)

  local Fine = 0
  for _, Article in ipairs(Articles) do
      Fine = Fine + (Article.Fine or 0)
  end

  if Data.ReductionFine and Data.ReductionFine > 0 then
      Fine = math.floor(Fine * (1 - (Data.ReductionFine / 100)))
  end

    local Description = Data.Description
    Description = Description:gsub("<script>.-</script>", "")
    Description = Description:gsub("on%w+=", "data-removed=")

  exports['oxmysql']:insert_async( "INSERT INTO `mdt_fines` (`Passport`, `Officer`, `Timestamp`, `Infractions`, `Fine`, `Description`, `Paid`, `Arrest`, `Date`, `Hour`) VALUES (?, ?, ?, ?, ?, ?, 0, NULL, ?, ?)", { Passport, Officer, Timestamp, json.encode(Data.Infractions), Fine, Description or "", Date, Hour } )

  TriggerClientEvent("mdt:Notify", source, "Sucesso", "Multa aplicada com sucesso.", "verde")

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WARNING
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Warning(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  local Target = Data.Passport
  local Timestamp = os.time()

  local Description = Data.Description
  Description = Description:gsub("<script>.-</script>", "")
  Description = Description:gsub("on%w+=", "data-removed=")

  if not Config.Permissions.Warning == Hierarchy then
    TriggerClientEvent('mdt:Notify',source,'Erro','Você não possui permissões necessárias.','vermelho')
    return false
  end

  local Consult = exports['oxmysql']:execute_async('INSERT INTO mdt_warning (Passport, Officer, Timestamp, Description) VALUES (?, ?, ?, ?)', { Target, Passport, Timestamp, Description } )
  if Consult then
    TriggerClientEvent('mdt:Notify',source,'Sucesso','Aviso registrado com sucesso.','verde')
    return true
  else
    TriggerClientEvent('mdt:Notify',source,'Erro','Falha ao registrar o aviso.','vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- POLICEREPORTS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PoliceReports()
  local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_reports')
  local Reports = {}

  for k,v in pairs(Consult) do
    Reports[#Reports+1] = { Creator = { Name = vRP.FullName(v.Officer) }, Date = v.Timestamp, Id = v.id, Applicant = vRP.FullName(v.Officer), Archive = v.Archive, Title = v.Title } 
  end

  return Reports
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETPOLICEREPORT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetPoliceReport(Id)
  local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_reports WHERE id = ?', { Id })
  local Reports = {}
  
  for k, v in pairs(Consult) do
      local Suspects = {}
      local List = json.decode(v.Suspects) or {}
      
      for _, Passport in ipairs(List) do
          Suspects[#Suspects + 1] = { Name = vRP.FullName(Passport), Passport = Passport }
      end
      
      Reports[#Reports + 1] = { Date = v.Timestamp, Description = v.Description, Title = v.Title, Creator = { Name = vRP.FullName(v.Officer), Passport = v.Officer }, Applicant = { Name = vRP.FullName(v.Officer), Passport = v.Officer }, Suspects = Suspects }
  end
  
  return Reports[1] or {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEPOLICEREPORT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreatePoliceReport(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.PoliceReports.Create == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não tem permissão para criar relatórios.', 'vermelho')
      return false
  end

  local Suspects = {}
  for _, Suspect in ipairs(Data.Suspects) do
      table.insert(Suspects, tonumber(Suspect))
  end

  local Description = Data.Description
  Description = Description:gsub("<script>.-</script>", "")
  Description = Description:gsub("on%w+=", "data-removed=")

  local Reports = exports['oxmysql']:insert_async('INSERT INTO mdt_reports (Passport, Title, Suspects, Officer, Timestamp, Description, Archive) VALUES (?, ?, ?, ?, ?, ?, ?)',{ Passport, Data.Title, json.encode(Suspects), Passport, os.time(), Description, 0 })

  if Reports then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Relatório criado com sucesso.', 'verde')
      
      return { Id = Reports, Title = Data.Title, Description = Description, Date = os.time(), Suspects = Suspects, Archive = 0, Creator = { Name = vRP.FullName(Passport), Passport = Passport } }
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao criar relatório.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEPOLICEREPORT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdatePoliceReport(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  local Existing = exports['oxmysql']:single_async('SELECT * FROM mdt_reports WHERE id = ?', {Data.Id})

  if not Config.Permissions.PoliceReports.Edit == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não tem permissão para criar relatórios.', 'vermelho')
      return false
  end

  local Description = Data.Description
  Description = Description:gsub("<script>.-</script>", "")
  Description = Description:gsub("on%w+=", "data-removed=")

  local Update = { Title = Data.Title or Existing.Title, Description = Description or Existing.Description, Suspects = Data.Suspects and json.encode(Data.Suspects) or Existing.Suspects, Archive = Data.Archive ~= nil and Data.Archive or Existing.Archive }

  local Consult = exports['oxmysql']:execute_async('UPDATE mdt_reports SET Title = ?, Description = ?, Suspects = ?, Archive = ? WHERE id = ?',{ Update.Title, Update.Description, Update.Suspects, Update.Archive, Data.Id })

  if Consult then
      local Reports = exports['oxmysql']:single_async('SELECT * FROM mdt_reports WHERE id = ?', {Data.Id})

      local Suspects = json.decode(Reports.Suspects) or {}
      local Formatted = {}
      for _, Suspect in ipairs(Suspects) do
          table.insert(Formatted, { Passport = Suspect, Name = vRP.FullName(Suspect) })
      end

      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Relatório #'..Data.Id..' atualizado', 'verde')
      
      return { Id = Reports.id, Title = Reports.Title, Description = Reports.Description, Date = Reports.Timestamp, Suspects = Formatted, Archive = Reports.Archive, Creator = { Name = vRP.FullName(Reports.Passport), Passport = Reports.Passport }}
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar relatório', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARCHIVEPOLICEREPORT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ArchivePoliceReport(Reports, Status)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  local Existing = exports['oxmysql']:single_async('SELECT * FROM mdt_reports WHERE id = ?', {Reports})

  if not Config.Permissions.PoliceReports.Archive == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não tem permissão para criar relatórios.', 'vermelho')
      return false
  end

  local Consult = exports['oxmysql']:execute_async('UPDATE mdt_reports SET Archive = ? WHERE id = ?',{ Status and 1 or 0, Reports })

  if Consult then
      local Action = Status and "arquivado" or "desarquivado"
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', ('Relatório #%s %s com sucesso'):format(Reports,Action), 'verde')
      
      return { Id = Reports, Archive = Status and 1 or 0, Title = Existing.Title, Creator = { Name = vRP.FullName(Existing.Passport), Passport = Existing.Passport }}
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar status do relatório', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WANTED
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Wanted()
  local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_wanted ORDER BY Timestamp DESC')
  local WantedList = {}

  for _, v in ipairs(Consult) do
      WantedList[#WantedList + 1] = { Citizen = { Passport = v.Passport, Name = vRP.FullName(v.Passport) }, Id = v.id, Date = v.Timestamp, Image = v.Image, Description = v.Description, Officer = v.Officer and ('#%i - %s'):format(v.Officer, vRP.FullName(v.Officer)) or 'Desconhecido', HowLong = v.HowLong }
  end

  return WantedList
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETWANTED
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetWanted(Id)
	local source = source
	local Passport = vRP.Passport(source)
	local permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, permission)

	if not Config.Permissions.Wanted.View == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end

	local Wanted = exports['oxmysql']:single_async(" SELECT id, Passport, Image, Accusations, Officer, Timestamp, HowLong, Description FROM mdt_wanted WHERE id = ? ", { Id })
  
	if not Wanted then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Registro não encontrado.', 'vermelho')
		return false
	end

	return { Id = Wanted.id, Citizen = { Passport = Wanted.Passport, Name = vRP.FullName(Wanted.Passport), Avatar = "", Services = vRP.Identity(Wanted.Passport).Prison }, Date = Wanted.Timestamp, Image = Wanted.Image, Description = Wanted.Description, Accusations = Wanted.Accusations, Officer = { Passport = Wanted.Officer, Name = vRP.FullName(Wanted.Officer), Avatar = "" }, HowLong = Wanted.HowLong, CreatedAt = Wanted.Timestamp }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEWANTED
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateWanted(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Wanted.Create == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
  end

  local Description = Data.Description
  Description = Description:gsub("<script>.-</script>", "")
  Description = Description:gsub("on%w+=", "data-removed=")

  local Timestamp = os.time()
  local Result = exports['oxmysql']:insert_async('INSERT INTO mdt_wanted (Passport, Image, Accusations, Officer, Timestamp, HowLong, Description) VALUES (?, ?, ?, ?, ?, ?, ?)', { Data.Passport or Data.Citizen, Data.Image, json.encode(Data.Accusations), Passport, Timestamp, Data.HowLong, Description or "" })

  if Result then
      local NewRecord = { Citizen = { Passport = Data.Passport or Data.Citizen, Name = vRP.FullName(Data.Passport or Data.Citizen) }, Id = Result, Date = Timestamp, Image = Data.Image, Description = Description or "", Officer = ('#%i - %s'):format(Passport, vRP.FullName(Passport)), HowLong = Data.HowLong }

      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Registro de procurado criado com sucesso.', 'verde')
      return NewRecord
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao criar registro de procurado no banco de dados.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEWANTED
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdateWanted(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Wanted.Edit == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
  end

  local Description = Data.Description
  Description = Description:gsub("<script>.-</script>", "")
  Description = Description:gsub("on%w+=", "data-removed=")

  local Result = exports['oxmysql']:execute_async('UPDATE mdt_wanted SET Description = ?, HowLong = ? WHERE id = ?', { Description, Data.HowLong, Data.Id })

  if Result then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Registro de procurado atualizado com sucesso.', 'verde')
      return true
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar registro de procurado.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DESTROYWANTED
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DestroyWanted(Id)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Wanted.Delete == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
  end

  local Result = exports['oxmysql']:execute_async('DELETE FROM mdt_wanted WHERE id = ?', { Id })

  if Result then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Registro de procurado removido com sucesso.', 'verde')
      return true
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao remover registro de procurado.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("mdt:Vehicle")
AddEventHandler("mdt:Vehicle", function(Entity)
    local source = source
    local Plate = Entity.Plate
    local Passport = vRP.Passport(source)
	local OtherPassport = vRP.PassportPlate(Plate)
	local Service = vRP.HasService(Passport,"Policia") or vRP.HasPermission(Passport, "LSPD") or vRP.HasPermission(Passport, "BCSO") or vRP.HasPermission(Passport, "SAPR")

    if Service and OtherPassport then
        local Vehicle = vRP.Query("vehicles/plateVehicles", { Plate = Plate })
        if Vehicle[1] then
            if not Vehicle[1]["arrest"] then
                TriggerClientEvent("mdt:Vehicle", source, OtherPassport, vRP.FullName(OtherPassport), Plate, Vehicle[1]["vehicle"])
            else
                TriggerClientEvent("Notify", source, "Departamento Policial", "Veículo já se encontra apreendido.", "policia", 5000)
            end
        end
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEIZEDVEHICLES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.SeizedVehicles()
    local Consult = exports['oxmysql']:query_async("SELECT v.id AS Id, v.Passport, CONCAT(p.name, ' ', p.name2) AS Name, v.Image, v.Vehicle, v.Plate, v.Location, v.Timestamp AS Date, v.Description, v.Officer, CONCAT(o.name, ' ', o.name2) AS OfficerName FROM mdt_vehicles v LEFT JOIN characters p ON p.id = v.Passport LEFT JOIN characters o ON o.id = v.Officer ORDER BY v.Timestamp DESC")
    for Index, Data in ipairs(Consult) do
        Data.Officer = { Name = Data.OfficerName }
        Data.OfficerName = nil
    end
    return Consult
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INTERNALAFFAIRS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.InternalAffairs()
    local source = source
    local Passport = vRP.Passport(source)
    if not Passport then return {} end

    local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_internalaffairs ORDER BY Timestamp DESC', {})
    local Affairs = {}

    for k,v in pairs(Consult) do
        Affairs[#Affairs+1] = { Creator = { Name = vRP.FullName(v.Passport), Passport = v.Passport }, Date = v.Timestamp, Id = v.id, Applicant = vRP.FullName(v.Passport), Archive = v.Archive, Title = v.Title, Description = v.Description, Suspect = { Name = vRP.FullName(v.Suspect), Passport = v.Suspect } }
    end

    return Affairs
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETINTERNALAFFAIRS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetInternalAffairs(Id)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.InternalAffairs.View == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
    end

    local Consult = exports['oxmysql']:single_async('SELECT * FROM mdt_internalaffairs WHERE id = ?', {Id})

    return { Title = Consult.Title, Description = Consult.Description, Date = Consult.Timestamp, Applicant = { Name = vRP.FullName(Consult.Passport) or "Desconhecido", Passport = Consult.Passport }, Creator = { Name = vRP.FullName(Consult.Passport) or "Desconhecido", Passport = Consult.Passport }, Suspect = { Name = vRP.FullName(Consult.Suspect) or "Desconhecido", Passport = Consult.Suspect } }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEINTERNALAFFAIRS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateInternalAffairs(Data)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.InternalAffairs.Create == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
    end

    local Description = Data.Description
    Description = Description:gsub("<script>.-</script>", "")
    Description = Description:gsub("on%w+=", "data-removed=")

    local Consult = exports['oxmysql']:insert_async('INSERT INTO mdt_internalaffairs (Passport, Title, Suspect, Officer, Timestamp, Description, Archive) VALUES (?, ?, ?, ?, ?, ?, ?)',{ Passport, Data.Title, Data.Suspect, Passport, os.time(), Description, 0 })

    if Consult then
        TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Registro criado com sucesso', 'verde')
        return true
    else
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao criar registro', 'vermelho')
        return false
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEINTERNALAFFAIRS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdateInternalAffairs(Data)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.InternalAffairs.Edit == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
    end

    local Description = Data.Description
    Description = Description:gsub("<script>.-</script>", "")
    Description = Description:gsub("on%w+=", "data-removed=")

    local Consult = exports['oxmysql']:update_async([[UPDATE mdt_internalaffairs SET Title = ?, Description = ?, Suspect = ?, Officer = ?, Timestamp = ? WHERE id = ?]],{ Data.Title, Description, Data.Suspect, Data.Officer or Passport, os.time(), Data.Id })

    if Consult and Consult > 0 then
        TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Registro atualizado com sucesso', 'verde')
        return true
    else
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar registro ou registro não encontrado', 'vermelho')
        return false
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARCHIVEINTERNALAFFAIRS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ArchiveInternalAffairs(Id)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.InternalAffairs.Archive == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
    end

    local Consult = exports['oxmysql']:single_async('SELECT Archive FROM mdt_internalaffairs WHERE id = ?', {Id})

    local Affairs = Consult.Archive == 1 and 0 or 1

    local Archive = exports['oxmysql']:update_async('UPDATE mdt_internalaffairs SET Archive = ? WHERE id = ?',{Affairs,Id})

    if Archive and Archive > 0 then
        local Action = Affairs == 1 and "arquivado" or "desarquivado"
        TriggerClientEvent('mdt:Notify', source, 'Sucesso', ('Registro %s com sucesso'):format(Action), 'verde')
        return true
    else
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar registro', 'vermelho')
        return false
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATESEIZEDVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateSeizedVehicle(Data)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.SeizedVehicles == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
      return false
    end

    local Description = Data.Description
    Description = Description:gsub("<script>.-</script>", "")
    Description = Description:gsub("on%w+=", "data-removed=")

	  TriggerClientEvent("mdt:Refresh",source,"Close")
    exports['oxmysql']:insert('INSERT INTO mdt_vehicles (Passport, Officer, Image, Vehicle, Plate, Location, Timestamp, Description ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', { Data.Passport, vRP.Passport(source), Data.Image, Data.Vehicle, Data.Plate, Data.Location, os.time(), Description }, function(Success) if Success then
			vRP.Query("vehicles/Arrest",{ Plate = Data.Plate })
            TriggerClientEvent("Notify",source,"Departamento Policial",("O veículo <b>%s</b> de placa <b>%s</b> foi apreendido com sucesso."):format(Data.Vehicle,Data.Plate),"verde",5000)
        else
            TriggerClientEvent("Notify",source,"Departamento Policial","Não foi possível apreender este veículo.","vermelho",5000)
        end
    end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MEDALS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Medals()
  local Medals = exports['oxmysql']:query_async('SELECT * FROM mdt_medals')
  local Info = {}
  for k,v in pairs(Medals) do
    Info[#Info+1] = { Officers = json.decode(v.Officers), Image = v.Image, Id = v.id, Name = v.Name }
  end
  return Info
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETMEDAL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetMedal(Id)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Medals.View == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end

  local Consult = exports["oxmysql"]:single_async('SELECT id, Name, Officers, Image FROM mdt_medals WHERE Id = ?', { Id })
  local Officers = {}

  for _, Passport in ipairs(json.decode(Consult.Officers)) do
      Officers[#Officers+1] = { Passport = Passport, Name = vRP.FullName(Passport), }
  end

  return { Id = Consult.Id, Image = Consult.Image, Name = Consult.Name, Officers = Officers }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEMEDAL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateMedal(Data)
  local source = source
  local Passport = vRP.Passport(source)

  local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)
	
	if not Config.Permissions.Medals.Create == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end

  local Consult = exports["oxmysql"]:insert_async('INSERT INTO mdt_medals (Image, Name) VALUES (@Image, @Name)', { Image = Data['Image'], Name = Data['Name'], })

  if Consult then
    TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'A medalha <b class=\'text-white\'>' .. Data['Name'] .. '</b> foi criada com sucesso.', 'verde')
  else
    TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao criar a medalha <b class=\'text-white\'>' .. Data['Name'] ..'</b>.', 'vermelho')
    return false
  end

  return Consult
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEMEDAL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdateMedal(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)
	
	if not Config.Permissions.Medals.Edit == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end

  local Consult = exports["oxmysql"]:execute_async('UPDATE mdt_medals SET Name = ?, Image = ? WHERE id = ?', { Data['Name'], Data['Image'], Data['Id'] })

  if Consult then
    TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'A medalha <b class=\'text-white\'>' .. Data['Name'] .. '</b> foi atualizada com sucesso.', 'verde')
    return true
  else
    TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar a medalha <b class=\'text-white\'>' .. Data['Name'] .. '</b>.', 'vermelho')
    return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ASSIGNMEDAL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.AssignMedal(Data)
	local source = source
  local Passport = vRP.Passport(source)
	local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)
	
	if not Config.Permissions.Medals.Assign == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end
	
  local Consult = exports["oxmysql"]:single_async('SELECT Name, Officers FROM mdt_medals WHERE Id = ?', { Data['Id'] })

  local Officers = json.decode(Consult.Officers) or {}
  for _, Member in ipairs(Officers) do
      if Member == Data['Officer'] then
        TriggerClientEvent('mdt:Notify', source, 'Error', 'O passaporte <b class=\'text-white\'>' .. Data['Officer'] .. '</b> já possui a medalha <b class=\'text-white\'>'.. Consult.Name..'</b>.', 'vermelho')
        return false
      end
  end

  table.insert(Officers, Data['Officer'])

  exports["oxmysql"]:execute_async('UPDATE mdt_medals SET Officers = ? WHERE Id = ?', { json.encode(Officers), Data['Id'] })

  TriggerClientEvent("Notify", vRP.Source(Data['Officer']), Consult.Name, "Parabéns você recebeu uma medalha", "verde", 5000)
	TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Medalha atribuida.', 'verde')
	
  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEMEDAL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.RemoveMedal(Data)
	local source = source
  local Passport = vRP.Passport(source)
	
	local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)
	
	if not Config.Permissions.Medals.Delete == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end
	
  local Consult = exports["oxmysql"]:single_async('SELECT Name, Officers FROM mdt_medals WHERE Id = ?', { Data['Id'] })
	
  local Officers, Sucess = json.decode(Consult.Officers) or {}, false
  for Index, Member in ipairs(Officers) do
      if Member == Data['Officer'] then
          Sucess = not Sucess
          table.remove(Officers, Index)
          break
      end
  end

  exports["oxmysql"]:execute_async('UPDATE mdt_medals SET Officers = ? WHERE Id = ?', { json.encode(Officers), Data['Id'] })
	
	if Sucess then
		TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'O passaporte <b class=\'text-white\'>' .. Passport .. '</b> foi removido com sucesso da medalha <b class=\'text-white\'>'.. Consult.Name..'</b>.', 'verde')
	else
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Não foi possível localizar o passaporte <b class=\'text-white\'>' .. Passport .. '</b> na medalha <b class=\'text-white\'>'.. Consult.Name..'</b>', 'vermelho')
	end

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DESTROYMEDAL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DestroyMedal(Id)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)
	
	if not Config.Permissions.Medals.Delete == Hierarchy then
		TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
		return false
	end
	
  local Consult = exports["oxmysql"]:execute_async('DELETE FROM mdt_medals WHERE id = ?', { Id })

  if Consult then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'A medlha foi removida com sucesso.', 'verde')
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao remover a medlha.', 'vermelho')
      return false
  end

  return Consult
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UNITS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Units(Select)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  
  if not Select then
    local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_units WHERE Permission = ?', { Permission })

    local Units = {}
    for k,v in pairs(Consult) do
      Units[#Units+1] = { Officers = json.decode(v.Officers), Image = v.Image, Id = v.id, Name = v.Name }
    end

    return Units
    
  elseif Select then
    local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_units WHERE Permission = ?', { Permission })

    local Units = {}
    for k,v in pairs(Consult) do
      Units[#Units+1] = { Label = v.Name, Value = v.id, }
    end

    return Units
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUNIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetUnit(Id)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Units.View == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias para visualizar unidades.', 'vermelho')
      return false
  end

  local Consult = exports['oxmysql']:single_async('SELECT * FROM mdt_units WHERE id = ? AND Permission = ?', {Id, Permission})
  
  local OfficersList = {}
  local Officers = json.decode(Consult.Officers) or {}
  
  for _, Data in ipairs(Officers) do
      OfficersList[#OfficersList + 1] = { Passport = Data, Name = vRP.FullName(Data) }
  end

  return { Name = Consult.Name, Image = Consult.Image, Officers = OfficersList, Id = Consult.id }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEUNIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateUnit(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Units.Create == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias para criar unidades.', 'vermelho')
      return false
  end

  local Image = Data.Image

  local Result = exports['oxmysql']:insert_async('INSERT INTO mdt_units (Image, Name, Permission, Officers) VALUES (?, ?, ?, ?)', {Image, Data.Name, Permission, '[]'} )

  if Result then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Unidade <b class="text-white">'..Data.Name..'</b> criada com sucesso.', 'verde')
      return true
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao criar a unidade.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEUNIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.UpdateUnit(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  if not Config.Permissions.Units.Edit == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias para editar unidades.', 'vermelho')
      return false
  end

  local Consult = exports['oxmysql']:single_async('SELECT * FROM mdt_units WHERE id = ? AND Permission = ?', {Data.Id, Permission})

  local Result = exports['oxmysql']:execute_async('UPDATE mdt_units SET Name = ?, Image = ? WHERE id = ?', {Data.Name, Data.Image or Consult.Image, Data.Id} )

  if Result then
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Unidade <b class="text-white">'..Data.Name..'</b> atualizada com sucesso.', 'verde')
      
      return { Name = Data.Name, Image = Data.Image or Consult.Image, Id = Data.Id, Officers = json.decode(Consult.Officers) or {} }
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar a unidade.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ASSIGNUNIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.AssignUnit(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  local Number = Data.UnitId or Data.Id
  local Data = Data.Passport or Data.Officer

  if not Config.Permissions.Units.Assign == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não tem permissão para atribuir unidades.', 'vermelho')
      return false
  end

  local Consult = exports['oxmysql']:single_async('SELECT * FROM mdt_units WHERE id = ? AND Permission = ?', {Number, Permission})

  local Officers = json.decode(Consult.Officers) or {}

  for _, Existing in ipairs(Officers) do
      if Existing == Data then
          TriggerClientEvent('mdt:Notify', source, 'Aviso', 'Este oficial já está na unidade.', 'amarelo')
          return false
      end
  end

  table.insert(Officers, Data)

  local Consult = exports['oxmysql']:execute_async('UPDATE mdt_units SET Officers = ? WHERE id = ?', {json.encode(Officers), Number} )

  if Consult then
      local Name = vRP.FullName(Data)
      TriggerClientEvent('mdt:Notify', source, 'Sucesso', ('Oficial %s adicionado à unidade %s'):format(Name, Consult.Name), 'verde')
      
      local Target = vRP.Source(Data)
      if Target then
          TriggerClientEvent('Notify', Target, 'Unidade', ('Você foi designado para a unidade %s'):format(Consult.Name), 'verde', 10000)
      end
      return true
  else
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao atualizar a unidade.', 'vermelho')
      return false
  end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEUNIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.RemoveUnit(Data)
  local source = source
  local Passport = vRP.Passport(source)
  local Permission = Permission[Passport]
  local Hierarchy = vRP.HasPermission(Passport, Permission)

  local Number = tonumber(Data.UnitId or Data.Id)
  local Data = tonumber(Data.Passport or Data.Officer)

  if not Config.Permissions.Units.Delete == Hierarchy then
      TriggerClientEvent('mdt:Notify', source, 'Erro', 'Permissões insuficientes para remover membros.', 'vermelho')
      return false
  end

  local Consult = exports['oxmysql']:single_async('SELECT * FROM mdt_units WHERE id = ? AND Permission = ?', {Number, Permission})

  local Officers = {}
  if Consult.Officers and Consult.Officers ~= '' and Consult.Officers ~= '[]' then
      local Consult, result = pcall(json.decode, Consult.Officers)
      if Consult and type(result) == 'table' then
          Officers = result
      else
          Officers = {}
      end
  end

  local Deleted = false
  for i = #Officers, 1, -1 do
      if tonumber(Officers[i]) == Data then
          table.remove(Officers, i)
          Deleted = true
      end
  end

  local Name = vRP.FullName(Data) or "Desconhecido"
  TriggerClientEvent('mdt:Notify',source,'Sucesso',('Oficial %s (#%d) removido da unidade %s'):format(Name, Data, Consult.Name),'verde')

  local Target = vRP.Source(Data)
  if Target then
      TriggerClientEvent('Notify', Target, 'Unidade',('Você foi removido da unidade %s'):format(Consult.Name),'vermelho', 10000)
  end

  return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DESTROYUNIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DestroyUnit(Id)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.Units.Delete == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias para remover unidades.', 'vermelho')
        return false
    end

    local Consult = exports['oxmysql']:single_async('SELECT * FROM mdt_units WHERE id = ? AND Permission = ?', {Id, Permission})

    local Officers = json.decode(Consult.Officers) or {}
    if #Officers > 0 then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Não é possível remover uma unidade com membros ativos.', 'vermelho')
        return false
    end

    local Result = exports['oxmysql']:execute_async('DELETE FROM mdt_units WHERE id = ?', {Id})

    if Result then
        TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Unidade <b class="text-white">'..Consult.Name..'</b> removida com sucesso.', 'verde')
        return true
    else
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Falha ao remover a unidade.', 'vermelho')
        return false
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- OFFICERS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Officers(Management, Ranking)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)
    local Service = vRP.NumPermission(Permission)

    if not Config.Permissions.Management.View == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Sem permissão para visualizar oficiais.', 'vermelho')
        return false
    end

    local Result = {}
    local Members = vRP.DataGroups(Permission) or {}

    for Member, _ in pairs(Members) do
        local Medals = {}

        local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_medals WHERE JSON_CONTAINS(Officers, ?)', { tostring(Member) })
        for _, Medal in pairs(Consult) do
            Medals[#Medals+1] = { Name = Medal.Name, Image = Medal.Image }
        end

        local Units = {}
        local Consult = exports['oxmysql']:query_async('SELECT * FROM mdt_units WHERE JSON_CONTAINS(Officers, ?) AND Permission = ?', { tostring(Member), Permission })
        for _, Unit in pairs(Consult) do
            Units[#Units+1] = { Name = Unit.Name, Image = Unit.Image }
        end

        local Data = { Name = vRP.FullName(Member), Passport = Member, Patent = vRP.HasPermission(Member, Permission), Service = Service[Member] and 1 or 0, Units = Units, Medals = Medals }

        if Ranking then
            Data.Hours = vRP.Playing(Member, Permission)
        elseif Management then
            local OtherSource = vRP.Source(Member)
            Data.Status = OtherSource and "Ativo" or "Inativo"
        end

        Result[#Result+1] = Data
    end

    return Result
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEOFFICER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateOfficer(Data)
    local source = source
    local Target = Data['Passport']
    local Passport = vRP.Passport(source)
    local Identity = vRP.Identity(Target)
    local TargetSource = vRP.Source(Target)
    local Permission = Permission[Passport]
    local Hierar = vRP.Hierarchy(Permission)
    local Group = Hierar[#Hierar]
    if Passport and Identity and Target and Group then
        TriggerClientEvent('mdt:Notify',source,'Sucesso','Um convite foi enviado ao destinatário.','verde',5000)
        if TargetSource and vRP.Request(TargetSource,'Você foi convidado(a) para participar do grupo <b class=\'text-white\'>'..Group..'</b>, gostaria de estar entrando do mesmo?') then
            vRP.SetPermission(Target, Group)
            TriggerClientEvent('mdt:Notify',source,'Sucesso','Passaporte adicionado.','verde',5000)
            return true
        else
            TriggerClientEvent('mdt:Notify',source,'Atenção','Convite para o grupo recusado.','amarelo',5000)
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HIERARCHYOFFICER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.HierarchyOfficer(Data)
	local source = source
	local Target, Mode = Data['Passport'], Data['Mode']
	local Passport = vRP.Passport(source)
	local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)
    if Config.Permissions.Management.Edit < Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
        return false
    end

	local Identity = vRP.Identity(Target) or {}
	if Mode:find('Promote') or Mode:find('Demote') then
        local Hierar = vRP.Hierarchy(Permission)
        local TargetLevel = vRP.HasPermission(Target, Permission)
        local Group = Hierar[TargetLevel]
        vRP.RemovePermission(Target, Group)
        if Mode:find('Promote') then
            vRP.SetPermission(Target, Permission,TargetLevel - 1)
        else
            vRP.SetPermission(Target, Permission,TargetLevel + 1)
        end
		TriggerClientEvent('mdt:Notify',source,'Sucesso','Hierarquia atualizada.','verde',5000)
		return { Passport = Target, Name = (Identity['name'] or 'Indivíduo')..' '..(Identity['name2'] or 'Indigente'), Hierarchy = vRP.HasPermission(Target, Permission), Service = vRP.Source(Target) and 1 or 0 }
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISMISSOFFICER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DismissOfficer(Data)
	local source = source
	local Target = Data['Passport']
	local Passport = vRP.Passport(source)
	local Permission = Permission[Passport]
	local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.Management.Dismiss == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
        return false
    end

	if vRP.HasGroup(Target, Permission) then
		TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Passaporte removido com sucesso.', 'verde', 5000)
		vRP.RemovePermission(Target, Permission)
		return true
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BANK
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Bank()
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Balance = vRP.Permissions(Permission, 'Bank')
    local Transactions = exports['oxmysql']:query_async('SELECT * FROM painel_transactions WHERE Permission = @Permission LIMIT 10', { Permission = Permission })
    local Extract = {}
    for _, Data in ipairs(Transactions) do
        local Name = vRP.FullName(Data['Passport'])
        local TargetName = Data['Transfer'] ~= 0 and vRP.FullName(Data['Transfer'])
        Extract[#Extract+1] = { Player = { Passport = Data['Passport'], Name = Name }, To = { Passport = Data['Transfer'], Name = TargetName }, Type = Data['Type'], Value = Data['Value'], Date = Data['Date']}
    end
    return { Balance, Extract }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEPOSITBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.DepositBank(Value)
    local source = source
    local Passport = vRP.Passport(source)

    if not Value or Value <= 0 then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Valor inválido para depósito.', 'vermelho')
        return false
    end

    local Permission = Permission[Passport]
    if vRP.PaymentBank(Passport, Value, true) then
        exports['oxmysql']:insert_async('INSERT INTO painel_transactions (Type, Passport, Value, Date, Permission) VALUES (?, ?, ?, ?, ?)', { "Deposit", Passport, Value, os.time(), Permission })
        vRP.PermissionsUpdate(Permission, "Bank", "+", Value)
        TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Depósito de <b class=\'text-white\'>$' .. Value .. '</b> realizado com sucesso.', 'verde')
        return true
    else
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Saldo insuficiente para depósito.', 'vermelho')
        return false
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WITHDRAWBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.WithdrawBank(Value)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.Withdraw == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
        return false
    end

    if not Value or Value <= 0 then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Valor inválido para saque.', 'vermelho')
        return false
    end

    local Balance = vRP.Permissions(Permission, 'Bank')
    local Tax = math.floor(Value * (Config['BankTaxWithdraw'] or 0))

    if Balance < (Value + Tax) then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Saldo insuficiente.', 'vermelho')
        return false
    end

    vRP.PermissionsUpdate(Permission, "Bank", "-", Value + Tax)

    exports['oxmysql']:insert_async('INSERT INTO painel_transactions (Type, Passport, Value, Date, Permission) VALUES (?, ?, ?, ?, ?)', { "Withdraw", Passport, Value, os.time(), Permission })

    vRP.GenerateItem(Passport, 'dollar', Value, true)
    if Tax > 0 then
        TriggerClientEvent('mdt:Refresh',source,'Open')
    end
    TriggerClientEvent('mdt:Notify', source, 'Sucesso', 'Saque de <b class=\'text-white\'>$' .. Value .. '</b> realizado com uma taxa de <b class=\'text-white\'>$' .. Tax .. '</b> aplicada.', 'verde')

    return { Balance - Value - Tax, { Passport = Passport, Name = vRP.FullName(Passport) } }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.TransferBank(Target,Value)
    local source = source
    local Passport = vRP.Passport(source)
    local Permission = Permission[Passport]
    local Hierarchy, Title = vRP.HasPermission(Passport, Permission)

    if not Config.Permissions.Bank.Withdraw == Hierarchy then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Você não possui permissões necessárias.', 'vermelho')
        return
    end

    if not Target or not Value or Value <= 0 then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Dados inválidos para transferência.', 'vermelho')
        return false
    end

    local Balance = vRP.Permissions(Permission, 'Bank')
    local Tax = math.floor(Value * (Config['BankTaxWithdraw'] or 0))
    if Balance < (Value + Tax) then
        TriggerClientEvent('mdt:Notify', source, 'Erro', 'Saldo insuficiente na conta da organização.', 'vermelho')
        return false
    end

    vRP.PermissionsUpdate(Permission, "Bank", "-", Value + Tax)

    exports['oxmysql']:insert_async('INSERT INTO painel_transactions (Type, Passport, Value, Transfer, Date, Permission) VALUES (\'Transfer\', ?, ?, ?, ?, ?)', { Passport, Value, Target, os.time(), Permission })

    vRP.GiveBank(Target, Value, true)

    if Tax > 0 then
        TriggerClientEvent('mdt:Refresh', source, 'Open')
    end
    TriggerClientEvent('mdt:Notify',source,'Sucesso','Transferência de <b class=\'text-white\'>$' .. Value .. '</b> para o passaporte <b class=\'text-white\'>' .. Target .. '</b> realizada com uma taxa de <b class=\'text-white\'>$' .. Tax .. '</b> aplicada.','verde')

    local Source = vRP.Source(Target)
    if Source then
        TriggerClientEvent('Notify', Source, 'Sucesso', '<b class=\'text-white\'>' .. Title .. '</b> fez uma transferência de <b class=\'text-white\'>$' .. Value .. '</b> para você.', 'verde', 10000)
    end

    local Name = vRP.FullName(Target)
    return { Passport = Target, Name = Name, Date = os.time() }
end