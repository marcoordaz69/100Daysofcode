# UpdateWebsite.ps1

param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectTitle,
    [Parameter(Mandatory=$true)]
    [string]$ProjectDescription,
    [Parameter(Mandatory=$true)]
    [string]$Category,
    [string]$XTweetId,
    [string]$TechStack,
    [string]$ScreenshotPath
)

# Variables
$Date = Get-Date -Format "yyyy-MM-dd"
$BasePath = Split-Path -Parent $PSScriptRoot  # This is the root of your project

# Step 1: Update projects.json
$projectsJsonPath = Join-Path $BasePath "data\projects.json"
$projects = Get-Content $projectsJsonPath | ConvertFrom-Json

# Find the highest existing id
$highestId = ($projects | Measure-Object -Property id -Maximum).Maximum

$newProject = @{
    id = $highestId + 1
    title = $ProjectTitle
    description = $ProjectDescription
    category = $Category
    image = "/images/projects/day$($highestId + 1).png"  # Assuming this naming convention
    xTweetId = $XTweetId
    day = $highestId + 1
    technologies = $TechStack -split ',' | ForEach-Object { $_.Trim() }
    date = $Date
}

$projects += $newProject
$projects | ConvertTo-Json -Depth 4 | Set-Content $projectsJsonPath

# Step 2: Process and Copy Screenshot
if ($ScreenshotPath) {
    $destScreenshotPath = Join-Path $BasePath "public\images\projects\day$($highestId + 1).png"
    Copy-Item $ScreenshotPath -Destination $destScreenshotPath
}

# Step 3: Update Git Repository
Set-Location $BasePath
git add .
git commit -m "Added project: $ProjectTitle (Day $($highestId + 1))"
git push origin main

Write-Host "Website updated with new project: $ProjectTitle (Day $($highestId + 1))"