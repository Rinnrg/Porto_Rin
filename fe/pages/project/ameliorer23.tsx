"use client";
import {
	Heroame23,
	Aboutame23,
	Chelengeame23,
	Resultame23,
	Worksame23,
	Creditame23,
	Videoame23,
} from "@/container";
import { useEffect } from "react";
import { Curve, Ready } from "@/components";
import { TransitionProvider } from "@/context/TransitionContext";

function WorkContent() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
        
		<>
			<Curve backgroundColor="#f1f1f1">
				<Heroame23 />
				<Aboutame23 />
				<Chelengeame23 />
				<Videoame23 />
				{/* <Resultame23 /> */}
				{/* <Creditame23 /> */}
				<Worksame23 />
				<Ready />
			</Curve>
		</>
	);
}

export default function Work() {
	return (
		<TransitionProvider>
			<WorkContent />
		</TransitionProvider>
	);
}
