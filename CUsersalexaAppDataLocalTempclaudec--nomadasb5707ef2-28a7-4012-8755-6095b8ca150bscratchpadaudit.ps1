# This script will help identify unused imports in TypeScript/TSX files
$files = Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-Object -ExpandProperty FullName
$files += Get-ChildItem -Path "src" -Filter "*.ts" -Recurse | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    Write-Host "Processing: $file"
}
