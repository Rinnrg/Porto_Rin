import Image from "next/image";
import {
	after,
	ame233,
	ame234,
	ame235,
	ame237,
	ame238,
	ame231,
	ame239,
	showcase1,
	showcase2,
	showcase3,
	showcase4,
	showcase5,
	showcase6,
} from "@/public";
import { BackgroundImg } from "@/components";

export default function Chelenge() {
	return (
		<section className="w-full pb-[100px] lg:pb-[80px] md:pb-[60px] sm:pb-[40px] xm:pb-[40px]">
			<div className="w-full flex flex-col">
				<h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry border-b pb-[50px] border-[#21212155]">
					Challenge
				</h2>
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[15px] padding-x">
						<div className="w-1/2 sm:w-full xm:w-full">
							<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
							The challenge of designing the Améliorer 2023
							</h3>
						</div>
						<div className="w-1/2 sm:w-full xm:w-full">
							<div className="flex flex-col gap-y-[20px]">
								<p className="paragraph font-NeueMontreal text-secondry">
								logo was multifaceted, requiring a creative balance between complexity and clarity. One of the key obstacles was the integration of the number 8 into the logo’s structure, which needed to feel seamless while maintaining the integrity of the overall design. The number 8 was not just a numeral; it symbolized the continuous nature of improvement and growth, which are central themes of the Améliorer concept. <br/><br/>

The complexity arose from the need to combine this meaningful number with the overall visual language of the logo, ensuring that it didn’t overpower the design but rather complemented it. The design needed to be dynamic, yet simple enough to be memorable, while also conveying a sense of modernity and sophistication appropriate for the year 2023. Finding the right balance between these elements pushed the design process to explore various forms, shapes, and alignments until the final concept was achieved.<br/><br/>

Ultimately, the logo represents not just the event, but a journey of growth and progression, with the number 8 seamlessly integrated into the composition as a symbol of infinity and continuity.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={ame233} />
			</div>
			<div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={ame234}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={ame235}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={ame231} />
			</div>
			<div className="w-[80%] mx-auto padding-x flex gap-[40px] sm:w-full xm:w-full sm:flex-col xm:flex-col">
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={ame237}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
				<div className="w-[49%] sm:w-full xm:w-full">
					<Image
						src={ame238}
						className="w-full  object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div>
			</div>
			<div className="w-full padding-x padding-y">
				<BackgroundImg src={ame239} />
			</div>
			<div className="w-[80%] sm:w-full xm:w-full mx-auto padding-x flex gap-[20px]">
				{/* <div className="w-full">
					<Image
						src={after}
						className="w-full object-cover rounded-[20px]"
						alt="chelengeBgImg"
					/>
				</div> */}
			</div>
		</section>
	);
}
