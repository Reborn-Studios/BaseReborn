-- Responsibilities:
-- - Wait for RegisterCallback to be available, then register server callbacks
-- - Debug logging when Config.debug is true
-- - Fetch/create user banking records (credit score, savings, transactions)
-- - Provide account snapshots for UI
-- - Handle transactions: deposit, withdraw, transfer (personal/savings)
-- - Update credit score via exported functions (addCredit/removeCredit)
-- NOTE: Functionality preserved exactly; comments added for clarity only.
while true do
  if RegisterCallback then break end
  Wait(0)
end
-- Debug logger (respects Config.debug)
function logDebug(message)
  local debugEnabled = Config.debug
  if debugEnabled then
    print(message)
  end
end
-- Fetch or create user's banking row; returns row table
function getOrCreateBankingRow(sourceId)
  local uuid = fetchUsersUUID(sourceId)
  if not uuid then return end

  logDebug("Attempting to fetch user banking data for ID: " .. sourceId)

  local rows = MySQL.Sync.fetchAll(
    "SELECT * FROM sv_banking_data WHERE uuid = @uuid",
    { ["@uuid"] = uuid }
  )

  if not rows[1] then
    -- Create initial record if missing
    MySQL.Sync.execute(
      "INSERT INTO sv_banking_data (uuid, credit_score, savings_balance, transactions) VALUES (@uuid, @credit_score, @savings_balance, @transactions)",
      {
        ["@uuid"] = uuid,
        ["@credit_score"] = Config.creditScore.startingCredit,
        ["@savings_balance"] = 0,
        ["@transactions"] = json.encode({}),
      }
    )
    rows = { {
      uuid = uuid,
      credit_score = Config.creditScore.startingCredit,
      savings_balance = 0,
      transactions = json.encode({}),
    } }
    logDebug("User ID: " .. sourceId .. " did not have any banking data, creating new data")
  end

  logDebug("User ID: " .. sourceId .. " banking data has been successfully fetched")
  return rows[1]
end
-- Fetch user's credit score (or starting value if missing)
function getCreditScore(sourceId)
  if not sourceId then return end
  local uuid = fetchUsersUUID(sourceId)
  if not uuid then return end

  local rows = MySQL.Sync.fetchAll(
    "SELECT credit_score FROM sv_banking_data WHERE uuid = @uuid",
    { ["@uuid"] = uuid }
  )
  logDebug("Attempting to fetch user credit score for ID: " .. sourceId)

  local score = rows[1] and rows[1].credit_score or Config.creditScore.startingCredit
  return score
end
function fetchAccountData(sourceId)
  -- Ensure player exists
  local user = fetchUserBySource(sourceId)
  if not user then return end

  -- Fetch or create row for savings/transactions
  local row = getOrCreateBankingRow(sourceId)

  local payload = {}
  payload.CHARACTER_NAME = fetchUserNameBySource(sourceId)

  -- Credit score (if enabled)
  local creditScoreValue = 0
  if Config.creditScore.enabled then
    local fetched = getCreditScore(sourceId)
    creditScoreValue = fetched or 0
  end
  payload.CHARACTER_CREDIT_SCORE = creditScoreValue

  -- Primary balance
  payload.PRIMARY_BANK_BALANCE = getUserPrimaryAccount(sourceId)

  -- Savings balance
  local savingsBalance = 0
  if row then
    local parsed = tonumber(row.savings_balance)
    if parsed then savingsBalance = parsed end
  end
  payload.SAVINGS_BANK_BALANCE = savingsBalance

  -- Cash balance
  payload.CASH_BALANCE = getUserCashAmount(sourceId)

  -- Transactions
  local transactions = {}
  if row then
    local decoded = json.decode(row.transactions)
    if decoded then transactions = decoded end
  end
  payload.TRANSACTIONS = transactions

  logDebug("User ID: " .. sourceId .. " has successfully fetched their account data")
  return payload
end
RegisterCallback("fetchAccountData", fetchAccountData)

