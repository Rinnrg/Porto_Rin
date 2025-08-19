import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'about.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Default data structure
const getDefaultData = () => ({
  aboutText: "Saya adalah seorang mahasiswa aktif di Universitas Negeri Surabaya.\nDengan pengalaman dalam berbagai bidang desain, mulai dari desain grafis hingga desain UI/UX,\nsaya selalu berusaha menghadirkan kreativitas yang tak hanya\nmenarik secara visual, tetapi juga fungsional.\n\nSebagai seorang desainer,\nsaya selalu berusaha\nterus berkembang dan\nmengeksplorasi tren desain\nterkini untuk memberikan hasil yang\nrelevan dan up-to-date.",
  heroDescription: "Saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional.",
  educations: [
    {
      id: "1",
      institution: "Universitas Negeri Surabaya",
      degree: "S1 Pendidikan Teknologi Informasi",
      period: "2022 - Sekarang",
      description: "Saya saat ini menempuh studi di Universitas Negeri Surabaya, jurusan Teknik Informatika, program studi S1 Pendidikan Teknologi Informasi angkatan 2022. Melalui pendidikan ini, saya mengembangkan pemahaman mendalam tentang teknologi informasi, pemrograman, dan pengaplikasiannya dalam bidang pendidikan. Studi ini juga membantu saya mengasah keterampilan teknis sekaligus membekali saya dengan pendekatan pedagogis untuk berbagi ilmu teknologi secara efektif.",
      logo: "/logo unesa black.svg"
    }
  ],
  organizations: [
    {
      id: "1",
      name: "Himti Unesa",
      position: "Staff Departemen Komunikasi dan Informasi",
      period: "2023 - 2024",
      description: "Di Himpunan Mahasiswa Teknik Informatika (HIMTI) Universitas Negeri Surabaya saya menjabat sebagai staff Departemen Komunikasi dan Informasi (KOMINFO) dengan masa 6 bulan yaitu maret sampai desember. Dalam peran ini, saya bertanggung jawab untuk mengelola feed Instagram HIMTI Unesa, termasuk mengupdate informasi terbaru dan membuat konten visual yang menarik. Melalui pengalaman ini, saya mengasah kemampuan komunikasi visual dan manajemen media sosial.",
      logo: "/logo himti.svg"
    },
    {
      id: "2",
      name: "GDSC Unesa",
      position: "Content Creator",
      period: "2023 - 2024",
      description: "Saya juga aktif di Google Developer Student Club Universitas Negeri Surabaya (GDSC Unesa) sebagai anggota divisi Content Creator. Dalam peran ini, saya bertanggung jawab untuk membuat feed postingan yang sesuai dengan timeline yang sudah ditentukan. Pengalaman ini memperkuat kemampuan saya dalam perencanaan konten, desain grafis, dan manajemen waktu untuk memastikan setiap informasi tersampaikan dengan efektif.",
      logo: "/logo gdsc.svg"
    },
    {
      id: "3",
      name: "HMP PTI Unesa",
      position: "Ketua Departemen Komunikasi dan Informasi",
      period: "2023 - 2024",
      description: "Di Himpunan Mahasiswa Prodi Pendidikan Teknologi Informasi HIMTI Unesa (HMP PTI) Unesa saya juga menjabat sebagai Ketua Departemen Komunikasi dan Informasi (KOMINFO). Dalam peran ini, saya bertanggung jawab untuk mengatur dan mengelola timeline postingan di akun Instagram HMP PTI, memastikan setiap informasi dapat tersampaikan dengan terorganisir dan tepat waktu.",
      logo: "/logo hmppti.svg"
    }
  ],
  customSections: [],
  sectionOrder: ['about', 'educations', 'organizations']
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  ensureDataDir();

  if (req.method === 'GET') {
    try {
      let data;
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(fileContent);
      } else {
        data = getDefaultData();
        // Save default data
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error reading about data:', error);
      res.status(500).json({ error: 'Failed to load about data' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = req.body;

      // Validate required fields - allow customSections to be saved even if other fields are missing
      if (!data.aboutText && !data.heroDescription && !data.educations && !data.organizations && !data.customSections) {
        return res.status(400).json({ error: 'Invalid data structure' });
      }

      // Filter and validate custom sections
      if (data.customSections) {
        // Filter out any null, undefined, or invalid sections
        data.customSections = data.customSections.filter((section: any) => 
          section && 
          section.id && 
          section.sectionTitle && 
          section.title &&
          typeof section.id === 'string' &&
          typeof section.sectionTitle === 'string' &&
          typeof section.title === 'string'
        );
        
        console.log('Saving custom sections:', data.customSections.length, 'valid items');
        data.customSections.forEach((section: any, index: number) => {
          console.log(`Section ${index}:`, {
            id: section.id,
            title: section.title,
            sectionTitle: section.sectionTitle,
            hasImage: !!section.image,
            imageUrl: section.image ? section.image.substring(0, 50) + '...' : 'No image'
          });
        });
      }

      // Ensure data structure integrity before saving
      const dataToSave = {
        ...data,
        customSections: data.customSections || [],
        sectionOrder: data.sectionOrder || ['about', 'educations', 'organizations']
      };

      // Save to file
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2));
      
      console.log('Data saved successfully to:', DATA_FILE);

      res.status(200).json({ 
        message: 'About data saved successfully', 
        data: dataToSave,
        success: true 
      });
    } catch (error) {
      console.error('Error saving about data:', error);
      res.status(500).json({ error: 'Failed to save about data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}