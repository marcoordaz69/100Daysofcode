# SetupProjectImages.ps1

# Set the base path to the public folder in your project
$BasePath = Join-Path $PSScriptRoot "..\public"

# Create the images/projects folder if it doesn't exist
$ProjectImagesPath = Join-Path $BasePath "images\projects"
New-Item -ItemType Directory -Force -Path $ProjectImagesPath | Out-Null

# Function to create a placeholder file
function Create-PlaceholderFile {
    param (
        [string]$OutputPath,
        [string]$Text
    )

    Set-Content -Path $OutputPath -Value "Placeholder for $Text"
    Write-Host "Created placeholder file for $Text"
}

# Create placeholder files for 100 days
1..100 | ForEach-Object {
    $imagePath = Join-Path $ProjectImagesPath "day$_.png"
    if (-not (Test-Path $imagePath)) {
        Create-PlaceholderFile -OutputPath $imagePath -Text "Day $_"
    }
    else {
        Write-Host "Placeholder file for Day $_ already exists"
    }
}

Write-Host "Project images setup complete!"