function handleTransaction(A0_2, A1_2, A2_2, A3_2, A4_2, A5_2)
  -- Readable locals
  local sourceId, account, action, amount, dateStr, targetId = A0_2, A1_2, A2_2, A3_2, A4_2, A5_2
  if not (sourceId and account and action and amount) or not dateStr then
    return { type = "error", response = "invalid_data" }
  end

  logDebug(string.format("Attempting to create transaction for ID:%s with action %s and amount %s", sourceId, action, amount))

  if amount <= 0 then
    logDebug("User ID: " .. sourceId .. " attempted to perform an action with less than the minimum amount")
    return { type = "error", response = "min_amount" }
  end

  local me = fetchUserBySource(sourceId)
  if not me then
    return { type = "error", response = "myself_not_found" }
  end
  local sourceUuid = fetchUsersUUID(sourceId)
  if not sourceUuid then
    return { type = "error", response = "myself_not_found" }
  end

  local resultType, resultResponse = "", ""
  local row = getOrCreateBankingRow(sourceId)
  local actionLower = string.lower(action)

  if actionLower == "transfer" then
    if not targetId then return end
    if targetId == sourceId then
      logDebug("User ID: " .. sourceId .. " attempted to transfer money to themselves")
      return { type = "error", response = "cant_transfer_to_self" }
    end
    if not fetchUserBySource(targetId) or not fetchUserBySource(targetId) then
      logDebug("User ID: " .. sourceId .. " attempted to transfer money to a non-existent player")
      return { type = "error", response = "no_target" }
    end

    if string.lower(account) == "personal" then
      logDebug("User ID: " .. sourceId .. " is transferring money to " .. targetId .. " from their personal account")
      local current = getUserPrimaryAccount(sourceId)
      if amount > current then
        resultType, resultResponse = "error", "no_money"
        logDebug("User ID: " .. sourceId .. " does not have enough money to transfer")
      else
        removeAcountMoney(sourceId, amount)
        addAccountMoney(targetId, amount)
        resultType, resultResponse = "success", "transfer_success"
        logDebug("User ID: " .. sourceId .. " has successfully transferred money to " .. targetId)
      end

      local transactions = json.decode(row.transactions) or {}
      table.insert(transactions, {
        account = "Personal",
        type = "Transfer",
        recipient = fetchUserNameBySource(targetId),
        amount = amount,
        status = (resultType == "error" and "Failed" or "Completed"),
        date = dateStr,
      })
      MySQL.Sync.execute(
        "UPDATE sv_banking_data SET transactions = @transactions WHERE uuid = @uuid",
        { ["@transactions"] = json.encode(transactions), ["@uuid"] = sourceUuid }
      )
      logDebug("User ID: " .. sourceId .. " has successfully updated their transaction history")
    end

  elseif actionLower == "deposit" then
    local accountLower = string.lower(account)
    if accountLower == "personal" then
      logDebug("User ID: " .. sourceId .. " is depositing money into their personal account")
      local cash = getUserCashAmount(sourceId)
      if amount > cash then
        resultType, resultResponse = "error", "no_money"
        logDebug("User ID: " .. sourceId .. " does not have enough money to deposit")
      else
        removeCashAmount(sourceId, amount)
        addAccountMoney(sourceId, amount)
        resultType, resultResponse = "success", "deposit_success"
        logDebug("User ID: " .. sourceId .. " has successfully deposited money into their personal account")
      end

      local transactions = json.decode(row.transactions) or {}
      table.insert(transactions, {
        account = "Personal",
        type = "Deposit",
        recipient = "Personal",
        amount = amount,
        status = (resultType == "error" and "Failed" or "Completed"),
        date = dateStr,
      })
      MySQL.Sync.execute(
        "UPDATE sv_banking_data SET transactions = @transactions WHERE uuid = @uuid",
        { ["@transactions"] = json.encode(transactions), ["@uuid"] = sourceUuid }
      )
      logDebug("User ID: " .. sourceId .. " has successfully updated their transaction history")

    elseif accountLower == "savings" then
      logDebug("User ID: " .. sourceId .. " is depositing money into their savings account")
      local primary = getUserPrimaryAccount(sourceId)
      if amount > primary then
        resultType, resultResponse = "error", "no_money"
        logDebug("User ID: " .. sourceId .. " does not have enough money to deposit")
      else
        removeAcountMoney(sourceId, amount)
        local currentSavings = tonumber(row.savings_balance)
        MySQL.Sync.execute(
          "UPDATE sv_banking_data SET savings_balance = @savings_balance WHERE uuid = @uuid",
          { ["@savings_balance"] = currentSavings + amount, ["@uuid"] = sourceUuid }
        )
        resultType, resultResponse = "success", "deposit_success"
        logDebug("User ID: " .. sourceId .. " has successfully deposited money into their savings account")
      end

      local transactions = json.decode(row.transactions) or {}
      table.insert(transactions, {
        account = "Savings",
        type = "Deposit",
        recipient = "Savings",
        amount = amount,
        status = (resultType == "error" and "Failed" or "Completed"),
        date = dateStr,
      })
      MySQL.Sync.execute(
        "UPDATE sv_banking_data SET transactions = @transactions WHERE uuid = @uuid",
        { ["@transactions"] = json.encode(transactions), ["@uuid"] = sourceUuid }
      )
      logDebug("User ID: " .. sourceId .. " has successfully updated their transaction history")
    end

  elseif actionLower == "withdraw" then
    local accountLower = string.lower(account)
    if accountLower == "personal" then
      logDebug("User ID: " .. sourceId .. " is withdrawing money from their personal account")
      local primary = getUserPrimaryAccount(sourceId)
      if amount > primary then
        resultType, resultResponse = "error", "no_money"
        logDebug("User ID: " .. sourceId .. " does not have enough money to withdraw")
      else
        addCashAmount(sourceId, amount)
        removeAcountMoney(sourceId, amount)
        resultType, resultResponse = "success", "withdraw_success"
        logDebug("User ID: " .. sourceId .. " has successfully withdrawn money from their personal account")
      end

      local transactions = json.decode(row.transactions) or {}
      table.insert(transactions, {
        account = "Personal",
        type = "Withdraw",
        recipient = "Personal",
        amount = amount,
        status = (resultType == "error" and "Failed" or "Completed"),
        date = dateStr,
      })
      MySQL.Sync.execute(
        "UPDATE sv_banking_data SET transactions = @transactions WHERE uuid = @uuid",
        { ["@transactions"] = json.encode(transactions), ["@uuid"] = sourceUuid }
      )
      logDebug("User ID: " .. sourceId .. " has successfully updated their transaction history")

    elseif accountLower == "savings" then
      logDebug("User ID: " .. sourceId .. " is withdrawing money from their savings account")
      local currentSavings = tonumber(row.savings_balance)
      if amount > currentSavings then
        resultType, resultResponse = "error", "no_money"
        logDebug("User ID: " .. sourceId .. " does not have enough money to withdraw")
      else
        addAccountMoney(sourceId, amount)
        MySQL.Sync.execute(
          "UPDATE sv_banking_data SET savings_balance = @savings_balance WHERE uuid = @uuid",
          { ["@savings_balance"] = currentSavings - amount, ["@uuid"] = sourceUuid }
        )
        resultType, resultResponse = "success", "withdraw_success"
        logDebug("User ID: " .. sourceId .. " has successfully withdrawn money from their savings account")
      end

      local transactions = json.decode(row.transactions) or {}
      table.insert(transactions, {
        account = "Savings",
        type = "Withdraw",
        recipient = "Savings",
        amount = amount,
        status = (resultType == "error" and "Failed" or "Completed"),
        date = dateStr,
      })
      MySQL.Sync.execute(
        "UPDATE sv_banking_data SET transactions = @transactions WHERE uuid = @uuid",
        { ["@transactions"] = json.encode(transactions), ["@uuid"] = sourceUuid }
      )
      logDebug("User ID: " .. sourceId .. " has successfully updated their transaction history")
    end
  end

  logDebug("User ID: " .. sourceId .. " transaction has been fully created")
  return { type = resultType, response = resultResponse }
