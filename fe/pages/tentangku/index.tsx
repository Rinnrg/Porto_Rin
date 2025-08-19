"use client";
import { useEffect, useState } from "react";
import { Curve, Ready } from "@/components";
import { TransitionProvider } from "@/context/TransitionContext";
import { Heroabout } from "@/container";
import DynamicAboutSections from "./components/DynamicAboutSections";

function AboutContent() {
	return (
		<div>
			<Curve backgroundColor={"#f1f1f1"}>
				<Heroabout />
				<DynamicAboutSections />
				<Ready />
			</Curve>
		</div>
	);
}

export default function About() {
	return (
		<TransitionProvider>
			<AboutContent />
		</TransitionProvider>
	);
}
