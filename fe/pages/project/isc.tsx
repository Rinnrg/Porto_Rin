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

export default function Work() {
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
