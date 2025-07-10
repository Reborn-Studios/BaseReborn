@echo off
:loop
echo Iniciando FXServer...
start /wait "" "..\artifacts\FXServer.exe" +exec server.cfg
echo Servidor foi encerrado. Reiniciando em 3 segundos...
timeout /t 3
goto loop