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
import { TransitionProvider } from "@/context/TransitionContext";

function WorkContent() {
	return (
		<div>
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
		</div>
	);
}

export default function Work() {
	return (
		<TransitionProvider>
			<WorkContent />
		</TransitionProvider>
	);
}
