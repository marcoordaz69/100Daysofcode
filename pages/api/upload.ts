import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

const UPLOAD_PASSWORD = 'm8201670'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public', 'images', 'projects'),
    keepExtensions: true,
  })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Parse error:', err)
      return res.status(500).json({ error: 'Upload failed during parsing' })
    }

    const password = Array.isArray(fields.password) ? fields.password[0] : fields.password
    if (password !== UPLOAD_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect password' })
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    const projectId = Array.isArray(fields.projectId) ? fields.projectId[0] : fields.projectId

    if (!file || !projectId) {
      return res.status(400).json({ error: 'Missing file or project ID' })
    }

    const oldPath = file.filepath
    const fileName = `day${projectId}${path.extname(file.originalFilename || '')}`
    const newPath = path.join(process.cwd(), 'public', 'images', 'projects', fileName)

    try {
      fs.renameSync(oldPath, newPath)

      // Update project data in projects.json
      const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json')
      const projectsData = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'))
      const projectIndex = projectsData.findIndex((p: { id: number }) => p.id.toString() === projectId)

      if (projectIndex !== -1) {
        projectsData[projectIndex].image = `/images/projects/${fileName}`
        fs.writeFileSync(projectsFilePath, JSON.stringify(projectsData, null, 2))
      } else {
        console.error('Project not found:', projectId)
        return res.status(404).json({ error: 'Project not found' })
      }

      res.status(200).json({ success: true, message: 'Image uploaded and project updated successfully' })
    } catch (error) {
      console.error('File operation error:', error)
      return res.status(500).json({ error: 'Failed to save the file or update project data' })
    }
  })
}