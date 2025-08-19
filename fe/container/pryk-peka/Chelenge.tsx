import Image from "next/image";
import {
	peka3,
	peka4,
	peka5,
	peka6,
	peka7,
	peka8,
	peka9,
	peka10,
} from "@/public";
import { BackgroundImg } from "@/components";

export default function Chelenge() {
	return (
		<section className="w-full pb-[100px] lg:pb-[80px] md:pb-[60px] sm:pb-[40px] xm:pb-[40px]">
			<div className="w-full flex flex-col">
				<h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry border-b pb-[50px] border-[#21212155]">
					Pembuatan Logo
				</h2>
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[15px] padding-x">
						<div className="w-1/2 sm:w-full xm:w-full">
							<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
								Proses:
							</h3>
						</div>
						<div className="w-1/2 sm:w-full xm:w-full">
							<div className="flex flex-col gap-y-[20px]">
								<p className="paragraph font-NeueMontreal text-secondry">
									Proses pembuatan logo dimulai dengan sesi briefing tim untuk menentukan kata kunci (keyword) utama yang akan menjadi dasar konsep logo. Kata kunci seperti gula, kesehatan, dan konsumsi dipilih karena merepresentasikan inti dari proyek PEKA. Setelah kata kunci ditentukan, langkah berikutnya adalah mengubahnya menjadi sketsa visual. Dalam tahap ini, tim menuangkan ide-ide kreatif ke dalam berbagai bentuk logo yang menggambarkan esensi dari keyword yang telah ditentukan.<br/> <br/>

Setelah sketsa bentuk logo selesai, proses dilanjutkan dengan menentukan tipografi yang sesuai untuk memperkuat karakter logo. Tipografi dipilih untuk mencerminkan kesan yang relevan, seperti modern, profesional, dan edukatif. Langkah terakhir adalah menentukan palet warna yang akan digunakan, dengan mempertimbangkan makna psikologis warna dan relevansinya terhadap tema kesehatan. Warna-warna segar dan menenangkan, seperti hijau atau biru, sering dipilih untuk menonjolkan kesadaran dan keseimbangan. Proses ini menghasilkan logo yang tidak hanya estetis tetapi juga memiliki pesan yang kuat.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={peka3} />
			</div>
			<div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={peka4}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={peka5}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={peka6} />
			</div>
			<div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={peka7}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={peka8}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={peka9} />
			</div>
			<div className="w-[80%] sm:w-full xm:w-full mx-auto padding-x flex gap-[20px]">
				<div className="w-full">
					<Image
						src={peka10}
						className="w-full object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
		</section>
	);
}
