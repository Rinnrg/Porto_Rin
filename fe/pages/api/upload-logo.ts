import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads', 'about-sections'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filename: (name, ext, part) => {
        return `${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
      }
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'about-sections');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get filename from the path
    const filename = path.basename(file.filepath);
    
    // Return full URL pointing to Next.js public folder
    const publicUrl = `http://localhost:3000/uploads/about-sections/${filename}`;

    console.log('✅ File uploaded successfully:', {
      originalName: file.originalFilename,
      filename: filename,
      size: file.size,
      type: file.mimetype,
      url: publicUrl
    });

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: publicUrl,
        filename: filename,
        original_name: file.originalFilename,
        size: file.size,
        mime_type: file.mimetype
      }
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
