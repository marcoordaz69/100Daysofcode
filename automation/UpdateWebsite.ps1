param (
    [string]$ProjectTitle,
    [string]$ProjectDescription,
    [string]$ProjectGoal,
    [string]$ProjectOutcome,
    [string]$TechStack,
    [string]$Problems,
    [string]$FAQ,
    [string]$ScreenshotFolderPath,
    [string]$ProjectsJsonPath,
    [string]$ProjectPagesPath
)

# Variables
$Date = Get-Date -Format "yyyy-MM-dd"
$ProjectSlug = $ProjectTitle -replace '\s+', '-' -replace '[^\w\-]', ''
$BasePath = $PSScriptRoot

# Step 1: Create Project Entry in projects.json
$projects = Get-Content $ProjectsJsonPath | ConvertFrom-Json
$newProject = @{
    id = $ProjectSlug
    title = $ProjectTitle
    date = $Date
    description = $ProjectDescription
    techStack = $TechStack -split ',' | ForEach-Object { $_.Trim() }
    problems = $Problems
    faq = $FAQ
    image = "/images/projects/$ProjectSlug/main.png"  # Add image path
}
$projects += $newProject
$projects | ConvertTo-Json -Depth 4 | Set-Content $ProjectsJsonPath

# Step 2: Create Project Page
$projectPagePath = Join-Path $ProjectPagesPath "$ProjectSlug.tsx"
$projectPageContent = @"
// ... (keep the existing content of the project page template)
"@
Set-Content -Path $projectPagePath -Value $projectPageContent

# Step 3: Process and Copy Screenshots
if ($ScreenshotFolderPath) {
    $destScreenshotFolder = Join-Path $BasePath "public\images\projects\$ProjectSlug"
    New-Item -ItemType Directory -Force -Path $destScreenshotFolder

    # Copy all screenshots
    Get-ChildItem $ScreenshotFolderPath -Filter *.png | ForEach-Object {
        Copy-Item $_.FullName -Destination $destScreenshotFolder
        
        # Copy the first image as main.png
        if (-not (Test-Path (Join-Path $destScreenshotFolder "main.png"))) {
            Copy-Item $_.FullName -Destination (Join-Path $destScreenshotFolder "main.png")
        }
    }
}

# Step 4: Update Git Repository
Set-Location $BasePath
git add .
git commit -m "Added project: $ProjectTitle on $Date"
git push origin main

Write-Host "Website updated with new project: $ProjectTitle"
