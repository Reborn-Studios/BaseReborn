-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE USERS
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/get_accounts","SELECT * FROM accounts WHERE identifier = @identifier")
vRP.prepare("vRP/get_characters","SELECT id,registration,phone,name,name2,bank FROM characters WHERE identifier = @identifier and deleted = 0")

vRP.prepare("vRP/get_vrp_users","SELECT * FROM characters WHERE id = @id")
vRP.prepare("vRP/get_vrp_registration","SELECT id FROM characters WHERE registration = @registration")
vRP.prepare("vRP/get_vrp_phone","SELECT id FROM characters WHERE phone = @phone")
vRP.prepare("vRP/create_characters","INSERT INTO characters(identifier,name,name2) VALUES(@identifier,@name,@name2)")
vRP.prepare("vRP/remove_characters","UPDATE characters SET deleted = 1 WHERE id = @id")
vRP.prepare("vRP/update_characters","UPDATE characters SET registration = @registration, phone = @phone WHERE id = @id")
vRP.prepare("characters/updatePhone","UPDATE characters SET phone = @phone WHERE id = @id")
vRP.prepare("vRP/rename_characters","UPDATE characters SET name = @name, name2 = @name2 WHERE id = @id")
vRP.prepare("vRP/add_identifier","INSERT INTO accounts_ids(identifier,user_id) VALUES(@identifier,@user_id)")
vRP.prepare("vRP/userid_byidentifier","SELECT user_id FROM accounts_ids WHERE identifier = @identifier")
vRP.prepare("vRP/create_user_id","INSERT INTO characters(identifier) VALUES(@identifier); SELECT LAST_INSERT_ID() AS id")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE BANK
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/set_bank","UPDATE characters SET bank = @bank WHERE id = @id")
vRP.prepare("vRP/add_bank","UPDATE characters SET bank = bank + @bank WHERE id = @id")
vRP.prepare("vRP/del_bank","UPDATE characters SET bank = bank - @bank WHERE id = @id")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_USERS
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/create_user","INSERT INTO accounts(identifier,token) VALUES(@identifier,@token); SELECT LAST_INSERT_ID() AS id")
vRP.prepare("vRP/set_banned","UPDATE accounts SET banned = @banned WHERE identifier = @identifier")
vRP.prepare("vRP/set_whitelist","UPDATE accounts SET whitelist = @whitelist WHERE identifier = @identifier")
vRP.prepare("vRP/set_whitelist_id","UPDATE accounts SET whitelist = @whitelist WHERE id = @id")
vRP.prepare("vRP/get_account_by_token","SELECT * FROM accounts WHERE token = @token")
vRP.prepare("vRP/set_token_whitelist","UPDATE accounts SET whitelist = @whitelist WHERE token = @token")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_USER_DATA
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/set_userdata","REPLACE INTO vrp_user_data(user_id,dkey,dvalue) VALUES(@user_id,@key,@value)")
vRP.prepare("vRP/get_userdata","SELECT dvalue FROM vrp_user_data WHERE user_id = @user_id AND dkey = @key")
vRP.prepare("vRP/rem_user_dkey","DELETE FROM vrp_user_data WHERE user_id = @user_id AND dkey = @key")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_SRV_DATA
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/set_srvdata","REPLACE INTO vrp_srv_data(dkey,dvalue) VALUES(@key,@value)")
vRP.prepare("vRP/get_srvdata","SELECT dvalue FROM vrp_srv_data WHERE dkey = @key")
vRP.prepare("entitydata/setData","REPLACE INTO vrp_srv_data(dkey,dvalue) VALUES(@dkey,@value)")
vRP.prepare("entitydata/getData","SELECT dvalue FROM vrp_srv_data WHERE dkey = @dkey OR Name = @Name")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE permissions
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/get_perm","SELECT * FROM permissions WHERE user_id = @user_id")
vRP.prepare("vRP/get_specific_perm","SELECT * FROM permissions WHERE permiss = @permiss")
vRP.prepare("vRP/get_group","SELECT * FROM permissions WHERE user_id = @user_id AND permiss = @permiss")
vRP.prepare("vRP/add_group","INSERT INTO permissions(user_id,permiss) VALUES(@user_id,@permiss)")
vRP.prepare("vRP/del_group","DELETE FROM permissions WHERE user_id = @user_id AND permiss = @permiss")
vRP.prepare("vRP/cle_group","DELETE FROM permissions WHERE user_id = @user_id")
vRP.prepare("vRP/upd_group","UPDATE permissions SET permiss = @newpermiss WHERE user_id = @user_id AND permiss = @permiss")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_PRIORITY
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/set_premium","UPDATE accounts SET premium = @premium, chars = @chars, predays = @predays, priority = @priority WHERE identifier = @identifier")
vRP.prepare("vRP/update_priority","UPDATE accounts SET premium = 0, predays = 0, priority = 0 WHERE identifier = @identifier")
vRP.prepare("vRP/update_premium","UPDATE accounts SET predays = predays + @predays WHERE identifier = @identifier")
vRP.prepare("accounts/infosUpdatechars","UPDATE accounts SET chars = chars + 1 WHERE identifier = @identifier")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_HOMES
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/get_homeuser","SELECT * FROM vrp_homes WHERE user_id = @user_id AND home = @home")
vRP.prepare("vRP/get_homeuserid","SELECT * FROM vrp_homes WHERE user_id = @user_id")
vRP.prepare("vRP/get_homeuserowner","SELECT * FROM vrp_homes WHERE user_id = @user_id AND home = @home AND owner = 1")
vRP.prepare("vRP/get_homeuseridowner","SELECT * FROM vrp_homes WHERE home = @home AND owner = 1")
vRP.prepare("vRP/get_homepermissions","SELECT * FROM vrp_homes WHERE home = @home")
vRP.prepare("vRP/add_permissions","INSERT IGNORE INTO vrp_homes(home,user_id) VALUES(@home,@user_id)")
vRP.prepare("vRP/buy_permissions","INSERT IGNORE INTO vrp_homes(home,user_id,owner,vault) VALUES(@home,@user_id,1,@vault)")
vRP.prepare("vRP/count_homepermissions","SELECT COUNT() as qtd FROM vrp_homes WHERE home = @home")
vRP.prepare("vRP/count_homes","SELECT COUNT() as qtd FROM vrp_homes WHERE user_id = @user_id")
vRP.prepare("vRP/rem_permissions","DELETE FROM vrp_homes WHERE home = @home AND user_id = @user_id")
vRP.prepare("vRP/rem_allpermissions","DELETE FROM vrp_homes WHERE home = @home")
vRP.prepare("vRP/upd_vaulthomes","UPDATE vrp_homes SET vault = vault + @vault WHERE home = @home AND owner = 1")
vRP.prepare("vRP/transfer_homes","UPDATE vrp_homes SET user_id = @nuser_id WHERE user_id = @user_id AND home = @home")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_GARAGES
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/get_vehicle","SELECT * FROM vehicles WHERE user_id = @user_id")
vRP.prepare("vRP/get_vehicle_plate","SELECT * FROM vehicles WHERE plate = @plate")
vRP.prepare("vRP/get_vehicle_phone","SELECT * FROM vehicles WHERE phone = @phone")
vRP.prepare("vRP/rem_vehicle","DELETE FROM vehicles WHERE user_id = @user_id AND vehicle = @vehicle")
vRP.prepare("vRP/get_vehicles","SELECT * FROM vehicles WHERE user_id = @user_id AND vehicle = @vehicle")
vRP.prepare("vRP/set_update_vehicles","UPDATE vehicles SET engine = @engine, body = @body, fuel = @fuel, doors = @doors, windows = @windows, tyres = @tyres WHERE user_id = @user_id AND vehicle = @vehicle")
vRP.prepare("vRP/set_arrest","UPDATE vehicles SET arrest = @arrest, time = @time WHERE user_id = @user_id AND vehicle = @vehicle")
vRP.prepare("vRP/move_vehicle","UPDATE vehicles SET user_id = @nuser_id WHERE user_id = @user_id AND vehicle = @vehicle")
vRP.prepare("vRP/add_vehicle","INSERT IGNORE INTO vehicles(user_id,vehicle,plate,phone,work) VALUES(@user_id,@vehicle,@plate,@phone,@work)")
vRP.prepare("vRP/con_maxvehs","SELECT COUNT(vehicle) as qtd FROM vehicles WHERE user_id = @user_id AND work = 'false'")
vRP.prepare("vRP/rem_srv_data","DELETE FROM vrp_srv_data WHERE dkey = @dkey")
vRP.prepare("vRP/update_garages","UPDATE characters SET garage = garage + 1 WHERE id = @id")
vRP.prepare("vRP/update_plate_vehicle","UPDATE vehicles SET plate = @plate WHERE user_id = @user_id AND vehicle = @vehicle")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_PRISON
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/set_prison","UPDATE characters SET prison = prison + @prison, locate = @locate WHERE id = @user_id")
vRP.prepare("vRP/rem_prison","UPDATE characters SET prison = prison - @prison WHERE id = @user_id")
vRP.prepare("vRP/fix_prison","UPDATE characters SET prison = 1 WHERE id = @user_id")
vRP.prepare("vRP/resgate_prison","UPDATE characters SET prison = 0 WHERE id = @user_id")
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE vRP_GEMS
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.prepare("vRP/set_vRP_gems","UPDATE accounts SET gems = gems + @gems WHERE identifier = @identifier")
vRP.prepare("vRP/rem_vRP_gems","UPDATE accounts SET gems = gems - @gems WHERE identifier = @identifier")
vRP.prepare("vRP/set_rental_time","UPDATE vehicles SET premiumtime = @premiumtime WHERE user_id = @user_id AND vehicle = @vehicle")
