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

# Function to handle errors
function Handle-Error {
    param (
        [string]$ErrorMessage
    )
    Write-Host "Error: $ErrorMessage" -ForegroundColor Red
    exit 1
}

# Step 1: Update projects.json
try {
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
}
catch {
    Handle-Error "Failed to update projects.json: $_"
}

# Step 2: Process and Copy Screenshot
if ($ScreenshotPath) {
    try {
        $destScreenshotPath = Join-Path $BasePath "public\images\projects\day$($highestId + 1).png"
        if ($ScreenshotPath -ne $destScreenshotPath) {
            Copy-Item $ScreenshotPath -Destination $destScreenshotPath
        }
        
        # Image processing (requires ImageMagick)
        $ImageMagickPath = "C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"
        if (Test-Path $ImageMagickPath) {
            Write-Host "Processing image..."
            & $ImageMagickPath $destScreenshotPath -resize "800x800>" -quality 85 $destScreenshotPath
            if ($LASTEXITCODE -ne 0) {
                throw "ImageMagick failed to process the image."
            }
            Write-Host "Image processed and optimized."
        } else {
            Write-Host "ImageMagick not found. Skipping image optimization."
        }
    }
    catch {
        Handle-Error "Failed to process screenshot: $_"
    }
}

# Step 3: Update Git Repository
try {
    Set-Location $BasePath
    git add .
    git commit -m "Added project: $ProjectTitle (Day $($highestId + 1))"
    git push origin main
    if ($LASTEXITCODE -ne 0) {
        throw "Git push failed. Check your repository configuration."
    }
}
catch {
    Handle-Error "Git operation failed: $_"
}

Write-Host "Website updated with new project: $ProjectTitle (Day $($highestId + 1))" -ForegroundColor Green