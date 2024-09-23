# UpdateWebsite.ps1

param (
    [string]$ProjectTitle,
    [string]$ProjectDescription,
    [string]$ProjectGoal,
    [string]$ProjectOutcome,
    [string]$TechStack,
    [string]$Problems,
    [string]$FAQ,
    [string]$ScreenshotFolderPath
)


# Variables
$Date = Get-Date -Format "yyyy-MM-dd"
$ProjectSlug = $ProjectTitle -replace '\s+', '-' -replace '[^\w\-]', ''
$BasePath = $PSScriptRoot  # This is the root of your project

# Step 1: Create Project Entry in projects.json
$projectsJsonPath = Join-Path $BasePath "data\projects.json"
$projects = Get-Content $projectsJsonPath | ConvertFrom-Json
$newProject = @{
    id = $ProjectSlug
    title = $ProjectTitle
    date = $Date
    description = $ProjectDescription
    techStack = $TechStack -split ',' | ForEach-Object { $_.Trim() }
    problems = $Problems
    faq = $FAQ
}
$projects += $newProject
$projects | ConvertTo-Json -Depth 4 | Set-Content $projectsJsonPath

# Step 2: Create Project Page
$projectPagePath = Join-Path $BasePath "pages\projects\$ProjectSlug.tsx"
$projectPageContent = @"
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getProjectData } from '../../utils/helpers';

export default function Project({ project }) {
  return (
    <Layout>
      <h1>{project.title}</h1>
      <p>Date: {project.date}</p>
      <p>{project.description}</p>
      <h2>Technology Stack</h2>
      <ul>
        {project.techStack.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
      <h2>Problems</h2>
      <p>{project.problems}</p>
      <h2>FAQ</h2>
      <p>{project.faq}</p>
      {/* Add screenshot display logic here */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = getProjectData(params.id as string);
  return { props: { project } };
};

export async function getStaticPaths() {
  const projects = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));
  return { paths, fallback: false };
}
"@
Set-Content -Path $projectPagePath -Value $projectPageContent

# Step 3: Process and Copy Screenshots
if ($ScreenshotFolderPath) {
    $destScreenshotFolder = Join-Path $BasePath "public\images\projects\$ProjectSlug"
    New-Item -ItemType Directory -Force -Path $destScreenshotFolder
    Get-ChildItem $ScreenshotFolderPath -Filter *.png | ForEach-Object {
        # You might want to add image processing here (e.g., resizing)
        Copy-Item $_.FullName -Destination $destScreenshotFolder
    }
}

# Step 4: Update Git Repository
Set-Location $BasePath
git add .
git commit -m "Added project: $ProjectTitle on $Date"
git push origin main

Write-Host "Website updated with new project: $ProjectTitle"