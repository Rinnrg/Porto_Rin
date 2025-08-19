"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTransition } from "@/context/TransitionContext";

export default function Hero() {
	const { isTransitioning } = useTransition();
	
	return (
		<section
			className={`w-full h-screen sm:mb-[-1px] xm:mb-[-10px] transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
				isTransitioning 
					? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
					: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
			}`}
			data-scroll
			data-scroll-speed="-.3">
			<div className="w-full h-full flex flex-col justify-between">
				<div />
				<div className="w-full flex flex-col justify-between h-[75vh] sm:h-[85vh] xm:h-[85vh]">
					<div className="w-full flex justify-between gap-[20px] pl-[50px] md:pl-[30px] sm:pl-[20px] xm:pl-[20px]">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								Selamat datang  <br />
								<div className="flex items-center gap-[5px]">
									<motion.span
										initial={{ width: 0 }}
										animate={{ width: "auto" }}
										transition={{
											ease: [0.86, 0, 0.07, 0.995],
											duration: 1,
											delay: 1.5,
										}}
										className="leading-[130px]">
										<Image
											width={120}
											height={50}
											src="/home.jpg" 
											alt="img"
											className="w-auto h-[95px] lg:w-auto lg:h-auto md:w-[100px] md:h-[63px] sm:w-[74px] sm:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xl:mt-[15px] mt-[10px] rounded-[10px]"
										/>
									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
										portofolio
									</h1>
								</div>
								Saya
							</h1>
						</div>
					</div>
					<div className="w-full flex flex-col h-[22vh] border-t border-[#21212125] py-[20px] sm:mb-[80px] xm:mb-[80px] gap-[30px] mt-[70px]">
						<div className="flex justify-between items-center padding-x gap-[20px] sm:flex-col sm:items-start xm:flex-col xm:items-start">
							<div className="w-[50%] xm:w-full sm:w-full">
								<p className="paragraph font-NeueMontreal text-secondry">
								Kreativitas Tanpa Batas
								</p>
							</div>
							<div className="w-[50%] xm:w-full sm:w-full flex justify-start xm:flex-col xm:items-start sm:flex-col sm:items-end gap-[50px]">
								<div>
									<p className="paragraph font-NeueMontreal text-secondry">
									Desain dengan Cerita
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
