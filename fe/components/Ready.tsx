"use client";
import Link from "next/link";
import { useRef } from "react";
import { TextMask } from "@/animation";
import { ArrowUpRight } from "lucide-react";
import { Eyes, RoundButton, Rounded } from "@/components";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function Ready() {
	const container = useRef(null);
	const phrase = ["desain", "merubah", "isi hatimu"];
	const { isTransitioning } = useTransition();

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);

	return (
		<section
			className={`w-full relative z-30 min-h-screen sm:h-screen xm:h-screen bg-about padding-y rounded-t-[20px] mt-[-20px] transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
				isTransitioning 
					? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
					: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
			}`}
			ref={container}>
			<div className="w-full h-full flex justify-center gap-[50px] items-center flex-col">
				<div className="flex flex-col gap-[10px]">
					<h1 className="text-[290px] leading-[230px] lg:text-[220px] lg:leading-[170px] md:text-[180px] md:leading-[140px] sm:text-[120px] sm:leading-[90px] xm:text-[80px] xm:leading-[60px] tracking-[-2.5px] text-center font-bold font-FoundersGrotesk text-secondry uppercase pointer-events-none">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>
				<div className="flex flex-col  items-center gap-[10px]">
					<div className="flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
						<RoundButton
							href="/proyek"
							title="Lihat karya ku"
							className="bg-white text-black"
							bgcolor="#000"
							style={{ color: "#fff" }}
						/>
					</div>
					<p className="text-[20px] font-NeueMontreal text-secondry">Atau</p>
					<div className="flex items-center justify-between bg-transparent cursor-pointer rounded-full group border border-[#212121]">
						<Link href="/uploads/1755069758590-E-KTM_Rino_Raihan_Gumilang.pdf" target="_blank" rel="noopener noreferrer">
							<Rounded className="w-[180px] h-[60px] bg-zinc-100 text-black relative flex items-center group rounded-full justify-between">
								<p className="z-10 px-[10px] ml-[15px] py-[6px] group-hover:text-white text-black">
									Lihat CV ku
								</p>
								<div className="bg-black group-hover:bg-white text-black p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 transform duration-[0.3s] ease-[.215,.61,.355,1]">
									<ArrowUpRight
										strokeWidth={1.5}
										size={30}
										className="scale-[0] group-hover:scale-[1]"
									/>
								</div>
							</Rounded>
						</Link>
					</div>
				</div>
			</div>
			<motion.div
				className="w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center"
				style={{ y: mq }}>
				<Eyes className="w-[200px] h-[200px] md:w-[170px] md:h-[170px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
			</motion.div>
		</section>
	);
}