"use client";
import {
	Heropeka,
	Aboutpeka,
	Chelengepeka,
	Resultpeka,
	Workspeka,
	Creditpeka,
	Videopeka,
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
				<Heropeka/>
				<Aboutpeka />
				<Chelengepeka />
				{/* <Videopeka /> */}
				{/* <Resultpeka /> */}
				{/* <Creditpeka /> */}
				<Workspeka />
				<Ready />
			</Curve>
		</>
	);
}
