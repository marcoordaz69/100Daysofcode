# MediaProcessing.ps1

# Base path for your project
$BasePath = Join-Path $PSScriptRoot "..\public\images\projects"

# Function to check if a command is available
function Test-Command($CommandName) {
    return $null -ne (Get-Command $CommandName -ErrorAction SilentlyContinue)
}

# Image Processing
function Process-Images {
    if (Test-Command magick) {
        Write-Host "Processing images..."
        Get-ChildItem "$BasePath\*.png" | ForEach-Object {
            $outputPath = Join-Path $_.DirectoryName "optimized_$($_.Name)"
            magick $_.FullName -resize "800x800>" -quality 85 $outputPath
            Remove-Item $_.FullName
            Rename-Item $outputPath $_.Name
            Write-Host "Processed: $($_.Name)"
        }
    } else {
        Write-Host "ImageMagick is not installed. Skipping image processing."
    }
}

# Video Processing
function Process-Videos {
    if (Test-Command ffmpeg) {
        Write-Host "Processing videos..."
        Get-ChildItem "$BasePath\*.mp4" | ForEach-Object {
            $outputPath = Join-Path $_.DirectoryName "compressed_$($_.Name)"
            ffmpeg -i $_.FullName -vcodec libx264 -crf 23 -preset medium -acodec aac -strict experimental $outputPath
            Remove-Item $_.FullName
            Rename-Item $outputPath $_.Name
            Write-Host "Processed: $($_.Name)"
        }
    } else {
        Write-Host "FFmpeg is not installed. Skipping video processing."
    }
}

# Main execution
Process-Images
Process-Videos

Write-Host "Media processing complete!"