import { ame232} from "@/public";
import { BackgroundImg } from "@/components";

export default function About() {
	return (
		<section className="w-full padding-y">
			<div className="w-full flex flex-col">
				<h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
					Philosophy
				</h2>
				<div className="w-full border-t border-[#21212155] pt-[20px]">
					<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
						<div className="w-1/2 sm:w-full xm:w-full">
							<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
							Why choose bird of paradise?
							</h3>
						</div>
						<div className="w-1/2 sm:w-full xm:w-full flex justify-between gap-[10px] sm:flex-col xm:flex-col">
							<div>
								<p className="paragraph font-NeueMontreal text-secondry">
								This logo features the shape of a Bird of Paradise, chosen for its symbolism of 
beauty, grace, and uniqueness. Known as the bird of heaven, the Bird of 
Paradise represents hope, high aspirations, and achievement. The design 
reflects a spirit of continuous growth, surpassing limits, and creating works 
that are both meaningful and visually stunning. Additionally, the Bird of 
Paradise conveys a message of conservation and respect for nature, aligning 
with the creative and visionary values embodied by this logo. 
<br/> <br/>
Furthermore, I adopted the theme of freedom, which sets this period apart from 
previous Améliorer programs. This theme emphasizes breaking boundaries 
and embracing limitless opportunities, embodying a fresh and innovative 
approach for this iteration.
								</p>
							</div>
							{/* <div className="flex flex-col gap-y-[10px]">
								<div>
									<p className="paragraph font-NeueMontreal text-secondry underline">
										Industry:
									</p>
									<p className="paragraph font-NeueMontreal text-secondry">
										Service Management Software
									</p>
								</div>
								<div>
									<p className="paragraph font-NeueMontreal text-secondry underline">
										Company Size:
									</p>
									<p className="paragraph font-NeueMontreal text-secondry">
										100+ People
									</p>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
			<div className="w-full padding-x pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
				<BackgroundImg src={ame232} />
			</div>
		</section>
	);
}
