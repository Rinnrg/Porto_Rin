import { TbuttonProps } from "@/types";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { HiX } from "react-icons/hi"; // Import ikon X

export default function Button({ isActive, toggleMenu }: TbuttonProps) {
  return (
    <div className="w-full flex justify-between items-center h-[8vh] px-4 sm:px-6">
      {/* Tombol Menu yang akan berubah menjadi X saat aktif */}
      <div
        className="ml-auto flex items-center justify-center"
        onClick={toggleMenu}
      >
        <motion.div
          initial={{ opacity: 0, rotate: 0 }} // Menyembunyikan tombol pertama (Menu)
          animate={{
            opacity: 1,
            rotate: isActive ? 180 : 0, // Rotasi simbol 180 derajat ketika berubah
          }}
          exit={{ opacity: 0 }} // Hilangkan opacity saat keluar
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {isActive ? (
            <HiX className="text-3xl cursor-pointer text-black" /> // Simbol X saat aktif
          ) : (
            <HiOutlineMenuAlt4 className="text-3xl cursor-pointer text-black" /> // Menu saat tidak aktif
          )}
        </motion.div>
      </div>
    </div>
  );
}
