import Image from "next/image";
import { kualitas, keperluan } from "@/public";

export default function Principles() {
	return (
		<section className="w-full padding-y rounded-t-[20px] bg-background">
			<div>
				<h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mb-[50px]">
					Dua prinsip yang saya pegang:
					
				</h1>
			</div>
			<div className="w-full border-t border-[#21212155]">
				<div className="w-full padding-x mt-[50px] flex justify-between gap-[30px] items-center sm:flex-col xm:flex-col">
					<div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-[20px]">
						<Image
							src= {keperluan}
							alt="img"
							className="w-full rounded-[15px]"
						/>
						<div className="flex flex-col gap-[20px]">
							<p className="paragraph font-NeueMontreal text-secondry">
							Saya selalu mengutamakan kebutuhan dan pengalaman pengguna. 
							<br/>Setiap keputusan desain yang saya ambil bertujuan untuk  
							<br/>menciptakan solusi yang&apos;memudahkan 
							<br/>interaksi pengguna dengan produk. 
							</p>
						</div>
					</div>
					<div className="w-[50%] sm:w-full xm:w-full flex flex-col gap-[20px]">
						<Image
							src= {kualitas}
							alt="img"
							className="w-full rounded-[15px]"
						/>
						<div className="flex flex-col gap-[20px]">
							<p className="paragraph font-NeueMontreal text-secondry">
							Desain yang baik tidak hanya menarik secara visual, tetapi juga mampu 
							<br/>menyampaikan pesan dengan jelas. Prinsip ini menggabungkan keseimbangan antara 
							<br/>elemen estetika dan fungsionalitas. Sebagai desainer, saya selalu berusaha menciptakan 
							<br/>karya yang tidak hanya indah dipandang, tetapi juga efektif dalam memenuhi tujuan dan kebutuhan proyek.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
