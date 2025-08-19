"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Ratings } from "@/components";

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
  educations: Education[];
  organizations: Organization[];
  workExperiences?: WorkExperience[];
  customSections: CustomSection[];
  sectionOrder: string[];
}

export default function Pengalamanorg() {
  const [aboutData, setAboutData] = useState<AboutData>({
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
    sectionOrder: ['educations', 'organizations']
  });

  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem('aboutMeData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.educations || parsedData.organizations || parsedData.customSections || parsedData.sectionOrder) {
            setAboutData(prev => ({
              educations: parsedData.educations || prev.educations,
              organizations: parsedData.organizations || prev.organizations,
              customSections: parsedData.customSections || prev.customSections,
              sectionOrder: parsedData.sectionOrder || prev.sectionOrder
            }));
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();

    const handleDataUpdate = () => {
      loadSavedData();
    };

    window.addEventListener('aboutDataUpdated', handleDataUpdate);

    return () => {
      window.removeEventListener('aboutDataUpdated', handleDataUpdate);
    };
  }, []);

  const renderEducationSection = () => (
    <section className="w-full bg-background" key="educations">
      <div>
        <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
          Pendidikan
        </h1>
      </div>
      <div className="w-full border-t border-[#21212155] mt-[50px]">
        <div className="flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px]">
          {aboutData.educations.map((education) => (
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
                    className="w-[80px] h-[80px]"
                  />
                </div>
                <div className="flex flex-col gap-[20px]">
                  <p className="paragraph text-secondry font-NeueMontreal font-normal underline">
                    {education.institution}
                  </p>
                  <p className="paragraph text-secondry font-NeueMontreal font-normal">
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

  const renderOrganizationsSection = () => (
    <section className="w-full bg-background" key="organizations">
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
                    className="w-[80px] h-[80px]"
                  />
                </div>
                <div className="flex flex-col gap-[20px]">
                  <p className="paragraph text-secondry font-NeueMontreal font-normal underline">
                    {organization.name}
                  </p>
                  <p className="text-[16px] text-secondry font-NeueMontreal font-normal">
                    {organization.position} • {organization.period}
                  </p>
                  <p className="paragraph text-secondry font-NeueMontreal font-normal">
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

  const renderWorkExperienceSection = () => {
    if (!aboutData.workExperiences || aboutData.workExperiences.length === 0) {
      return null;
    }

    return (
      <section className="w-full bg-background">
        <div>
          <h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
            Pengalaman Kerja
          </h1>
        </div>
        <div className="w-full border-t border-[#21212155] mt-[50px]">
          {aboutData.workExperiences.map((experience, index) => (
            <div key={experience.id} className={`flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px] ${index > 0 ? 'border-t border-[#21212130] mt-[50px]' : ''}`}>
              <div className="w-[440px] sm:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0">
                <div className="w-full h-full flex flex-col gap-[50px]">
                  {experience.logo && (
                    <div>
                      <Image
                        src={experience.logo}
                        alt={experience.company}
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-[20px]">
                    <h3 className="paragraph text-secondry font-NeueMontreal font-semibold">
                      {experience.company}
                    </h3>
                    <p className="paragraph text-secondry font-NeueMontreal font-medium">
                      {experience.position}
                    </p>
                    <p className="small text-secondry font-NeueMontreal">
                      {experience.period}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full border-l border-[#21212155] sm:border-l-0 xm:border-l-0 sm:border-t xm:border-t sm:pt-[50px] xm:pt-[50px] sm:mt-[50px] xm:mt-[50px] padding-x py-[30px]">
                <p className="paragraph text-secondry font-NeueMontreal whitespace-pre-wrap">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const sectionComponents = {
    educations: renderEducationSection,
    organizations: renderOrganizationsSection,
    workExperiences: renderWorkExperienceSection
  };

  // Use sectionOrder from admin data, with proper default order
  const adminOrder = aboutData.sectionOrder || ['about', 'educations', 'organizations'];

  // Create a properly ordered array based on admin settings
  const currentOrder: string[] = [];

  // Process sections in the order defined by admin
  adminOrder.forEach(sectionType => {
    if (sectionType === 'about') return; // Skip 'about' as it's handled separately

    if (sectionType === 'educations' && aboutData.educations?.length > 0) {
      currentOrder.push('educations');
    } else if (sectionType === 'organizations' && aboutData.organizations?.length > 0) {
      currentOrder.push('organizations');
    } else if (sectionType === 'workExperiences' && aboutData.workExperiences?.length > 0) {
      currentOrder.push('workExperiences');
    }
  });

  // Add any missing sections that have data but weren't in the order
  if (aboutData.educations?.length > 0 && !currentOrder.includes('educations')) {
    currentOrder.push('educations');
  }
  if (aboutData.organizations?.length > 0 && !currentOrder.includes('organizations')) {
    currentOrder.push('organizations');
  }
  if (aboutData.workExperiences?.length > 0 && !currentOrder.includes('workExperiences')) {
    currentOrder.push('workExperiences');
  }

  return (
    <>
      {currentOrder.map((sectionType, index) => {
        const Component = sectionComponents[sectionType as keyof typeof sectionComponents];
        if (Component) {
          return <div key={`${sectionType}-${index}`}>{Component()}</div>;
        }
        return null;
      })}
    </>
  );
}