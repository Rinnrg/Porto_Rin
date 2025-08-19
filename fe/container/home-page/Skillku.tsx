"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { skillsaya } from "@/constants";
import { Buttonno, Ratings } from "@/components";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function Clients() {
	const [activeAccordion, setActiveAccordion] = useState(skillsaya[0].id);
	const { isTransitioning } = useTransition();
	const toggleAccordion = (itemId: any) => {
		setActiveAccordion((prev) => (prev === itemId ? null : itemId));
	};

	return (
		<section className={`w-full padding-y transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
			isTransitioning 
				? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
				: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
		}`}>
			<h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
				Keahlian Saya
			</h1>
			{skillsaya.map((item) => (
				<div
					key={item.id}
					className={`w-full flex py-[10px] flex-col ${
						item.id == 1
							? "border-y border-[#21212155]"
							: "border-b border-[#21212155]"
					}`}>
					<div className="w-full flex items-center justify-between py-[10px] padding-x">
						<div className="w-[50%] flex items-center">
							<div className="w-[40%] sm:w-auto xm:w-auto">
							<button
								className="small-text font-normal font-NeueMontreal text-secondry link-flash"
								onClick={() => toggleAccordion (item.id)} 
								>
								{item.website}
								</button>


							</div>
							<div className="w-auto sm:hidden xm:hidden">
								<motion.h3
									className={`small-text font-normal font-NeueMontreal text-secondry ${
										activeAccordion === item.id ? "opacity-100" : "opacity-0"
									} opacity-0 transition-all duration-200 ease-in-out`}>
									{item.title}
								</motion.h3>
							</div>
						</div>
						<div className="w-[50%] flex items-center justify-between">
							<div className="w-[40%] sm:w-auto xm:w-auto">
								
							</div>
							<div className="w-[10%] sm:w-auto xm:w-auto flex items-end justify-end">
								<button
									className={`small-text font-normal font-NeueMontreal uppercase transition-all duration-200 ease-in-out ${
										activeAccordion === item.id
											? "text-gray-300"
											: "text-secondry link-flash"
									}`}
									onClick={() => toggleAccordion(item.id)}>
									{activeAccordion === item.id ? "baca" : "baca"}
								</button>
							</div>
						</div>
					</div>

					<div
						className={`w-full flex justify-between padding-x  sm:flex-col xm:flex-col`}>
						<div className="w-[20%] sm:w-auto xm:w-auto" />
						<div className="w-[30%] sm:w-auto xm:w-auto sm:flex xm:flex flex-wrap gap-x-[5px] sm:pt-[10px] xm:pt-[10px]">
							{item.links.map((link) => (
								<AnimatePresence key={link.id}>
									{activeAccordion === item.id && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{
												ease: [0.4, 0, 0.2, 1],
												duration: 1,
											}}>
											<Buttonno
												href={link.href}
												title={link.title}
												key={link.id}
											/>
										</motion.div>
									)}
								</AnimatePresence>
							))}
						</div>
						<div className="w-[40%] sm:w-auto xm:w-auto">
							<AnimatePresence>
								{activeAccordion === item.id && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{
											ease: [0.4, 0, 0.2, 1],
											duration: 1.3,
										}}>
										<div className="flex flex-col gap-[20px] py-[30px]">
											<div className="">
												<p className="small-text tracking-wider font-normal font-NeueMontreal text-secondry">
													{item.review}
												</p>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<div className="w-[10%] sm:w-auto xm:w-auto" />
					</div>
				</div>
			))}
			<div className="padding-x pt-[30px]">
				<Ratings />
			</div>
		</section>
	);
}
