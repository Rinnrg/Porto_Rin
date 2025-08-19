"use client";
import {
	Heroisc,
	Aboutisc,
	Chelengeisc,
	Resultisc,
	Worksisc,
	Creditisc,
	Videoisc,
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
				<Heroisc/>
				<Aboutisc />
				<Chelengeisc />
				{/* <Videoisc />
				<Resultisc />
				<Creditisc /> */}
				<Worksisc />
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
