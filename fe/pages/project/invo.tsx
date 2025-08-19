"use client";
import {
	Heroinvo,
	Aboutinvo,
	Chelengeinvo,
	Resultinvo,
	Worksinvo,
	Creditinvo,
	Videoinvo,
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
				<Heroinvo/>
				<Aboutinvo />
				<Chelengeinvo />
				{/* <Videoinvo /> */}
				{/* <Resultinvo /> */}
				{/* <Creditinvo /> */}
				<Worksinvo />
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
