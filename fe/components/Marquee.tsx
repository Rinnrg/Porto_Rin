import { TMarqueeProps } from "@/types";
import { TextMarquee } from "@/animation";
import { useTransition } from "@/context/TransitionContext";

export default function Marquee({ title, className }: TMarqueeProps) {
	const { isTransitioning } = useTransition();
	
	return (
		<div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
			isTransitioning 
				? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
				: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
		}`}>
			<TextMarquee baseVelocity="0.7">
				<h1
					className={`font-FoundersGrotesk bg-marquee font-normal border-y border-[#ffffff55] uppercase text-white  whitespace-nowrap tracking-[-5px] ${className}`}>
					{title} &nbsp;
				</h1>
				<h1
					className={`font-FoundersGrotesk bg-marquee font-normal border-y border-[#ffffff55] uppercase text-white  whitespace-nowrap tracking-[-5px] ${className}`}>
					{title} &nbsp;
				</h1>
			</TextMarquee>
		</div>
	);
}
