
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

async function readProjects() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeProjects(projects: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const projects = await readProjects();
      const projectIndex = projects.findIndex((p: any) => p.id === parseInt(id as string));
      
      if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found' });
      }

      projects[projectIndex] = {
        ...projects[projectIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
      };

      await writeProjects(projects);
      res.status(200).json(projects[projectIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const projects = await readProjects();
      const filteredProjects = projects.filter((p: any) => p.id !== parseInt(id as string));
      
      if (projects.length === filteredProjects.length) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await writeProjects(filteredProjects);
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
