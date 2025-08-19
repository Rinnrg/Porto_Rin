"use client";
import { useState, useEffect } from "react";
import { Heading, ProjectCard, RoundButton } from "@/components";
import { useTransition } from "@/context/TransitionContext";

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isTransitioning } = useTransition();

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects');
			const data = await response.json();
			// Show only first 4 projects on homepage
			setProjects(data.slice(0, 4));
		} catch (error) {
			console.error('Failed to fetch projects:', error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section className={`w-full rounded-t-[20px] transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
				isTransitioning 
					? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
					: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
			}`}>
				<Heading
					title="Histori Proyek"
					className="padding-x padding-y pb-[50px] border-b border-[#21212155]"
				/>
				<div className="padding-x padding-y text-center">
					<div className="text-gray-500">Loading projects...</div>
				</div>
			</section>
		);
	}

	return (
		<section className={`w-full rounded-t-[20px] transition-all duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
			isTransitioning 
				? 'scale-[0.3] opacity-0 rounded-[200px] blur-[20px] rotate-[5deg] saturate-[3] brightness-[0.3] contrast-[2]' 
				: 'scale-100 opacity-100 blur-0 rotate-0 saturate-100 brightness-100 contrast-100'
		}`}>
			<Heading
				title="Histori Proyek"
				className="padding-x padding-y pb-[50px] border-b border-[#21212155]"
			/>
			<div className="w-full flex justify-between gap-y-[50px] padding-x padding-y flex-wrap">
				{projects.map((item: any) => (
					<div
						className="w-[49%] sm:w-full xm:w-full"
						key={item.id}>
						<div className="flex gap-[10px] items-center pb-[10px]">
							<span className="w-[10px] h-[10px] rounded-full bg-secondry" />
							<h1 className="small-text uppercase font-medium font-NeueMontreal text-secondry">
								{item.title}
							</h1>
						</div>
						<ProjectCard item={item} />
					</div>
				))}
			</div>
			<div className="w-full flex justify-center">
				<div className="flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
					<RoundButton
						href="/proyek"
						title="Lihat Semua Proyek"
						bgcolor="#000"
						className="bg-white text-black"
						style={{ color: "#fff" }}
					/>
				</div>
			</div>
		</section>
	);
}