"use client";
import {
	Capibilyties,
	Clientsservices,
	Expectations,
	Process,
	Archive,
	Heroservices,
} from "@/container";
import { useEffect } from "react";
import { Curve, Ready } from "@/components";
import { TransitionProvider } from "@/context/TransitionContext";

function ServicesContent() {
	return (
		<div>
			<Curve backgroundColor={"#f1f1f1"}>
				<Heroservices />
				<Process />
				<Capibilyties />
				<Clientsservices />
				<Archive />
				<Expectations />
				<Ready />
			</Curve>
		</div>
	);
}

export default function Services() {
	return (
		<TransitionProvider>
			<ServicesContent />
		</TransitionProvider>
	);
}
