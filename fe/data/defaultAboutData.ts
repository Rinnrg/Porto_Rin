import { UnifiedSection } from '@/services/unifiedAboutAPI';

export const defaultAboutSection: UnifiedSection = {
  id: 'default-about',
  type: 'about',
  title: 'Tentang Saya',
  content: `Saya adalah seorang mahasiswa aktif di Universitas Negeri Surabaya. Dengan pengalaman dalam berbagai bidang desain, mulai dari desain grafis hingga desain UI/UX, saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional.

Sebagai seorang desainer, saya selalu berusaha terus berkembang dan mengeksplorasi tren desain terkini untuk memberikan hasil yang relevan dan up-to-date.`,
  sort_order: 1
};

export const defaultSections: UnifiedSection[] = [
  defaultAboutSection,
  {
    id: 'default-education-1',
    type: 'education',
    title: 'Universitas Negeri Surabaya',
    content: 'Mahasiswa aktif yang sedang menempuh pendidikan dengan fokus pada bidang teknologi dan desain.',
    institution: 'Universitas Negeri Surabaya',
    degree: 'Sarjana',
    period: '2021 - Sekarang',
    sort_order: 2
  },
  {
    id: 'default-organization-1',
    type: 'organization',
    title: 'Himpunan Mahasiswa Teknik Informatika',
    content: 'Aktif sebagai anggota dalam berbagai kegiatan organisasi kemahasiswaan, mengembangkan soft skills dan leadership.',
    period: '2022 - 2023',
    name: 'Himpunan Mahasiswa Teknik Informatika',
    position: 'Anggota Divisi Kreatif',
    sort_order: 3
  },
  {
    id: 'default-organization-2',
    type: 'organization',
    title: 'Unit Kegiatan Mahasiswa (UKM) Desain',
    content: 'Berpartisipasi aktif dalam kegiatan desain grafis dan UI/UX, serta membantu mengorganisir workshop dan seminar desain.',
    period: '2021 - 2023',
    name: 'Unit Kegiatan Mahasiswa (UKM) Desain',
    position: 'Koordinator Desain Grafis',
    sort_order: 4
  },
  {
    id: 'default-work-1',
    type: 'workExperience',
    title: 'PT. Digital Creative Studio',
    content: 'Magang sebagai UI/UX Designer, bertanggung jawab merancang interface aplikasi mobile dan web. Belajar menggunakan tools seperti Figma, Adobe XD, dan berkolaborasi dengan tim developer.',
    period: 'Juni 2023 - Agustus 2023',
    company: 'PT. Digital Creative Studio',
    position: 'UI/UX Designer Intern',
    sort_order: 5
  },
  {
    id: 'default-work-2',
    type: 'workExperience',
    title: 'Freelance Graphic Designer',
    content: 'Menangani berbagai proyek desain grafis untuk UMKM dan startup lokal, mulai dari logo design, branding, hingga social media design.',
    period: 'Januari 2022 - Sekarang',
    company: 'Freelance',
    position: 'Graphic Designer',
    sort_order: 6
  },
  {
    id: 'default-work-3',
    type: 'workExperience',
    title: 'CV. Tech Innovation',
    content: 'Magang sebagai Frontend Developer, mengembangkan website company profile dan landing pages menggunakan React.js dan Next.js.',
    period: 'Februari 2024 - April 2024',
    company: 'CV. Tech Innovation',
    position: 'Frontend Developer Intern',
    sort_order: 7
  }
];
