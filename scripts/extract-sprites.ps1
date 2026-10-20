param(
 [Parameter(Mandatory=$true)][string]$RobotSheet,
 [Parameter(Mandatory=$true)][string]$PacmanSheet
)
# Run from the project root. Source sheets are read only and never bundled.
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -Path (Join-Path $PSScriptRoot 'SpriteExtractor.cs')
New-Item -ItemType Directory -Force src/assets/mascot-v2, src/assets/pacman | Out-Null
[PortfolioSprites]::Robot($RobotSheet,(Join-Path $PWD 'src/assets/mascot-v2'))
[PortfolioSprites]::SaveCrop($PacmanSheet,(Join-Path $PWD 'src/assets/pacman/character.png'),55,777,204,207)
[PortfolioSprites]::SaveCrop($PacmanSheet,(Join-Path $PWD 'src/assets/pacman/ghost-red.png'),307,829,151,159)
[PortfolioSprites]::SaveCrop($PacmanSheet,(Join-Path $PWD 'src/assets/pacman/ghost-pink.png'),470,829,153,159)
[PortfolioSprites]::SaveCrop($PacmanSheet,(Join-Path $PWD 'src/assets/pacman/ghost-blue.png'),638,829,157,159)
[PortfolioSprites]::SaveCrop($PacmanSheet,(Join-Path $PWD 'src/assets/pacman/ghost-orange.png'),806,829,160,159)
