
"use client";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Curve, Ready, BackgroundImg, Marquee } from "@/components";
import { TransitionProvider } from "@/context/TransitionContext";
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CustomSection {
  id: string;
  name: string;
  sectionName: string;
  description: string;
  largeImages: string[];
  smallImages: string[];
  videos: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  date: string;
  liveDemo?: string;
  githubRepo?: string;
  image?: string;
  thumbnail?: string;
  slug: string;
  technologies?: string;
  challenge?: string;
  solution?: string;
  philosophy?: string;
  aboutImage?: string;
  philosophyImage?: string;
  challengeImages?: string[];
  projectVideo?: string;
  customSections?: CustomSection[];
  createdAt: string;
  updatedAt: string;
}

// Hero Component
function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="w-full rounded-b-[20px] pt-[50px]">
      <div className="w-full pb-[200px]">
        <div className="w-full flex flex-col">
          <div className="w-full margin padding-x">
            <div>
              <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                <div className="flex items-center gap-[5px]">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{
                      ease: [0.86, 0, 0.07, 0.995],
                      duration: 1,
                      delay: 1.5,
                    }}>
                    <Image
                      src={project.thumbnail || project.image || '/placeholder.jpg'}
                      alt="Project thumbnail"
                      width={120}
                      height={95}
                      className="h-[64px] w-auto sm:h-[45px] md:h-[63px] lg:h-[95px] xl:mt-[15px] mt-[10px] object-cover rounded-[10px]"
                    />
                  </motion.span>
                  <span className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
                    {project.title}
                  </span>
                </div>
              </h1>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}



// Philosophy Component
function ProjectPhilosophy({ project }: { project: Project }) {
  if (!project.philosophy) return null;
  
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col">
        <h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px] border-b border-[#21212155]">
          Philosophy
        </h2>
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full">
              <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                Filosofi Desain:
              </h3>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full">
              <p className="paragraph font-NeueMontreal text-secondry">
                {project.philosophy}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {project.philosophyImage && (
        <div className="w-full pt-[50px]">
          <div className="w-full padding-x">
            <Image
              src={project.philosophyImage}
              alt="Philosophy project"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-[20px]"
            />
          </div>
        </div>
      )}
    </section>
  );
}



// Video Component
function ProjectVideo({ project }: { project: Project }) {
  if (!project.projectVideo) return null;
  
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col">
        <h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px] border-b border-[#21212155]">
          Project Video
        </h2>
        <div className="w-full pt-[50px]">
          <div className="w-full padding-x">
            <video
              className="w-full h-auto rounded-[20px]"
              controls
              preload="metadata"
            >
              <source src={project.projectVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom Sections Component
function ProjectCustomSections({ project }: { project: Project }) {
  if (!project.customSections || project.customSections.length === 0) return null;
  
  return (
    <>
      {project.customSections.map((section, index) => (
        <section key={section.id} className="w-full padding-y">
          {/* Show title and description only for Section type */}
          {section.name === 'Section' && (
            <div className="w-full flex flex-col">
              <h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px] border-b border-[#21212155]">
                {section.sectionName || section.name}
              </h2>
              <div className="w-full border-t border-[#21212155] pt-[20px]">
                <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
                  <div className="w-1/2 sm:w-full xm:w-full">
                    <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
                      {section.sectionName || section.name}:
                    </h3>
                  </div>
                  <div className="w-1/2 sm:w-full xm:w-full">
                    <p className="paragraph font-NeueMontreal text-secondry">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Large Images - No text, just images */}
          {section.largeImages && section.largeImages.length > 0 && (
            <div className="w-full pt-[50px]">
              <div className="w-full padding-x">
                <div className="flex flex-col gap-[20px]">
                  {section.largeImages.map((imageUrl, imgIndex) => (
                    <div key={imgIndex} className="w-full">
                      <Image
                        src={imageUrl}
                        alt={`Large image ${imgIndex + 1}`}
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover rounded-[20px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Small Images - Horizontal side-by-side layout */}
          {section.smallImages && section.smallImages.length > 0 && (
            <div className="w-full pt-[30px]">
              <div className="w-full padding-x">
                <div className="w-full flex gap-[20px] sm:flex-col xm:flex-col overflow-x-auto">
                  {section.smallImages.map((imageUrl, imgIndex) => (
                    <div key={imgIndex} className="flex-shrink-0 w-[400px] sm:w-full xm:w-full">
                      <Image
                        src={imageUrl}
                        alt={`Small image ${imgIndex + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover rounded-[20px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Videos - No text, just videos */}
          {section.videos && section.videos.length > 0 && (
            <div className="w-full pt-[30px]">
              <div className="w-full padding-x">
                <div className="flex flex-col gap-[20px]">
                  {section.videos.map((videoUrl, vidIndex) => (
                    <div key={vidIndex} className="w-full">
                      <video
                        className="w-full h-auto rounded-[20px]"
                        controls
                        preload="metadata"
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </>
  );
}

// Project Info Component (Kategori & Tanggal)
function ProjectInfo({ project }: { project: Project }) {
  return (
    <section className="w-full padding-y">
      <div className="w-full flex flex-col">
        <div className="w-full border-t border-[#21212155] pt-[20px]">
          <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
            <div className="w-1/2 sm:w-full xm:w-full flex flex-col gap-[20px]">
              <div className="flex flex-col">
                <p className="paragraph font-NeueMontreal text-secondry underline">
                  Kategori:
                </p>
                <p className="paragraph font-NeueMontreal text-secondry">
                  {project.category}
                </p>
              </div>
            </div>
            <div className="w-1/2 sm:w-full xm:w-full">
              <div className="flex flex-col">
                <p className="paragraph font-NeueMontreal text-secondry underline">
                  Tanggal:
                </p>
                <p className="paragraph font-NeueMontreal text-secondry">
                  {new Date(project.date).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Works/Related Projects Component
function ProjectWorks() {
  return (
    <section className="w-full bg-marquee rounded-t-[20px]">
      <div className="w-full bg-marquee z-10 relative rounded-t-[20px] pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
        <Marquee
          title="OTHER PROJECTS"
          className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
        />
      </div>
      <div className="w-full flex padding-y justify-center">
        <div className="flex gap-4">
          <a
            href="/proyek"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Lihat Semua Proyek
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectDetailContent() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    try {
      const response = await fetch('/api/projects');
      const projects = await response.json();
      const foundProject = projects.find((p: Project) => p.slug === slug);
      setProject(foundProject || null);
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="text-xl mb-4">Project tidak ditemukan</div>
        <button
          onClick={() => router.push('/proyek')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Kembali ke Proyek
        </button>
      </div>
    );
  }

  return (
    <div>
      <Curve backgroundColor="#f1f1f1">
        <ProjectHero project={project} />
        <ProjectPhilosophy project={project} />
        <ProjectVideo project={project} />
        <ProjectCustomSections project={project} />
        <ProjectInfo project={project} />
        <ProjectWorks />
        <Ready />
      </Curve>
    </div>
  );
}

export default function ProjectDetail() {
  return (
    <TransitionProvider>
      <ProjectDetailContent />
    </TransitionProvider>
  );
}
