import Link from "next/link";
import { workizItem } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import { Marquee, ProjectCard, Rounded, Tags } from "@/components";

export default function Works() {
	return (
		<section className="w-full bg-marquee rounded-t-[20px]">
			<div className="w-full bg-marquee z-10 relative rounded-t-[20px] pt-[100px] lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xm:pt-[40px]">
				<Marquee
					title="Informatics Sport championship"
					className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px] "
				/>
			</div>
			<div className="w-full flex justify-between gap-y-[30px] padding-x py-[20px] flex-wrap">
			</div>
			<div className="w-full flex padding-y justify-center">
			</div>
		</section>
	);
}
