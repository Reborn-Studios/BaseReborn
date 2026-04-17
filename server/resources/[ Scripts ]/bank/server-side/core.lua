-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("bank",Creative)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Active = {}
--[[
DROP TABLE IF EXISTS `bank_transactions`;
CREATE TABLE IF NOT EXISTS `bank_transactions` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Passport` int(10) NOT NULL DEFAULT 0,
  `Type` varchar(50) NOT NULL,
  `Price` int(20) NOT NULL,
  `Timestamp` int(20) NOT NULL DEFAULT 0,
  `Reference` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `Passport` (`Passport`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Passport` int(10) NOT NULL DEFAULT 0,
  `Received` int(10) NOT NULL DEFAULT 0,
  `Type` varchar(50) NOT NULL,
  `Reason` longtext NOT NULL,
  `Timestamp` varchar(50) NOT NULL,
  `Price` int(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `Passport` (`Passport`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `taxes`;
CREATE TABLE IF NOT EXISTS `taxes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Passport` int(10) NOT NULL DEFAULT 0,
  `Name` varchar(50) NOT NULL,
  `Timestamp` varchar(50) NOT NULL,
  `Price` int(20) NOT NULL,
  `Description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Passport` (`Passport`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

]]
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSACTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function Transactions(Passport,Limit,Before)
	if not Passport then
		return {}
	end

	local Params = { Passport }
	local Query = "SELECT id,Type,Price,Timestamp,Reference FROM bank_transactions WHERE Passport = ?"

	if Before then
		Query = Query.." AND Timestamp < ?"
		Params[#Params + 1] = Before
	end

	Query = Query.." ORDER BY Timestamp DESC LIMIT ?"
	Params[#Params + 1] = tonumber(Limit) or 6

	local Consult = exports.oxmysql:query_async(Query,Params)
	if not Consult or #Consult <= 0 then
		return {}
	end

	local Result = {}
	for _,Row in ipairs(Consult) do
		local Reference = Row.Reference
		if Row.Type == "Invoice" and type(Reference) == "string" then
			local Ok,Decoded = pcall(json.decode,Reference)
			if Ok and Decoded then
				Reference = Decoded
			end
		end

		Result[#Result + 1] = {
			Id = Row.id,
			Type = Row.Type,
			Value = Row.Price,
			Date = Row.Timestamp,
			Reference = Reference
		}
	end

	return Result
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSACTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Transactions(Before)
	local source = source
	local Passport = vRP.Passport(source)
	return Passport and Transactions(Passport,10,Before) or {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HOME
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Home()
	local source = source
	local Passport = vRP.Passport(source)
	if not Passport then
		return false
	end

	return {
		Balance = vRP.GetBank(Passport) or 0,
		Transactions = Transactions(Passport),
		CardNumber = string.format("0000 0000 0000 %04d",1000 + Passport)
	}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEPOSIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Deposit(Value)
	local source = source
	local Valuation = parseInt(Value)
	local Passport = vRP.Passport(source)
	if not Passport or Valuation <= 0 or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Item = "dollars"
	local HasItem = vRP.ConsultItem(Passport,Item,Valuation)
	if HasItem and vRP.TakeItem(Passport,Item,Valuation) then
		vRP.GiveBank(Passport,Valuation)
		exports.bank:AddTransactions(Passport,"Deposit",Valuation)
	end

	Active[Passport] = nil

	return {
		Balance = vRP.GetBank(Passport) or 0,
		Transactions = Transactions(Passport)
	}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WITHDRAW
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Withdraw(Value)
	local source = source
	local Valuation = parseInt(Value)
	local Passport = vRP.Passport(source)
	if not Passport or Valuation <= 0 or Active[Passport] then
		return false
	end

	Active[Passport] = true

	if exports.bank:CheckTaxes(Passport) or exports.bank:CheckFines(Passport) then
		Active[Passport] = nil
		return false
	end

	local Bank = vRP.GetBank(Passport) or 0
	if Bank < Valuation then
		Active[Passport] = nil
		return false
	end

	if not vRP.WithdrawCash(Passport,Valuation) then
		Active[Passport] = nil
		return false
	end

	exports.bank:AddTransactions(Passport,"Withdraw",Valuation)
	Active[Passport] = nil

	return {
		Balance = Bank - Valuation,
		Transactions = Transactions(Passport)
	}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFER
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Transfer(TargetPassport,Value)
	local source = source
	local Valuation = parseInt(Value)
	local Passport = vRP.Passport(source)
	local TargetPassport = parseInt(TargetPassport)
	if not Passport or Passport == TargetPassport or Valuation <= 0 or Active[Passport] then
		return false
	end

	Active[Passport] = true

	if exports.bank:CheckTaxes(Passport) or exports.bank:CheckFines(Passport) then
		Active[Passport] = nil
		return false
	end

	if vRP.PaymentBank(Passport,Valuation) then
		vRP.GiveBank(TargetPassport,Valuation)

		local FromName = vRP.FullName(Passport)
		local ToName = vRP.FullName(TargetPassport)

		exports.bank:AddTransactions(Passport,"TransferTo",Valuation,("#%s - %s"):format(TargetPassport,ToName))
		exports.bank:AddTransactions(TargetPassport,"TransferMe",Valuation,("#%s - %s"):format(Passport,FromName))
	end

	Active[Passport] = nil

	return {
		Balance = vRP.GetBank(Passport) or 0,
		Transactions = Transactions(Passport)
	}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INVOICES
-----------------------------------------------------------------------------------------------------------------------------------------
function Invoices(Passport)
	if not Passport then
		return {}
	end

	local Result = {}
	local Consult = exports.oxmysql:query_async("SELECT id,Passport,Received,Reason,Price,Timestamp FROM invoices WHERE Passport = ? OR Received = ? ORDER BY Timestamp DESC",{ Passport,Passport })
	if not Consult or #Consult == 0 then
		return Result
	end

	for Number = 1,#Consult do
		local Row = Consult[Number]
		local IsSender = Row.Passport == Passport
		local OtherPassport = IsSender and Row.Received or Row.Passport

		Result[#Result + 1] = {
			Id = Row.id,
			Date = Row.Timestamp,
			Reason = Row.Reason,
			Holder = {
				Passport = OtherPassport,
				Name = vRP.FullName(OtherPassport)
			},
			Value = Row.Price,
			Mode = IsSender and "Sent" or "Received"
		}
	end

	return Result
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INVOICES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Invoices()
	local source = source
	local Passport = vRP.Passport(source)
	return Passport and Invoices(Passport) or {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEINVOICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CreateInvoice(TargetPassport,Value,Reason)
	local source = source
	local Valuation = parseInt(Value)
	local Passport = vRP.Passport(source)
	local TargetPassport = parseInt(TargetPassport)
	if not Passport or not TargetPassport or Passport == TargetPassport or Valuation <= 0 or Active[Passport] then
		return false
	end

	local TargetSource = vRP.Source(TargetPassport)
	if not TargetSource then
		return false
	end

	Active[Passport] = true

	local FullName = vRP.FullName(Passport)
	local Message = ("<b>%s</b> lhe enviou uma fatura de <b>R$%s</b>, deseja aceitá-la?"):format(FullName,Dotted(Valuation))
	if not vRP.Request(TargetSource,"Banco",Message) then
		Active[Passport] = nil
		return false
	end

	local InvoiceId = exports.oxmysql:insert_async("INSERT INTO invoices (Passport,Received,Reason,Price,Timestamp) VALUES (?,?,?,?,?)",{ Passport,TargetPassport,Reason or "Sem descrição",Valuation,os.time() })

	Active[Passport] = nil

	return {
		Id = InvoiceId,
		Holder = {
			Passport = TargetPassport,
			Name = vRP.FullName(TargetPassport)
		}
	}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYINVOICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PayInvoice(Number)
	local source = source
	local Number = parseInt(Number)
	local Passport = vRP.Passport(source)
	if not Passport or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Invoice = exports.oxmysql:single_async("SELECT id,Passport,Received,Price FROM invoices WHERE id = ? LIMIT 1",{ Number })
	if not Invoice then
		Active[Passport] = nil
		return false
	end

	if Invoice.Received ~= Passport then
		Active[Passport] = nil
		return false
	end

	if not vRP.PaymentBank(Passport,Invoice.Price) then
		Active[Passport] = nil
		return false
	end

	exports.bank:AddTransactions(Passport,"InvoiceTo",Invoice.Price,("#%s - %s"):format(Invoice.Passport,vRP.FullName(Invoice.Passport)))
	exports.bank:AddTransactions(Invoice.Passport,"InvoiceMe",Invoice.Price,("#%s - %s"):format(Passport,vRP.FullName(Passport)))
	exports.oxmysql:query_async("DELETE FROM invoices WHERE id = ?",{ Number })
	vRP.GiveBank(Invoice.Passport,Invoice.Price)
	Active[Passport] = nil

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CANCELINVOICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.CancelInvoice(Number)
	local source = source
	local Number = parseInt(Number)
	local Passport = vRP.Passport(source)
	if not Passport or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Invoice = exports.oxmysql:single_async("SELECT id,Passport,Received FROM invoices WHERE id = ? LIMIT 1",{ Number })
	if not Invoice then
		Active[Passport] = nil
		return false
	end

	if Invoice.Passport ~= Passport then
		Active[Passport] = nil
		return false
	end

	exports.oxmysql:query_async("DELETE FROM invoices WHERE id = ?",{ Number })
	Active[Passport] = nil

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FINES
-----------------------------------------------------------------------------------------------------------------------------------------
function Fines(Passport)
	if not Passport then
		return {}
	end

	local Result = {}
	local Consult = exports.oxmysql:query_async("SELECT id,Officer,Fine,Timestamp,Description,Infractions FROM mdt_creative_fines WHERE Passport = ? AND Paid = 0 ORDER BY Timestamp DESC",{ Passport })
	if not Consult or #Consult == 0 then
		return Result
	end

	for Number = 1,#Consult do
		local Row = Consult[Number]

		Result[#Result + 1] = {
			Id = Row.id,
			Officer = {
				Passport = Row.Officer,
				Name = vRP.FullName(Row.Officer)
			},
			Value = Row.Fine,
			Date = Row.Timestamp,
			Description = Row.Description,
			Infractions = Row.Infractions
		}
	end

	return Result
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FINES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Fines()
	local source = source
	local Passport = vRP.Passport(source)
	return Passport and Fines(Passport) or {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETFINE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.GetFine(Number)
	local source = source
	local Number = parseInt(Number)
	local Passport = vRP.Passport(source)
	if not Passport then
		return false
	end

	local Consult = exports.oxmysql:single_async("SELECT id,Passport,Officer,Fine,Timestamp,Description,Infractions FROM mdt_creative_fines WHERE id = ? LIMIT 1",{ Number })
	if not Consult or Consult.Passport ~= Passport then
		return false
	end

	return {
		Id = Consult.id,
		Officer = {
			Passport = Consult.Officer,
			Name = vRP.FullName(Consult.Officer)
		},
		Value = Consult.Fine,
		Date = Consult.Timestamp,
		Description = Consult.Description,
		Infractions = Consult.Infractions
	}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYFINE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PayFine(Number)
	local source = source
	local Number = parseInt(Number)
	local Passport = vRP.Passport(source)
	if not Passport or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Consult = exports.oxmysql:single_async("SELECT id,Fine FROM mdt_creative_fines WHERE id = ? AND Passport = ? AND Paid = 0 LIMIT 1",{ Number,Passport })
	if not Consult then
		Active[Passport] = nil
		return false
	end

	if not vRP.PaymentBank(Passport,Consult.Fine) then
		Active[Passport] = nil
		return false
	end

	exports.oxmysql:update_async("UPDATE mdt_creative_fines SET Paid = 1 WHERE id = ? AND Passport = ?",{ Number,Passport })
	exports.bank:AddTransactions(Passport,"Fine",Consult.Fine,Number)
	Active[Passport] = nil

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYALLFINES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PayAllFines()
	local Passport = vRP.Passport(source)
	if not Passport or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Consult = exports.oxmysql:query_async("SELECT id,Fine FROM mdt_creative_fines WHERE Passport = ? AND Paid = 0 ORDER BY Timestamp ASC",{ Passport })
	if not Consult or #Consult == 0 then
		Active[Passport] = nil
		return false
	end

	for Number = 1,#Consult do
		local Row = Consult[Number]
		if not vRP.PaymentBank(Passport,Row.Fine) then
			break
		end

		exports.oxmysql:update_async("UPDATE mdt_creative_fines SET Paid = 1 WHERE id = ? AND Passport = ?",{ Row.id,Passport })
		exports.bank:AddTransactions(Passport,"Fine",Row.Fine,Row.id)
	end

	Active[Passport] = nil

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TAXS
-----------------------------------------------------------------------------------------------------------------------------------------
function Taxes(Passport)
	if not Passport then
		return {}
	end

	local Result = {}
	local Consult = exports.oxmysql:query_async("SELECT id,Name,Price,Timestamp,Description FROM taxes WHERE Passport = ? ORDER BY Timestamp DESC",{ Passport })
	if not Consult or #Consult == 0 then
		return Result
	end

	for Number = 1,#Consult do
		local Row = Consult[Number]

		Result[#Result + 1] = {
			Id = Row.id,
			Name = Row.Name,
			Value = Row.Price,
			Date = Row.Timestamp,
			Description = Row.Description
		}
	end

	return Result
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TAXES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Taxes()
	local source = source
	local Passport = vRP.Passport(source)
	return Passport and Taxes(Passport) or {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYTAX
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PayTax(Number)
	local source = source
	local Number = parseInt(Number)
	local Passport = vRP.Passport(source)
	if not Passport or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Consult = exports.oxmysql:single_async("SELECT id,Name,Price FROM taxes WHERE id = ? AND Passport = ? LIMIT 1",{ Number,Passport })
	if not Consult then
		Active[Passport] = nil
		return false
	end

	if not vRP.PaymentBank(Passport,Consult.Price) then
		Active[Passport] = nil
		return false
	end

	exports.oxmysql:query_async("DELETE FROM taxes WHERE id = ? AND Passport = ?",{ Number,Passport })
	exports.bank:AddTransactions(Passport,"Tax",Consult.Price,Consult.Name)
	Active[Passport] = nil

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYALLTAXES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.PayAllTaxes()
	local source = source
	local Passport = vRP.Passport(source)
	if not Passport or Active[Passport] then
		return false
	end

	Active[Passport] = true

	local Consult = exports.oxmysql:query_async("SELECT id,Name,Price FROM taxes WHERE Passport = ?",{ Passport })
	if not Consult or #Consult == 0 then
		Active[Passport] = nil
		return false
	end

	local Total = 0
	for _,v in ipairs(Consult) do
		Total = Total + v.Price
	end

	if not vRP.PaymentBank(Passport,Total) then
		Active[Passport] = nil
		return false
	end

	exports.oxmysql:query_async("DELETE FROM taxes WHERE Passport = ?",{ Passport })

	for _,v in ipairs(Consult) do
		exports.bank:AddTransactions(Passport,"Tax",v.Price,v.Name)
	end

	Active[Passport] = nil

	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDTAXES
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddTaxes",function(Passport,Name,Valuation,Description)
	if not Passport or not Valuation or Valuation <= 0 then
		return false
	end

	local Price = Valuation * 0.1
	for Permission,Multiplier in pairs({ Ouro = 0.65, Prata = 0.75, Bronze = 0.85 }) do
		if vRP.HasService(Passport,Permission) then
			Price = Price * Multiplier
			break
		end
	end

	if Price < 1 then
		return false
	end

	exports.oxmysql:insert_async("INSERT INTO taxes (Passport,Name,Timestamp,Price,Description) VALUES (?,?,?,?,?)",{ Passport,Name,os.time(),math.floor(Price),Description })

	return true
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKTAXES
-----------------------------------------------------------------------------------------------------------------------------------------
exports("CheckTaxes",function(Passport)
	if not Passport then
		return false
	end

	local source = vRP.Source(Passport)
	if not source then
		return false
	end

	local Consult = exports.oxmysql:single_async("SELECT 1 FROM taxes WHERE Passport = ? AND (Timestamp + 86400) < UNIX_TIMESTAMP() LIMIT 1",{ Passport })
	if Consult then
		TriggerClientEvent("Notify",source,"Impostos","Você possui débitos bancários.","amarelo",5000)
		return true
	end

	return false
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKFINES
-----------------------------------------------------------------------------------------------------------------------------------------
exports("CheckFines",function(Passport)
	if not Passport then
		return false
	end

	local source = vRP.Source(Passport)
	if not source then
		return false
	end

	if GetResourceState("mdt") == "started" then
		local Consult = exports.oxmysql:single_async("SELECT 1 FROM mdt_creative_fines WHERE Passport = ? AND Paid = 0 AND (Timestamp + 86400) < UNIX_TIMESTAMP() LIMIT 1",{ Passport })
		if Consult then
			TriggerClientEvent("Notify",source,"Multas","Você possui débitos bancários.","amarelo",5000)
			return true
		end
	end

	return false
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDTRANSACTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddTransactions",function(Passport,Type,Price,Reference)
	exports.oxmysql:insert_async("INSERT INTO bank_transactions (Passport,Type,Price,Timestamp,Reference) VALUES (@Passport,@Type,@Price,@Timestamp,@Reference)",{ Passport = Passport, Type = Type, Price = Price, Timestamp = os.time(), Reference = Reference })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect",function(Passport)
	if Active[Passport] then
		Active[Passport] = nil
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EXPORTS
-----------------------------------------------------------------------------------------------------------------------------------------
exports("Taxs",Taxes)
exports("Fines",Fines)
exports("Invoices",Invoices)
exports("Transactions",Transactions)