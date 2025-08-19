
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Buttonno } from "@/components";

interface ProjectItem {
  id: string | number;
  title: string;
  slug: string;
  thumbnail?: string;
  image?: string;
  category?: string;
  technologies?: string[];
  [key: string]: any;
}

export default function ProjectCard({ item }: { item: ProjectItem }) {
	const [hovered, setHovered] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isVideoThumbnail = item.thumbnail && (item.thumbnail.endsWith('.mp4') || item.thumbnail.endsWith('.webm') || item.thumbnail.endsWith('.mov'));

	const handleMouseEnter = () => {
		setHovered(true);
		if (isVideoThumbnail && videoRef.current) {
			videoRef.current.play();
		}
	};

	const handleMouseLeave = () => {
		setHovered(false);
		if (isVideoThumbnail && videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
	};

	return (
		<div className="relative">
			<div className="relative w-full group">
				<Link
					href={`/project/${item.slug}`}
					className="rounded-[10px] overflow-hidden hover:scale-[0.95] transition cursor-pointer transform duration-[1s] ease-[.4,0,.2,1] block"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					{isVideoThumbnail ? (
						<video
							ref={videoRef}
							src={item.thumbnail}
							width={500}
							height={300}
							className="w-full object-cover rounded-[10px] group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]"
							muted
							loop
							playsInline
						/>
					) : (
						<Image
							src={item.thumbnail || item.image || item.src || '/placeholder.jpg'}
							alt={`${item.title}Img`}
							width={500}
							height={300}
							className="w-full object-cover rounded-[10px] group-hover:scale-[1.09] transform duration-[1s] ease-[.4,0,.2,1]"
						/>
					)}
				</Link>
			</div>
			<div
				className="absolute w-full flex justify-center items-center top-0 left-0 h-full sm:hidden overflow-hidden z-20 group-hover:opacity-100 opacity-0 transition duration-500 ease-[.4,0,.2,1] xm:hidden pointer-events-none">
				{item.title.split("").map((char: string, i: number) => (
					<motion.span
						initial={{ y: "100%" }}
						animate={hovered ? { y: 0 } : { y: "100%" }}
						transition={{
							delay: i * 0.02,
							duration: 0.5,
							ease: [0.4, 0, 0.2, 1],
						}}
						className="text-[165px] leading-none inline-block uppercase font-FoundersGrotesk text-about font-bold text-center pointer-events-none"
						key={i}>
						{char}
					</motion.span>
				))}
			</div>
			
			{/* Description section below card */}
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={hovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
				transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
				className="overflow-hidden">
				<div className="pt-3 pb-2">
					<p className="text-base font-NeueMontreal text-secondry leading-relaxed">
						{item.description || "Deskripsi singkat untuk preview proyek"}
					</p>
				</div>
			</motion.div>

			{/* Subcategory buttons using Buttonno component */}
			{item.subcategory && (
				<div className="flex flex-wrap items-center gap-[10px] mt-[20px]">
					{item.subcategory.split(',').map((subcat: string, index: number) => (
						<Buttonno key={index} href={`/project/${item.slug}`} title={subcat.trim()} />
					))}
				</div>
			)}
		</div>
	);
}
