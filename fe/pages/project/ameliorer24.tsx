"use client";
import {
	Heroame24,
	Aboutame24,
	Chelengeame24,
	Resultame24,
	Worksame24,
	Creditame24,
	Videoame24,
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
				<Heroame24 />
				<Aboutame24 />
				<Chelengeame24 />
				<Videoame24 />
				<Resultame24 />
				<Creditame24 />
				<Worksame24 />
				<Ready />
			</Curve>
		</>
	);
}
