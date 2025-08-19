import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  
  if (!path || !Array.isArray(path)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  try {
    // Construct the Laravel API storage URL (with /api/storage prefix)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const larravelStorageUrl = `${API_BASE_URL}/api/storage/${path.join('/')}`;
    
    console.log('🔄 Proxying storage request to:', larravelStorageUrl);
    
    // Fetch the file from Laravel API
    const response = await fetch(larravelStorageUrl);
    
    if (!response.ok) {
      console.error('❌ Laravel storage response not ok:', response.status, response.statusText);
      return res.status(response.status).json({ error: 'File not found' });
    }

    // Get the content type from Laravel response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    console.log('✅ File found, serving with type:', contentType);
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Stream the file back to the client
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
    
  } catch (error) {
    console.error('❌ Storage proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Increase body size limit for file uploads
export const config = {
  api: {
    responseLimit: '10mb',
  },
};
