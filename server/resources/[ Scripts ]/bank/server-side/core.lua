-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Server = {}
Tunnel.bindInterface("bank",Server)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Active = {}
local yield = 0
-----------------------------------------------------------------------------------------------------------------------------------------
-- VERIFY
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	exports["oxmysql"]:query_async([[
		CREATE TABLE IF NOT EXISTS `investments` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`Passport` int(10) NOT NULL DEFAULT 0,
		`Liquid` int(20) NOT NULL DEFAULT 0,
		`Monthly` int(20) NOT NULL DEFAULT 0,
		`Deposit` int(20) NOT NULL DEFAULT 0,
		`Last` int(20) NOT NULL DEFAULT 0,
		PRIMARY KEY (`id`),
		KEY `Passport` (`Passport`),
		KEY `id` (`id`)
		) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	]])
	exports["oxmysql"]:query_async([[
		CREATE TABLE IF NOT EXISTS `transactions` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`Passport` int(10) NOT NULL DEFAULT 0,
		`Type` varchar(50) NOT NULL,
		`Date` varchar(50) NOT NULL,
		`Value` int(11) NOT NULL,
		`Balance` int(11) NOT NULL,
		PRIMARY KEY (`id`),
		KEY `Passport` (`Passport`),
		KEY `id` (`id`)
		) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	]])
	exports["oxmysql"]:query_async([[
		CREATE TABLE IF NOT EXISTS `invoices` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`Passport` int(10) NOT NULL DEFAULT 0,
		`Received` int(10) NOT NULL DEFAULT 0,
		`Type` varchar(50) NOT NULL,
		`Reason` longtext NOT NULL,
		`Holder` varchar(50) NOT NULL,
		`Value` int(11) NOT NULL DEFAULT 0,
		PRIMARY KEY (`id`),
		KEY `Passport` (`Passport`),
		KEY `id` (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	]])
	exports["oxmysql"]:query_async([[
		CREATE TABLE IF NOT EXISTS `taxs` (
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`Passport` int(10) NOT NULL DEFAULT 0,
		`Name` varchar(50) NOT NULL,
		`Date` varchar(50) NOT NULL,
		`Hour` varchar(50) NOT NULL,
		`Value` int(11) NOT NULL DEFAULT 0,
		`Message` longtext NOT NULL,
		PRIMARY KEY (`id`),
		KEY `Passport` (`Passport`),
		KEY `id` (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	]])
	Wait(1000)
	vRP.Prepare("invoices/Remove","DELETE FROM invoices WHERE id = @id")
	vRP.Prepare("invoices/Check","SELECT * FROM invoices WHERE id = @id")
	vRP.Prepare("invoices/List","SELECT * FROM invoices WHERE Passport = @Passport")
	vRP.Prepare("invoices/Add","INSERT INTO invoices(Passport,Received,Type,Reason,Holder,Value) VALUES(@Passport,@Received,@Type,@Reason,@Holder,@Value)")
	vRP.Prepare("transactions/List","SELECT * FROM transactions WHERE Passport = @Passport ORDER BY id DESC LIMIT @Limit")
	vRP.Prepare("transactions/Add","INSERT INTO transactions(Passport,Type,Date,Value,Balance) VALUES(@Passport,@Type,@Date,@Value,@Balance)")
	vRP.Prepare("investments/Remove","DELETE FROM investments WHERE Passport = @Passport")
	vRP.Prepare("investments/Check","SELECT * FROM investments WHERE Passport = @Passport")
	vRP.Prepare("investments/Add","INSERT INTO investments(Passport,Deposit,Last) VALUES(@Passport,@Deposit,UNIX_TIMESTAMP() + 86400)")
	vRP.Prepare("investments/Invest","UPDATE investments SET Deposit = Deposit + @Value, Last = UNIX_TIMESTAMP() + 86400 WHERE Passport = @Passport")
	vRP.Prepare("investments/Actives","UPDATE investments SET Monthly = Monthly + FLOOR((Deposit + Liquid) * 0.10), Liquid = Liquid + FLOOR((Deposit + Liquid) * 0.025), Last = UNIX_TIMESTAMP() + 86400 WHERE Last < UNIX_TIMESTAMP()")
	vRP.Prepare("taxs/List","SELECT * FROM taxs WHERE Passport = @Passport")
	vRP.Prepare("taxs/Remove","DELETE FROM taxs WHERE Passport = @Passport AND id = @id")
	vRP.Prepare("taxs/Check","SELECT * FROM taxs WHERE Passport = @Passport AND id = @id")
	vRP.Prepare("taxs/Add","INSERT INTO taxs(Passport,Name,Date,Hour,Value,Message) VALUES(@Passport,@Name,@Date,@Hour,@Value,@Message)")
	local next_time = GetGameTimer()
	while true do
		if os.time() >= next_time then
			next_time = os.time() + 3600
			vRP.Query("investments/Actives")
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- HOME
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.Home()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		local check = vRP.Query("investments/Check", {Passport = Passport})
		if check[1] then
			yield = check[1].Monthly
		end
		local balance = vRP.Identity(Passport).Bank
		local transactions = Transactions(Passport)
		return {
			Passport = Passport,
			yield = yield,
			balance = balance,
			transactions = transactions,
		}
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSACTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.TransactionHistory()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		return Transactions(Passport, 50)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BANKDEPOSIT
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.Deposit(amount)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and Active[Passport] == nil and parseInt(amount) > 0 then
		Active[Passport] = true
	    if vRP.ConsultItem(Passport, "dollars", amount) and vRP.tryGetInventoryItem(Passport, "dollars", tonumber(amount)) then
			vRP.GiveBank(Passport, amount)
			exports["bank"]:AddTransactions(Passport,"entry",amount)
			TriggerEvent("Discord","Deposito","**ID:** "..Passport.."\n**Depositou:** "..parseInt(amount).." \n**Horário:** "..os.date("%H:%M:%S"),3092790)
		end
		Active[Passport] = nil
		local balance = vRP.Identity(Passport).Bank
		local transactions = Transactions(Passport)
		return {balance = balance, transactions = transactions}
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BANWITHDRAW
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.Withdraw(amount)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and Active[Passport] == nil and parseInt(amount) > 0 then
		Active[Passport] = true
			vRP.WithdrawCash(Passport, amount)
			exports["bank"]:AddTransactions(Passport,"exit",amount)
			TriggerEvent("Discord","Saque","**ID:** "..Passport.."\n**Sacou:** "..parseInt(amount).." \n**Horário:** "..os.date("%H:%M:%S"),3092790)
		Active[Passport] = nil
		local balance = vRP.Identity(Passport).Bank
		local transactions = Transactions(Passport)
		return {balance = balance, transactions = transactions}
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERENCE
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.Transfer(ClosestPed,amount)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and Active[Passport] == nil and parseInt(amount) > 0 then
		Active[Passport] = true
			if vRP.Identity(ClosestPed) and vRP.PaymentBank(Passport, amount) then
				vRP.GiveBank(ClosestPed, amount)
				exports["bank"]:AddTransactions(ClosestPed,"entry",amount)
			end
		Active[Passport] = nil
		local balance = vRP.Identity(Passport).Bank
		local transactions = Transactions(Passport)
		return {balance = balance, transactions = transactions}
	end
	return false
end
----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSACTION
-----------------------------------------------------------------------------------------------------------------------------------------
function Transactions(Passport, Limit)
	local Passport = Passport
	local transactions = {}
	if not Limit then
		Limit = 4
	end
	local result = vRP.Query('transactions/List',{ Passport = Passport, Limit = Limit })
	if result[1] then
		for i, transaction in pairs(result) do
		    local type = transaction.Type
			local date = transaction.Date
			local value = transaction.Value
			local balance = transaction.Balance
			transactions[#transactions + 1] = {
				type = type,
				date = date,
				value = value,
				balance = balance
			}
		end
	end
	return transactions
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERENCE
-----------------------------------------------------------------------------------------------------------------------------------------
function Taxs(Passport)
	local Passport = Passport
	local taxs = {}
	local result = vRP.Query('taxs/List',{ Passport = Passport })
	if result[1] then
		for i, tax in pairs(result) do
			taxs[i] = {
				id = tax.id,
				name = tax.Name,
				value = tax.Value,
				date = tax.Date,
				hour = tax.Hour,
				message = tax.Message
			}
		end
	end
	return taxs
end

function Server.TaxList()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
	  	return Taxs(Passport)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERENCE
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.TaxPayment(id)
	local source = source
	local Passport = vRP.Passport(source)
	local id = id
	if Passport and Active[Passport] == nil then
		Active[Passport] = true
		local result = vRP.Query('taxs/Check',{ Passport = Passport, id = id })
		if result[1] then
			if vRP.PaymentBank(Passport, result[1].Value) then
				vRP.Query("taxs/Remove",{ Passport = Passport, id = id })
				exports["bank"]:AddTransactions(Passport,"exit",result[1].Value)
				Active[Passport] = nil
				return true
			end
		end
		Active[Passport] = nil
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERENCE
-----------------------------------------------------------------------------------------------------------------------------------------
function Invoices(Passport)
	local Passport = Passport
	local invoices = {}
	local result = vRP.Query('invoices/List',{ Passport = Passport })
	if result[1] then
		for i, invoice in pairs(result) do
			if not invoices[invoice.Type] then
				invoices[invoice.Type] = {}
			end
			local id = invoice.id
			local reason = invoice.Reason
			local holder = invoice.Holder
			invoices[invoice.Type][#invoices[invoice.Type] + 1] = {id = id, reason = reason, holder = holder, value = invoice.Value}
		end
	end
	return invoices
end

function Server.InvoiceList()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		return Invoices(Passport)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERENCE
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.InvoicePayment(id)
	local source = source
	local Passport = vRP.Passport(source)
	local id = id
	if Passport and Active[Passport] == nil then
		Active[Passport] = true
		local result = vRP.Query('invoices/Check',{ Passport = Passport, id = id })
		if result[1] then
			if vRP.PaymentBank(Passport, result[1].Value) then
				vRP.Query("invoices/Remove",{ Passport = Passport, id = id })
				exports["bank"]:AddTransactions(Passport,"exit",result[1].Value)
				Active[Passport] = nil
				return true
			end
		end
		Active[Passport] = nil
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAKEINVOICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.MakeInvoice(OtherPassport, value, reason)
	local source = source
	local Passport = vRP.Passport(source)
	local OtherPassport = OtherPassport
	if Passport and not Active[Passport]  and parseInt(value) > 0 then
		Active[Passport] = true
			local ClosestPed = vRP.Source(OtherPassport)
			if ClosestPed then
				if vRP.Request(ClosestPed,"Banco","<b>" .. vRP.Identity(Passport).Name .. "	" .. vRP.Identity(Passport).Name2 .. "</b> lhe enviou uma fatura de <b>R$" .. parseFormat(value) .. "</b>, deseja aceita-la?") then
				local Received = OtherPassport
				local Type = "received"
    			local Reason = reason
				local Holder = vRP.Identity(Passport).Name .. " " .. vRP.Identity(Passport).Name2
				local Value = value
				vRP.Query('invoices/Add',{ Passport = Passport,Received = Received,Type = Type,Reason = Reason,Holder = Holder ,Value = Value})
				local Type = "sent"
				local Holder = "Você"
				vRP.Query('invoices/Add',{ Passport = Passport,Received = Received,Type = Type,Reason = Reason,Holder = Holder ,Value = Value})
				return Invoices(Passport)
				end
			end
		Active[Passport] = nil
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
--  INVESTMENTS
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.Investments()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		local investment = vRP.Query('investments/Check',{ Passport = Passport })
		if investment[1] then
			local deposit = investment[1].Deposit
			local liquid = investment[1].Liquid
			local brute = deposit
			local total = deposit + liquid
			return {
				["deposit"] = deposit,
				["liquid"] = liquid,
				["brute"] = brute,
				["total"] = total
			}
		end
		return {
			["deposit"] = 0,
			["liquid"] = 0,
			["brute"] = 0,
			["total"] = 0
		}
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADD INVESTMENT
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.Invest(amount)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and not Active[Passport] and parseInt(amount) > 0 then
		Active[Passport] = true
		if vRP.PaymentBank(Passport, amount) then
			local investment = vRP.Query('investments/Check',{ Passport = Passport })
			if  investment[1] then
				local Value = amount
				vRP.Query("investments/Invest",{ Passport = Passport, Value = Value })
			else
				local Deposit = amount
				vRP.Query("investments/Add",{ Passport = Passport, Deposit = Deposit })
			end
			Active[Passport] = nil
			return true
		end
		Active[Passport] = nil
		end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REM INVESTMENT
-----------------------------------------------------------------------------------------------------------------------------------------
function Server.InvestRescue()
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and not Active[Passport] then
		Active[Passport] = true
		local investment = vRP.Query('investments/Check',{ Passport = Passport })
		if  investment[1] then
			vRP.Query("investments/Remove", {Passport = Passport})
			local amount = investment[1].Deposit + investment[1].Liquid
			vRP.GiveBank(Passport, amount)
			exports["bank"]:AddTransactions(Passport,"entry", amount)
		end
		Active[Passport] = nil
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDTRANSACTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddTransactions",function(Passport,Type,amount)
	if vRP.Identity(Passport) and vRP.Source(Passport) then
		local Passport = Passport
		local Type = Type
		local Date = os.date("%d/%m/%Y")
		local Value = amount
		local Balance = vRP.Identity(Passport).Bank
		vRP.Query("transactions/Add", {Passport = Passport,Type = Type,Date = Date,Value = Value,Balance = Balance})
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDTAXS
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddTaxs", function(Passport, Name, Value, Message)
	if vRP.Identity(Passport) then
		local Passport = Passport
		local Name = Name
		local Date = os.date("%d/%m/%Y")
		local Hour = os.date("%H:%M")
		local Value = Value
		local Message = Message
	  	vRP.Query("taxs/Add", {Passport = Passport,Name = Name,Date = Date,Hour = Hour,Value = Value,Message = Message}) 
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect", function(Passport)
	if Active[Passport] then
	  	Active[Passport] = nil
	end
end)

exports("Taxs", Taxs)
exports("Invoices", Invoices)
exports("Transactions", Transactions)