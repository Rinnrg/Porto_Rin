import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { workiz, peka1, proyek16 } from "@/public";
import { BackgroundImg, Rounded } from "@/components";

export default function Hero() {
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
										}}
										className="leading-[130px]">
										<Image
											width={120}
											height={50}
											src={proyek16}
											alt="img"
											className="w-auto h-[95px] lg:w-auto lg:h-auto md:w-[100px] md:h-[63px] sm:w-[74px] sm:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xl:mt-[15px] mt-[10px] rounded-[10px]"
										/>
									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
										LOGO PEKA
									</h1>
								</div>
							</h1>
						</div>
					</div>
					<div className="w-full border-t border-[#21212155] pt-[20px] ">
						<div className="w-full flex justify-between sm:gap-[25px] xm:gap-[25px] padding-x sm:flex-col xm:flex-col">
							<div className="w-[50%] sm:w-full xm:w-full">
								<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
									Tentang PEKA
								</h3>
							</div>
							<div className="w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col flex gap-[20px]">
								<div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-y-[40px]">
									<p className="paragraph font-NeueMontreal text-secondry">
									
									PEKA (Peduli Kandungan Gula) adalah sebuah inisiatif yang bertujuan untuk meningkatkan kesadaran masyarakat tentang kandungan gula dalam minuman kemasan. Proyek ini hadir untuk menjawab permasalahan tingginya konsumsi gula yang sering kali tidak disadari oleh konsumen akibat kurangnya informasi yang mudah diakses dan dipahami. <br/><br/>
									Hal ini berkontribusi pada meningkatnya risiko masalah kesehatan, seperti diabetes, obesitas, dan penyakit kronis lainnya. Melalui pendekatan yang edukatif dan informatif, PEKA dirancang untuk membantu masyarakat membuat pilihan konsumsi yang lebih bijak dan sehat, sekaligus mendorong perubahan positif dalam gaya hidup sehari-hari.
									</p>
								</div>
								<div className="flex flex-col gap-[10px]">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
				<BackgroundImg src={peka1} />
			</div>
		</section>
	);
}