end
function manageAccountCallback(sourceId, data)
  if not sourceId then return end
  local user = fetchUserBySource(sourceId)
  if not user then
    logDebug("User ID: " .. sourceId .. " attempted to perform an action without being found")
    return { type = "error", response = "myself_not_found" }
  end

  if not (data and data.action and data.amount) then
    logDebug("User ID: " .. sourceId .. " attempted to perform an action with invalid data")
    return { type = "error", response = "uncaught_error" }
  end

  local amount = tonumber(data.amount)
  local dateStr = os.date("%m/%d/%Y")
  local recipientNum = tonumber(data.recipient)
  return handleTransaction(sourceId, data.account, data.action, amount, dateStr, recipientNum)
end
RegisterCallback("manageAccount", manageAccountCallback)

function addCredit(sourceId, amount)
  if not sourceId or not amount then return end
  local user = fetchUserBySource(sourceId); if not user then return end
  local uuid = fetchUsersUUID(sourceId); if not uuid then return end
  getOrCreateBankingRow(sourceId) -- ensure row exists
  local current = getCreditScore(sourceId)
  local newScore = current + amount
  MySQL.Sync.execute(
    "UPDATE sv_banking_data SET credit_score = @credit_score WHERE uuid = @uuid",
    { ["@credit_score"] = newScore, ["@uuid"] = uuid }
  )
  logDebug("User ID: " .. sourceId .. " has successfully updated their credit score")
end
function removeCredit(sourceId, amount)
  if not sourceId or not amount then return end
  local user = fetchUserBySource(sourceId); if not user then return end
  local uuid = fetchUsersUUID(sourceId); if not uuid then return end
  getOrCreateBankingRow(sourceId) -- ensure row exists
  local current = getCreditScore(sourceId)
  local newScore = current - amount
  MySQL.Sync.execute(
    "UPDATE sv_banking_data SET credit_score = @credit_score WHERE uuid = @uuid",
    { ["@credit_score"] = newScore, ["@uuid"] = uuid }
  )
  logDebug("User ID: " .. sourceId .. " has successfully updated their credit score")
end
exports("addCredit", addCredit)
exports("removeCredit", removeCredit)
