import Image from "next/image";
import {
	isc3,
	isc4,
	isc5,
	isc6,
	isc7,
	isc8,
	isc9,
} from "@/public";
import { BackgroundImg } from "@/components";

export default function Chelenge() {
	return (
		<section className="w-full pb-[100px] lg:pb-[80px] md:pb-[60px] sm:pb-[40px] xm:pb-[40px]">
			<div className="w-full flex flex-col">
				<h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry border-b pb-[50px] border-[#21212155]">
					Perancangan Logo
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
								Proses perancangan logo ISC dimulai dengan melakukan riset berdasarkan kata kunci yang telah ditentukan, yaitu sportivitas, keberlanjutan, prestasi, dan kompetisi. Dari kata kunci tersebut, saya mencari beberapa referensi visual yang relevan untuk memahami elemen-elemen yang dapat merepresentasikan nilai-nilai tersebut. Setelah mendapatkan cukup inspirasi, saya mulai mengeksekusi desain awal dengan membuat logotype ISC yang fokus pada tipografi modern dan elemen sederhana yang mencerminkan tema utama. <br/> <br/>

								Setelah logotype awal selesai, saya mengirimkan desain tersebut kepada klien untuk mendapatkan masukan. Klien memberikan feedback bahwa desainnya masih kurang mencerminkan unsur sporty. Berdasarkan masukan tersebut, saya kembali mencari referensi yang lebih berfokus pada bentuk piala sebagai simbol kemenangan dan prestasi. Dari referensi tersebut, saya membuat beberapa sketsa baru dengan pendekatan yang lebih dinamis. Setelah revisi ini selesai, saya mengajukannya kembali kepada klien, dan desain tersebut disetujui. Dengan persetujuan tersebut, saya langsung mengeksekusi logo final untuk memastikan hasilnya sesuai dengan ekspektasi dan visi dari ISC.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={isc3} />
			</div>
			<div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={isc4}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={isc5}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={isc6} />
			</div>
			<div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={isc7}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={isc8}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={isc9} />
			</div>
			{/* <div className="w-[80%] sm:w-full xm:w-full mx-auto padding-x flex gap-[20px]">
				<div className="w-full">
					<Image
						src={after}
						className="w-full object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div> */}
		</section>
	);
}
