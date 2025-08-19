import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ame230 } from "@/public";
import { BackgroundImg, Rounded } from "@/components";

export default function Hero() {
	return (
		<section className="w-full rounded-b-[20px] pt-[30px]">
			<div className="w-full pb-[200px]">
				<div className="w-full flex flex-col">
				<div className="w-full margin padding-x">
					<div>
					<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase mt-[40px]">
						<div className="flex items-center gap-[5px]">
						<motion.span
							initial={{ width: 0 }}
							animate={{ width: "auto" }}
							transition={{
							ease: [0.86, 0, 0.07, 0.995],
							duration: 1,
							delay: 1.5,
							}}
							className="leading-[130px]"
						>
							<Image
							width={120}
							height={50}
							src= "/proyek 1.jpg"
							alt="ameliorer 23"
							className="w-auto h-[95px] lg:w-auto lg:h-auto md:w-[100px] md:h-[63px] sm:w-[74px] sm:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xl:mt-[15px] mt-[10px] rounded-[10px]"
							/>
						</motion.span>
						<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
						Ameliorer 23
						</h1>
						</div>
					</h1>
					</div>
				</div>
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex justify-between sm:gap-[25px] xm:gap-[25px] padding-x sm:flex-col xm:flex-col">
					<div className="w-[50%] sm:w-full xm:w-full">
						<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
							About Ameliorer 23:
						</h3>
					</div>
					<div className="w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col flex gap-[20px]">
						<div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-y-[40px]">
						<p className="paragraph font-NeueMontreal text-secondry">
						Améliorer, derived from the French word for upgrade, is a training and development program organized within a department. 
This program aims to deepen participants knowledge and insights while expanding their networks among peers from different 
study programs within the same cohort. <br/> <br/>Participating in Améliorer offers various benefits, such as broadening academic and 
non-academic knowledge, fostering a sense of camaraderie among participants, and honing essential soft skills, including 
communication, leadership, and teamwork. This program serves as a platform for personal and professional growth, preparing 
participants to face future challenges with confidence.
						</p>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
			<div className="w-full pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
				<BackgroundImg 
				src= {ame230}
				/>
			</div>
			</section>

	);
}
