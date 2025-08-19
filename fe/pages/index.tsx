"use client";
import { useState, useEffect } from "react";
import { Curve, Marquee, Ready } from "@/components";
import { About, Skillku, Hero, Projects, VideoHome } from "@/container";
import { TransitionProvider, useTransition } from "@/context/TransitionContext";

function HomeContent() {
	const { isTransitioning } = useTransition();

	return (
		<div>
			<Curve backgroundColor={"#f1f1f1"}>
				<Hero />
				<div className={`w-full bg-marquee z-10 relative rounded-t-[20px] padding-y transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
					isTransitioning 
						? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
						: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
				}`}>
					<Marquee
						title="Grafis Desain UI UX Desain"
						className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[30px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
					/>
				</div>
				<About />
				<Skillku />
				{/* <VideoHome /> */}
				<div className="mb-[70px]">
					<Projects />
				</div>
				<Ready />
			</Curve>
		</div>
	);
}

export default function Home() {
	return (
		<TransitionProvider>
			<HomeContent />
		</TransitionProvider>
	);
}
