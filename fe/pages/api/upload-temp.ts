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
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'temp');

    // Ensure upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.maxFileSize = 5 * 1024 * 1024; // 5MB limit

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
    
    if (!files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    
    // Validate file type
    if (!file.mimetype?.startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = path.extname(file.originalFilename || '');
    const newFilename = `temp_${timestamp}_${randomString}${fileExtension}`;
    
    const newPath = path.join(uploadDir, newFilename);
    
    // Move file to final location
    await fs.rename(file.filepath, newPath);

    // Return the URL relative to the public directory
    const url = `/uploads/temp/${newFilename}`;
    
    res.status(200).json({ 
      success: true,
      url: url,
      filename: newFilename 
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
