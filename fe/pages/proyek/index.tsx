"use client";
import { useEffect } from "react";
import { Curve, Ready } from "@/components";
import { TransitionProvider } from "@/context/TransitionContext";
import {
	Heropresentation,
	Projectspresentation,
	Publication,
} from "@/container";

function ProyekContent() {
	return (
		<div>
			<Curve backgroundColor={"#f1f1f1"}>
				<Heropresentation />
				<Projectspresentation />
				<Publication />
				<Ready />
			</Curve>
		</div>
	);
}

export default function Proyek() {
	return (
		<TransitionProvider>
			<ProyekContent />
		</TransitionProvider>
	);
}
