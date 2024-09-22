param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectTitle,
    [Parameter(Mandatory=$true)]
    [string]$ProjectDescription,
    [string]$TechStack,
    [string]$ScreenshotFolderPath
)

# Variables
$Date = Get-Date -Format "yyyy-MM-dd"
$ProjectSlug = $ProjectTitle -replace '\s+', '-' -replace '[^\w\-]', ''
$BasePath = Split-Path -Parent $PSScriptRoot  # This is the root of your project

# Step 1: Update projects.json
$projectsJsonPath = Join-Path $BasePath "data\projects.json"
$projects = Get-Content $projectsJsonPath | ConvertFrom-Json
$newProject = @{
    id = $ProjectSlug
    title = $ProjectTitle
    date = $Date
    description = $ProjectDescription
    techStack = $TechStack -split ',' | ForEach-Object { $_.Trim() }
}
$projects += $newProject
$projects | ConvertTo-Json -Depth 4 | Set-Content $projectsJsonPath

# Step 2: Process and Copy Screenshots
if ($ScreenshotFolderPath) {
    $destScreenshotFolder = Join-Path $BasePath "public\images\projects\$ProjectSlug"
    New-Item -ItemType Directory -Force -Path $destScreenshotFolder
    Get-ChildItem $ScreenshotFolderPath -Filter *.png | ForEach-Object {
        # You might want to add image processing here (e.g., resizing)
        Copy-Item $_.FullName -Destination $destScreenshotFolder
    }
}

# Step 3: Update Git Repository
Set-Location $BasePath
git add .
git commit -m "Added project: $ProjectTitle on $Date"
git push origin main

Write-Host "Website updated with new project: $ProjectTitle"