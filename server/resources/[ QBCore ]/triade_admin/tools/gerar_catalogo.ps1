# ---------------------------------------------------------------------------------------------
# TRIADE ADMIN - GERADOR DO CATALOGO DE VEICULOS ADDON
#
# Varre todos os vehicles.meta do servidor e escreve ../data/vehicles_addon.json.
# Corre isto sempre que instalares ou removeres carros addon e, a seguir,
# usa o comando "triadeadmin_veiculos" na consola do servidor (sem reiniciar).
# ---------------------------------------------------------------------------------------------

$ErrorActionPreference = "Stop"

$toolsDir    = Split-Path -Parent $MyInvocation.MyCommand.Path
$resourceDir = Split-Path -Parent $toolsDir
$dataDir     = Join-Path $resourceDir "data"
$outFile     = Join-Path $dataDir "vehicles_addon.json"

# Sobe ate a pasta "resources" do servidor a partir do caminho deste recurso.
$resourcesRoot = $resourceDir
while ($resourcesRoot -and (Split-Path -Leaf $resourcesRoot) -ne "resources") {
    $parent = Split-Path -Parent $resourcesRoot
    if ($parent -eq $resourcesRoot) { $resourcesRoot = $null; break }
    $resourcesRoot = $parent
}

if (-not $resourcesRoot) {
    Write-Host "ERRO: nao encontrei a pasta 'resources' acima de $resourceDir" -ForegroundColor Red
    exit 1
}

Write-Host "Pasta de recursos : $resourcesRoot"
Write-Host "Ficheiro de saida : $outFile"
Write-Host ""
Write-Host "A procurar vehicles.meta..." -ForegroundColor Cyan

$metaFiles = Get-ChildItem -LiteralPath $resourcesRoot -Filter "vehicles.meta" -Recurse -File -ErrorAction SilentlyContinue
Write-Host ("Encontrados {0} ficheiro(s)." -f $metaFiles.Count)

$models = New-Object System.Collections.Generic.HashSet[string]
$regex  = [regex]'<modelName>\s*([A-Za-z0-9_\-]+)\s*</modelName>'

foreach ($file in $metaFiles) {
    try {
        $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction Stop
    } catch {
        continue
    }
    foreach ($m in $regex.Matches($content)) {
        [void]$models.Add($m.Groups[1].Value.ToLowerInvariant())
    }
}

# Declarar em vehicles.meta nao garante que o modelo nasce: pode faltar o .yft, ou o nome ser
# de um carro vanilla. `models` leva so o que tem ficheiro; o resto vai para `semAsset`.
# ---------------------------------------------------------------------------------------------
Write-Host "A conferir os ficheiros .yft de cada modelo..." -ForegroundColor Cyan

$yft = New-Object System.Collections.Generic.HashSet[string]
Get-ChildItem -LiteralPath $resourcesRoot -Filter "*.yft" -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
    [void]$yft.Add([System.IO.Path]::GetFileNameWithoutExtension($_.Name).ToLowerInvariant())
}

$comAsset = New-Object System.Collections.Generic.List[string]
$semAsset = New-Object System.Collections.Generic.List[string]

foreach ($m in $models) {
    if ($yft.Contains($m)) { $comAsset.Add($m) } else { $semAsset.Add($m) }
}

$sorted    = @($comAsset) | Sort-Object
$semAssetS = @($semAsset) | Sort-Object

Write-Host ("  {0} declarados, {1} com .yft, {2} sem" -f $models.Count, $sorted.Count, $semAssetS.Count)

if (-not (Test-Path -LiteralPath $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

$payload = [ordered]@{
    generated  = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    models     = $sorted
    semAsset   = $semAssetS
    declarados = $models.Count
}

# -Compress evita um ficheiro gigante e ConvertTo-Json trata do escaping.
$json = $payload | ConvertTo-Json -Compress -Depth 3
[System.IO.File]::WriteAllText($outFile, $json, (New-Object System.Text.UTF8Encoding($false)))

Write-Host ""
Write-Host ("Gravados {0} modelo(s) addon em vehicles_addon.json" -f $sorted.Count) -ForegroundColor Green
Write-Host "Agora corre na consola do servidor: triadeadmin_veiculos" -ForegroundColor Yellow
