"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Ratings } from "@/components";
import { Team, Skillku, Principles } from "@/container";
import unifiedAboutAPI from "@/services/unifiedAboutAPI";

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  logo?: string;
}

interface Organization {
  id: string;
  name: string;
  position: string;
  period: string;
  description: string;
  logo?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  logo?: string;
}

interface CustomSection {
  id: string;
  sectionTitle: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  imageCaption?: string;
}

interface AboutData {
  aboutText: string;
  heroDescription: string;
  educations: Education[];
  organizations: Organization[];
  workExperiences: WorkExperience[];
  customSections: CustomSection[];
  sectionOrder: string[];
}

const defaultData: AboutData = {
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
  workExperiences: [],
  customSections: [],
  sectionOrder: ['about', 'educations', 'organizations']
};

export default function DynamicAboutSections() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        console.log('Loading data for Tentang Saya page...');

        // First, try to load from unified about API (database)
        try {
          const unifiedSections = await unifiedAboutAPI.getAllSections();
          console.log('Unified sections loaded:', unifiedSections);

          if (unifiedSections && unifiedSections.length > 0) {
            // Convert unified sections to AboutData format
            const convertedData = convertUnifiedSectionsToAboutData(unifiedSections);
            console.log('Converted data from unified API:', convertedData);
            setAboutData(convertedData);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error loading from unified API, falling back to about API:', error);
        }

        // Fallback to existing about API
        const response = await fetch('/api/about');
        let apiData: any = {};
        if (response.ok) {
          apiData = await response.json();
          console.log('About API data loaded:', apiData);
        }

        // Load custom sections from localStorage (as they're stored there in admin)
        const savedCustomSections = localStorage.getItem('customSections');
        const customSections = savedCustomSections ? JSON.parse(savedCustomSections) : [];

        // Load section order from localStorage
        const savedSectionOrder = localStorage.getItem('sectionOrder');
        let sectionOrder = ['about', 'educations', 'organizations'];
        if (savedSectionOrder) {
          sectionOrder = JSON.parse(savedSectionOrder);
        } else if (customSections.length > 0) {
          // If we have custom sections but no saved order, add them to order
          const customSectionTitles = [...new Set(customSections.map((s: any) => s.sectionTitle))];
          const customSectionKeys = customSectionTitles.map(title => `custom-${title}`);
          sectionOrder = [...sectionOrder, ...customSectionKeys];
        }

        setAboutData({
          aboutText: apiData.aboutText || defaultData.aboutText,
          heroDescription: apiData.heroDescription || defaultData.heroDescription,
          educations: apiData.educations || defaultData.educations,
          organizations: apiData.organizations || defaultData.organizations,
          workExperiences: apiData.workExperiences || defaultData.workExperiences,
          customSections: customSections,
          sectionOrder: sectionOrder,
        });
      } catch (error) {
        console.error('Error loading about data:', error);
        setAboutData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();

    // Listen for storage changes (when data is updated from admin)
    const handleStorageChange = () => {
      loadAboutData();
    };

    // Listen for custom event from admin page
    const handleAboutDataUpdate = (event: CustomEvent) => {
      console.log('About data updated from admin:', event.detail);
      loadAboutData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('aboutDataUpdated', handleStorageChange);
    window.addEventListener('unifiedAboutUpdated', handleAboutDataUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aboutDataUpdated', handleStorageChange);
      window.removeEventListener('unifiedAboutUpdated', handleAboutDataUpdate as EventListener);
    };
  }, []);

  // Convert unified sections to AboutData format
  const convertUnifiedSectionsToAboutData = (sections: any[]): AboutData => {
    const aboutSection = sections.find(s => s.type === 'about');
    const educationSections = sections.filter(s => s.type === 'education');
    const organizationSections = sections.filter(s => s.type === 'organization');
    const workSections = sections.filter(s => s.type === 'workExperience');
    const customSections = sections.filter(s => s.type === 'custom');

    return {
      aboutText: aboutSection?.content || defaultData.aboutText,
      heroDescription: aboutSection?.subtitle || defaultData.heroDescription,
      educations: educationSections.map((edu: any) => ({
        id: edu.id.toString(),
        institution: edu.title,
        degree: edu.subtitle || edu.degree || '',
        period: edu.period || '',
        description: edu.content,
        logo: edu.logo
      })),
      organizations: organizationSections.map((org: any) => ({
        id: org.id.toString(),
        name: org.title,
        position: org.subtitle || org.position || '',
        period: org.period || '',
        description: org.content,
        logo: org.logo
      })),
      workExperiences: workSections.map((work: any) => ({
        id: work.id.toString(),
        company: work.title,
        position: work.subtitle || work.position || '',
        period: work.period || '',
        description: work.content,
        logo: work.logo
      })),
      customSections: customSections.map((custom: any) => ({
        id: custom.id.toString(),
        sectionTitle: custom.section_title || 'Section Lainnya',
        title: custom.title,
        subtitle: custom.subtitle,
        content: custom.content,
        image: custom.logo || custom.image,
        imageCaption: custom.image_caption
      })),
      sectionOrder: ['about', 'educations', 'organizations', 'workExperience']
    };
  };

  // Section components
  const renderAboutSection = () => (
    <section key="about" className="w-full padding-y">
      <div className="w-full flex flex-col">
        <h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
          Tentang Saya
        </h2>
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                Tentang Saya:
              </h3>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full">
              <p className="paragraph font-NeueMontreal text-secondry whitespace-pre-line">
                {aboutData.aboutText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderEducationSection = () => {
    if (!aboutData.educations || aboutData.educations.length === 0) return null;

    return (
      <section key="educations" className="w-full bg-background">
        <div>
          <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
            Pendidikan
          </h1>
        </div>
        <div className="w-full border-t border-[#21212155] mt-[50px]">
          <div className="flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px]">
            {aboutData.educations.map((education, index) => (
              <div
                className="w-[440px] sm:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0"
                key={education.id}>
                <div className="w-full h-full flex flex-col gap-[50px]">
                  <div>
                    <Image
                      src={education.logo || "/logo unesa black.svg"}
                      alt={`logo ${education.institution}`}
                      width={80}
                      height={80}
                      className="w-[80px] h-[80px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <h3 className="text-[20px] leading-[24px] text-secondry font-NeueMontreal font-semibold">
                      {education.institution}
                    </h3>
                    <p className="text-[16px] leading-[20px] text-secondry font-NeueMontreal font-medium underline">
                      {education.degree}
                    </p>
                    <p className="text-[14px] leading-[18px] text-secondry font-NeueMontreal font-normal">
                      {education.period}
                    </p>
                    <p className="text-[16px] leading-[22px] text-secondry font-NeueMontreal font-normal">
                      {education.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="padding-x padding-y">
          <Ratings />
        </div>
      </section>
    );
  };

  const renderOrganizationsSection = () => {
    if (!aboutData.organizations || aboutData.organizations.length === 0) return null;

    return (
      <section key="organizations" className="w-full bg-background">
        <div>
          <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
            Pengalaman Organisasi
          </h1>
        </div>
        <div className="w-full border-t border-[#21212155] mt-[50px]">
          <div className="flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px]">
            {aboutData.organizations.map((organization) => (
              <div
                className="w-[440px] sm:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0"
                key={organization.id}>
                <div className="w-full h-full flex flex-col gap-[50px]">
                  <div>
                    <Image
                      src={organization.logo || "/logo himti.svg"}
                      alt={`logo ${organization.name}`}
                      width={80}
                      height={80}
                      className="w-[80px] h-[80px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <h3 className="text-[20px] leading-[24px] text-secondry font-NeueMontreal font-semibold">
                      {organization.name}
                    </h3>
                    <p className="text-[16px] leading-[20px] text-secondry font-NeueMontreal font-medium underline">
                      {organization.position}
                    </p>
                    <p className="text-[14px] leading-[18px] text-secondry font-NeueMontreal font-normal">
                      {organization.period}
                    </p>
                    <p className="text-[16px] leading-[22px] text-secondry font-NeueMontreal font-normal">
                      {organization.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="padding-x padding-y">
          <Ratings />
        </div>
      </section>
    );
  };

  const renderWorkExperienceSection = () => {
    if (!aboutData.workExperiences || aboutData.workExperiences.length === 0) return null;

    return (
      <section key="workExperience" className="w-full bg-background">
        <div>
          <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
            Pengalaman Kerja
          </h1>
        </div>
        <div className="w-full border-t border-[#21212155] mt-[50px]">
          <div className="flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px]">
            {aboutData.workExperiences.map((experience) => (
              <div
                className="w-[440px] sm:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0"
                key={experience.id}>
                <div className="w-full h-full flex flex-col gap-[50px]">
                  {experience.logo && (
                    <div>
                      <Image
                        src={experience.logo}
                        alt={experience.company}
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-contain rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-[20px]">
                    <h3 className="text-[20px] leading-[24px] text-secondry font-NeueMontreal font-semibold">
                      {experience.company}
                    </h3>
                    <p className="text-[16px] leading-[20px] text-secondry font-NeueMontreal font-medium underline">
                      {experience.position}
                    </p>
                    <p className="text-[14px] leading-[18px] text-secondry font-NeueMontreal font-normal">
                      {experience.period}
                    </p>
                    <p className="text-[16px] leading-[22px] text-secondry font-NeueMontreal font-normal whitespace-pre-line">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="padding-x padding-y">
          <Ratings />
        </div>
      </section>
    );
  };

  const renderCustomSections = () => {
    if (!aboutData.customSections || aboutData.customSections.length === 0) return [];

    // Group sections by sectionTitle
    const groupedSections = aboutData.customSections.reduce((acc, section) => {
      const sectionTitle = section.sectionTitle || 'Section Lainnya';
      if (!acc[sectionTitle]) {
        acc[sectionTitle] = [];
      }
      acc[sectionTitle].push(section);
      return acc;
    }, {} as Record<string, typeof aboutData.customSections>);

    return Object.entries(groupedSections).map(([sectionTitle, sections]) => (
      <section key={`custom-${sectionTitle}`} className="w-full bg-background">
        <div>
          <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
            {sectionTitle}
          </h1>
        </div>
        <div className="w-full border-t border-[#21212155] mt-[50px]">
          <div className="flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px]">
            {sections.map((section) => (
              <div
                className="w-[440px] sm:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0"
                key={section.id}>
                <div className="w-full h-full flex flex-col gap-[50px]">
                  {section.image && (
                    <div>
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-contain rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-[20px]">
                    <h3 className="text-[20px] leading-[24px] text-secondry font-NeueMontreal font-semibold">
                      {section.title}
                    </h3>
                    {section.subtitle && (
                      <p className="text-[16px] leading-[20px] text-secondry font-NeueMontreal font-medium underline">
                        {section.subtitle}
                      </p>
                    )}
                    {section.imageCaption && (
                      <p className="text-[14px] leading-[18px] text-secondry font-NeueMontreal font-normal">
                        {section.imageCaption}
                      </p>
                    )}
                    <p className="text-[16px] leading-[22px] text-secondry font-NeueMontreal font-normal whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="padding-x padding-y">
          <Ratings />
        </div>
      </section>
    ));
  };

  // Static sections that should always be included (from original layout)
  const renderStaticSections = () => (
    <>
      <Team />
      <Skillku />
      <Principles />
    </>
  );

  if (loading) {
    return (
      <div className="w-full padding-y flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600 font-NeueMontreal">Memuat data dari database...</p>
        </div>
      </div>
    );
  }

  // Section mapping
  const sectionComponents: Record<string, () => JSX.Element | null> = {
    about: renderAboutSection,
    educations: renderEducationSection,
    organizations: renderOrganizationsSection,
    workExperience: renderWorkExperienceSection,
  };

  // Render sections in order from admin settings
  const orderedSections: JSX.Element[] = [];
  const customSectionElements = renderCustomSections();

  aboutData.sectionOrder.forEach((sectionType, index) => {
    if (sectionType.startsWith('custom-')) {
      // Find matching custom section
      const customSectionTitle = sectionType.replace('custom-', '');
      const customElement = customSectionElements.find(el => 
        el.key === `custom-${customSectionTitle}`
      );
      if (customElement) {
        orderedSections.push(customElement);
      }
    } else if (sectionComponents[sectionType]) {
      const sectionElement = sectionComponents[sectionType]();
      if (sectionElement) {
        orderedSections.push(sectionElement);
      }
    }
  });

  return (
    <>
      {orderedSections}
      {renderStaticSections()}
    </>
  );
}
