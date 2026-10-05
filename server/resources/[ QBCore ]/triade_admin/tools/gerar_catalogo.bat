@echo off
chcp 65001 >nul
title Triade Admin - Gerar catalogo de veiculos addon
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0gerar_catalogo.ps1"
echo.
pause
