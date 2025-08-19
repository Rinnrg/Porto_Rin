
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.maxFileSize = 10 * 1024 * 1024; // 10MB limit

    const parseForm = () => {
      return new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });
    };

    const { files } = await parseForm();
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file || !file.originalFilename) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalFilename);
    const newFilename = `${Date.now()}-${file.originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const newPath = path.join(uploadDir, newFilename);

    // Move file to final location
    await fs.rename(file.filepath, newPath);
    
    // Return success response
    return res.status(200).json({ 
      success: true,
      filename: newFilename, 
      url: `/uploads/${newFilename}`,
      originalName: file.originalFilename,
      size: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
