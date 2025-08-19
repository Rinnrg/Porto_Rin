"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectCard, Buttonno } from "@/components";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  slug: string;
  image?: string;
  thumbnail?: string;
  liveDemo?: string;
  githubRepo?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from projects
  const categories = [
    "Semua",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  // Filter projects based on selected category
  const filteredProjects = projects.filter((item) =>
    selectedCategory === "Semua" ? true : item.category === selectedCategory,
  );

  // Variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.3 },
    }),
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full flex flex-col items-center justify-center bg-about">
          <div
            data-scroll
            data-scroll-speed="-.2"
            className="bg-[#BFDA62] w-[75%] py-[20px] rounded-t-[10px]"
          />
          <div
            className="bg-[#B8D25E] relative z-20 w-[90%] py-[20px] rounded-t-[10px]"
            data-scroll
            data-scroll-speed="-.1"
          />
        </div>
        <section className="w-full relative z-30 padding-y rounded-t-[20px] bg-background">
          <div className="text-center">
            <div className="text-gray-500">Loading projects...</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center justify-center bg-about">
        <div
          data-scroll
          data-scroll-speed="-.2"
          className="bg-[#BFDA62] w-[75%] py-[20px] rounded-t-[10px]"
        />
        <div
          className="bg-[#B8D25E] relative z-20 w-[90%] py-[20px] rounded-t-[10px]"
          data-scroll
          data-scroll-speed="-.1"
        />
      </div>
      <section className="w-full relative z-30 padding-y rounded-t-[20px] bg-background">
        <div className="mb-50px">
          <h2 className="sub-heading font-normal padding-x font-NeueMontreal text-secondry mb-20">
            Ini adalah list dari
            <br className="sm:hidden xm:hidden" />
            beberapa proyekku :
          </h2>
        </div>

        {/* Button kategori dan Card */}
        <div className="flex flex-col gap-5">
          {/* Button kategori */}
          <div className="flex flex-wrap justify-start gap-3 ml-10">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-2 py-1.5 rounded-full text-black font-medium border border-black transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Daftar proyek */}
          <div className="w-full flex justify-between gap-y-[30px] gap-x-[20px] padding-x flex-wrap">
            {filteredProjects.map((item, index: number) => (
              <motion.div
                className="w-[49%] sm:w-full xm:w-full"
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
              >
                <div className="flex gap-x-[10px] items-center pb-[10px]">
                  <span className="w-[10px] h-[10px] rounded-full bg-secondry" />
                  <h1 className="small-text uppercase font-medium font-NeueMontreal text-secondry">
                    {item.title}
                  </h1>
                </div>
                <ProjectCard item={item} key={item.id} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
