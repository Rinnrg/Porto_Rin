import Link from "next/link";
import { TButtonProps } from "@/types";
import { ArrowUpRight } from "lucide-react";

export default function Button({ href, title }: TButtonProps) {
	return (
		<div className="flex flex-col pb-[10px] w-fit">
			<div className="flex items-center gap-[5px] group">
				<div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry  py-[3px] px-[12px]">
                <span className="small-text font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-300 ease-in-out">
                {title}
                </span> 
				</div>
			</div>
		</div>
	);
}
