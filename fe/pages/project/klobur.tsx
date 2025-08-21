"use client";
import {
	Heroklobur,
	Aboutklobur,
	Chelengeklobur,
	Resultklobur,
	Worksklobur,
	Creditklobur,
	Videoklobur,
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
				<Heroklobur/>
				<Aboutklobur />
				<Chelengeklobur />
				{/* <Videoklobur /> */}
				{/* <Resultklobur /> */}
				{/* <Creditklobur /> */}
				<Worksklobur />
				<Ready />
			</Curve>
		</>
	);
}
