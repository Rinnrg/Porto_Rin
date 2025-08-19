"use client";
import Link from "next/link";
import { TnavProps } from "@/types";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { perspective, slideIn, masuk } from "@/motion";
import { footerLinks, links } from "@/constants";

export default function Nav({ toggleMenu }: TnavProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between pr-[65px] pl-[40px] pt-[80px] pb-[40px] h-full overflow-hidden">
      <div className="flex gap-[15px] flex-col">
        {links.map((link, i) => {
          const { title, href } = link;
          const isActive = pathname === link.href; // Mengecek apakah link aktif

          return (
            <div
              key={`b_${i}`}
              className="perspective-120 perspective-origin-bottom flex items-center gap-3"
            >
              {/* Lingkaran dengan animasi */}
              <motion.div
                className={`w-[10px] h-[10px] bg-black rounded-full ${
                  isActive ? "block" : "hidden"
                }`}
                variants={masuk}
                initial="initial"
                animate={isActive ? "enter" : "hidden"}
                custom={i}
                exit="exit"
              />
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Link
                  onClick={toggleMenu}
                  href={href}
                  className={`font-FoundersGrotesk text-black text-[70px] sm:text-[70px] xm:text-[56px] leading-none ${
                    isActive ? "font-Bold" : ""
                  }`}
                >
                  {title}
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Footer Links */}
      <motion.div className="flex flex-wrap mt-[40px]">
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.div
              className="w-[50%] text-[16px]"
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
            >
              <Link href={href}>{title}</Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
