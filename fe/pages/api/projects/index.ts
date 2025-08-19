
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read projects from JSON file
async function readProjects() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write projects to JSON file
async function writeProjects(projects: any[]) {
  await ensureDataDirectory();
  await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const projects = await readProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read projects' });
    }
  } else if (req.method === 'POST') {
    try {
      const projects = await readProjects();
      const newProject = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      projects.push(newProject);
      await writeProjects(projects);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
