"use client";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Nav from "./Nav/Nav";
import { menu } from "@/motion";
import { useState, useEffect } from "react";
import Button from "./Button/Button";
import { AnimatePresence, motion } from "framer-motion";

export default function SideHome() {
	const [isActive, setIsActive] = useState(false); // Untuk side menu
	const [isVisible, setIsVisible] = useState(false); // Kontrol visibilitas navbar
	const [lastScrollY, setLastScrollY] = useState(0); // Posisi scroll terakhir

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Navbar muncul saat scroll ke atas
			if (currentScrollY < lastScrollY) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}

			setLastScrollY(currentScrollY); // Update posisi scroll terakhir
		};

		window.addEventListener("scroll", handleScroll);

		// Cleanup saat komponen unmount
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<>
			{/* Logo dan Menu Icon */}
			<motion.div
				className={`w-full hidden justify-between items-center h-[8vh] px-8 sm:flex xm:flex md:flex fixed top-0 left-0 bg-white z-50 transition-transform duration-300 ${
					isVisible ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<Link href={"/"}>
					<Image
						src="/Logoblck.png"
						alt="logo ku"
						width={25}
						height={25}
						style={{ marginTop: "6px", marginLeft: "0px" }}
					/>
				</Link>

				<div className="right-[10px] top-[4px] mobile-only z-[50] fixed items-center">
					{/* Tombol untuk membuka menu */}
					<motion.div
						className="bg-white rounded-[15px]"
						variants={menu}
						animate={isActive ? "open" : "closed"}
						initial="closed"
					>
						<Button
							isActive={isActive}
							toggleMenu={() => {
								setIsActive(!isActive);
							}}
						/>
						{/* Side Menu */}
						<AnimatePresence>
							{isActive && (
								<motion.div
									initial={{ opacity: 0, y: -50 }} // Animasi masuk
									animate={{ opacity: 1, y: 0 }} // Animasi ke posisi normal
									exit={{ opacity: 0, y: -50 }} // Animasi keluar
									transition={{
										duration: 0.3,
										ease: "easeInOut",
									}}
								>
									<Nav
										toggleMenu={() => {
											setIsActive(!isActive);
										}}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</div>
			</motion.div>
		</>
	);
}
