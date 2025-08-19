import { welcome, peka2 } from "@/public";
import { BackgroundImg } from "@/components";

export default function About() {
	return (
		<section className="w-full padding-y">
			<div className="w-full flex flex-col">
				<h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
					Mengenal Logo
				</h2>
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
						<div className="w-1/2 sm:w-full xm:w-full">
							<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
								Deskripsi:
							</h3>
						</div>
						<div className="w-1/2 sm:w-full xm:w-full flex justify-between gap-[10px] sm:flex-col xm:flex-col">
							<div>
								<p className="paragraph font-NeueMontreal text-secondry">
									
								Logo PEKA dirancang untuk mewakili visi dan misi proyek dalam meningkatkan kesadaran masyarakat terhadap kandungan gula pada minuman kemasan.
								<br/><br/>
								Logo ini merepresentasikan komitmen terhadap kesehatan dan keberlanjutan, menjadi simbol edukasi yang mendorong konsumen untuk lebih peduli terhadap pola konsumsi gula mereka. Dengan membawa nama Peduli Kandungan Gula, logo ini mencerminkan tujuan utama proyek, yaitu menyediakan solusi yang membantu konsumen membuat pilihan yang lebih sehat dan terinformasi.
								</p>
							</div>
							<div className="flex flex-col gap-y-[10px]">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full padding-x pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
				<BackgroundImg src={peka2} />
			</div>
		</section>
	);
}
