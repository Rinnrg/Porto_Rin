import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { isc1, proyek3 } from "@/public";
import { BackgroundImg, Rounded } from "@/components";

export default function Hero() {
	return (
		<section className="w-full rounded-b-[20px] pt-[50px]">
			<div className="w-full pb-[200px]">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
					<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								Informatics Sport<br />
								<div className="flex items-center gap-[5px]">
									<motion.span
										initial={{ width: 0 }}
										animate={{ width: "auto" }}
										transition={{
											ease: [0.86, 0, 0.07, 0.995],
											duration: 1,
											delay: 1.5,
										}}>
										<Image
										src={proyek3}
										alt="img"
										className="h-[64px] w-auto sm:h-[45px] md:h-[63px] lg:h-[95px] xl:mt-[15px] mt-[10px] object-cover rounded-[10px]"
										/>

									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
									Championship
									</h1>
									{/* <h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
										Championship
									</h1> */}
								</div>
							</h1>
						</div>
					</div>
					<div className="w-full border-t border-[#21212155] pt-[20px] ">
						<div className="w-full flex justify-between sm:gap-[25px] xm:gap-[25px] padding-x sm:flex-col xm:flex-col">
							<div className="w-[50%] sm:w-full xm:w-full">
								<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
									Tentang ISC:
								</h3>
							</div>
							<div className="w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col flex gap-[20px]">
								<div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-y-[40px]">
									<p className="paragraph font-NeueMontreal text-secondry">
									Informatics Sport Championship (ISC) adalah sebuah event olahraga tahunan yang diselenggarakan khusus untuk mahasiswa jurusan Teknik Informatika. Event ini bertujuan untuk mempererat hubungan antar mahasiswa sekaligus meningkatkan semangat sportivitas melalui berbagai kompetisi olahraga. Cabang olahraga yang dipertandingkan dalam ISC meliputi futsal, basket, badminton, dan Mobile Legends, sehingga mencakup olahraga fisik maupun e-sport. ISC menjadi ajang untuk menampilkan bakat, menjalin kebersamaan, dan memupuk jiwa kompetitif di kalangan mahasiswa Teknik Informatika.
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
				<BackgroundImg src={isc1} />
			</div>
		</section>
	);
}
