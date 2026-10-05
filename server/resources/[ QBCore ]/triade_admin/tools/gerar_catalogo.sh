#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------
# TRIADE ADMIN - GERADOR DO CATALOGO DE VEICULOS ADDON (Linux)
#
# Varre todos os vehicles.meta do servidor e escreve ../data/vehicles_addon.json.
# Corre isto sempre que instalares ou removeres carros addon e, a seguir,
# usa o comando "triadeadmin_veiculos" na consola do servidor (sem reiniciar).
# ---------------------------------------------------------------------------------------------
set -euo pipefail

TOOLS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESOURCE_DIR="$(dirname "$TOOLS_DIR")"
DATA_DIR="$RESOURCE_DIR/data"
OUT_FILE="$DATA_DIR/vehicles_addon.json"

# Sobe ate a pasta "resources"
RESOURCES_ROOT="$RESOURCE_DIR"
while [ "$(basename "$RESOURCES_ROOT")" != "resources" ]; do
	PARENT="$(dirname "$RESOURCES_ROOT")"
	if [ "$PARENT" = "$RESOURCES_ROOT" ]; then
		echo "ERRO: nao encontrei a pasta 'resources' acima de $RESOURCE_DIR" >&2
		exit 1
	fi
	RESOURCES_ROOT="$PARENT"
done

echo "Pasta de recursos : $RESOURCES_ROOT"
echo "Ficheiro de saida : $OUT_FILE"
echo
echo "A procurar vehicles.meta..."

TOTAL="$(find "$RESOURCES_ROOT" -type f -name vehicles.meta 2>/dev/null | wc -l)"
echo "Encontrados $TOTAL ficheiro(s)."

mkdir -p "$DATA_DIR"

MODELS="$(find "$RESOURCES_ROOT" -type f -name vehicles.meta -print0 2>/dev/null \
	| xargs -0 grep -hoE '<modelName>[^<]*</modelName>' 2>/dev/null \
	| sed 's/<[^>]*>//g' \
	| tr -d ' \r' \
	| tr 'A-Z' 'a-z' \
	| grep -E '^[a-z0-9_-]+$' \
	| sort -u)"

COUNT="$(printf '%s\n' "$MODELS" | grep -c . || true)"

{
	printf '{"generated":"%s","models":[' "$(date '+%Y-%m-%d %H:%M:%S')"
	printf '%s\n' "$MODELS" | grep . | awk 'NR>1{printf ","} {printf "\"%s\"", $0}'
	printf ']}'
} > "$OUT_FILE"

echo
echo "Gravados $COUNT modelo(s) addon em vehicles_addon.json"
echo "Agora corre na consola do servidor: triadeadmin_veiculos"
