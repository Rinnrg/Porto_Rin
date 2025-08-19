"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fotorino } from "@/public";
import { ArrowUpRight } from "lucide-react";
import { Rounded } from "@/components";
import { LinkHover } from "@/animation";
import { footerItems } from "@/constants";
import { Heading, RoundButton } from "@/components";
import { useTransition } from "@/context/TransitionContext";
import { useRouter } from "next/router";

export default function About() {
	const [hovered, setHovered] = useState(false);
	const { isTransitioning, setIsTransitioning } = useTransition();
	const router = useRouter();

	// Long press logic
	let longPressTimer: NodeJS.Timeout;
	const handleLongPressStart = () => {
		longPressTimer = setTimeout(() => {
			setIsTransitioning(true);
			setTimeout(() => {
				router.push('/admin/login');
			}, 1200); // durasi animasi yang lebih lama untuk efek epik
		}, 800); // durasi long press
	};
	const handleLongPressEnd = () => {
		clearTimeout(longPressTimer);
	};

		return (
		<section
			className={`w-full bg-about padding-y rounded-t-[20px] z-20 relative mt-[-15px] transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
				isTransitioning 
					? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
					: 'scale-100 opacity-100 rounded-t-[20px] blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
			}`}
			style={{ 
				pointerEvents: isTransitioning ? 'none' : 'auto',
				transformOrigin: 'center center',
				background: isTransitioning 
					? 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)' 
					: undefined
			}}
		>
			<div className="pl-[50px] sm:px-[20px] xm:px-[20px]">
				<h2 className="sub-heading font-medium font-NeueMontreal text-secondry">
					Kamu bisa temukan berbagai&nbsp; 
					<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer">
					proyek kreatif
					</span>
					<br className="sm:hidden xm:hidden" /> yang telah saya kerjakan, mulai dari&nbsp; 
					<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer">
					 ilustrasi digital,&nbsp;
					</span>
					hingga <br className="sm:hidden xm:hidden" />
					<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer">
					desain UI/UX,&nbsp;
					</span>
					hanya di&nbsp;
					<span className="sub-heading font-medium font-NeueMontreal cursor-pointer">
					 website ini.
					</span>
				</h2>
			</div>
			<div className="w-full border-y border-[#21212155] my-[50px] py-[20px]">
				<div className="padding-x pb-[50px] w-full flex sm:flex-col xm:flex-col gap-[30px] justify-between">
					<div className="w-[50%] sm:w-full xm:w-full">
						<h3 className="sub-paragraph font-medium text-secondry font-NeueMontreal">
							Apa yang bisa kamu temukan?
						</h3>
					</div>
					<div className="w-[50%] sm:w-full xm:w-full">
						<div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
							<div className="w-[40%] sm:w-[60%] xm:w-[60%]">
								<p className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide">
								Website ini adalah tempat di mana kamu bisa mengenal diriku lebih dalam. 
								Kamu dapat membaca deskripsi singkat tentangku, serta melihat 
								berbagai proyek kreatif yang telah aku kerjakan mulai dari ilustrasi digital, maupun desain UI/UX.
								</p>
								<p className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide">
									Selain itu, website ini juga memudahkanmu untuk terhubung denganku, 
									melalui sosial media maupun kontak pribadi.
								</p>
							</div>
							<div className="w-[60%] flex justify-end flex-col  sm:w-full xm:w-full">
								<div className="flex flex-col">
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
				<div className="flex flex-col gap-[30px]">
					<Heading title="Tentang Saya:" />
					<p className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide">
						Jika kalian penasaran tentangku<br></br>
						silahkan pencet tombol dibawah ini
					</p>
					<div
						className={`w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group transition-all duration-[800ms] ${
							isTransitioning 
								? 'opacity-0 scale-[0.1] rotate-[360deg] blur-[10px]' 
								: 'opacity-100 scale-100 rotate-0 blur-0'
						}`}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => { setHovered(false); handleLongPressEnd(); }}
						onMouseDown={handleLongPressStart}
						onMouseUp={handleLongPressEnd}
						onTouchStart={handleLongPressStart}
						onTouchEnd={handleLongPressEnd}
					>
						<RoundButton
							href="/tentangku"
							title="Lihat tentang saya"
							bgcolor="#000"
							className="bg-white text-black"
							style={{ color: "#fff" }}
						/>
					</div>
					</div>
				
				<div
					className={`w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${
						hovered && "scale-[0.96]"
					}`}>
					<Image
						src={fotorino}
						alt="foto rino"
						className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${
							hovered && "scale-[1.09]"
						}`}
					/>
				</div>
			</div>
		</section>
	);
}
