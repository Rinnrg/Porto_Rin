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
import { TransitionProvider } from "@/context/TransitionContext";

function WorkContent() {
	return (
		<div>
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
