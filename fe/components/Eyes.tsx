"use client";
import Image from "next/image";
import { eyes } from "@/public";
import React, { useEffect, useState, useRef } from "react";

export default function Eyes({ className }: { className: string }) {
	const [eyePosition1, setEyePosition1] = useState({ x: 0, y: 0 });
	const [eyePosition2, setEyePosition2] = useState({ x: 0, y: 0 });
	const [isBlinking, setIsBlinking] = useState(false);
	const [isExcited, setIsExcited] = useState(false);
	const [hoveredElement, setHoveredElement] = useState<string | null>(null);
	const eyeRef1 = useRef<HTMLDivElement>(null);
	const eyeRef2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;
			
			// Check if hovering over interactive elements
			const target = e.target as HTMLElement;
			const isHoveringButton = target.closest('button, a, [role="button"], .clickable, .hover-target');
			
			if (isHoveringButton) {
				setIsExcited(true);
				setHoveredElement(isHoveringButton.tagName);
			} else {
				setIsExcited(false);
				setHoveredElement(null);
			}
			
			// Calculate position for the first eye
			if (eyeRef1.current) {
				const rect1 = eyeRef1.current.getBoundingClientRect();
				const eyeCenterX1 = rect1.left + rect1.width / 2;
				const eyeCenterY1 = rect1.top + rect1.height / 2;

				const deltaX1 = mouseX - eyeCenterX1;
				const deltaY1 = mouseY - eyeCenterY1;
				
				// Increase movement when excited
				const maxMovement = isExcited ? 35 : 25;
				const distance1 = Math.sqrt(deltaX1 * deltaX1 + deltaY1 * deltaY1);
				
				let normalizedX1 = 0;
				let normalizedY1 = 0;
				
				if (distance1 > 0) {
					const limitedDistance1 = Math.min(distance1, isExcited ? 120 : 100);
					normalizedX1 = (deltaX1 / distance1) * (limitedDistance1 / (isExcited ? 120 : 100)) * maxMovement;
					normalizedY1 = (deltaY1 / distance1) * (limitedDistance1 / (isExcited ? 120 : 100)) * maxMovement;
				}
				
				setEyePosition1({
					x: normalizedX1,
					y: normalizedY1
				});
			}
			
			// Calculate position for the second eye
			if (eyeRef2.current) {
				const rect2 = eyeRef2.current.getBoundingClientRect();
				const eyeCenterX2 = rect2.left + rect2.width / 2;
				const eyeCenterY2 = rect2.top + rect2.height / 2;

				const deltaX2 = mouseX - eyeCenterX2;
				const deltaY2 = mouseY - eyeCenterY2;
				
				// Increase movement when excited
				const maxMovement = isExcited ? 35 : 25;
				const distance2 = Math.sqrt(deltaX2 * deltaX2 + deltaY2 * deltaY2);
				
				let normalizedX2 = 0;
				let normalizedY2 = 0;
				
				if (distance2 > 0) {
					const limitedDistance2 = Math.min(distance2, isExcited ? 120 : 100);
					normalizedX2 = (deltaX2 / distance2) * (limitedDistance2 / (isExcited ? 120 : 100)) * maxMovement;
					normalizedY2 = (deltaY2 / distance2) * (limitedDistance2 / (isExcited ? 120 : 100)) * maxMovement;
				}
				
				setEyePosition2({
					x: normalizedX2,
					y: normalizedY2
				});
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [isExcited]);

	// Random blinking (less frequent when excited)
	useEffect(() => {
		const blinkInterval = setInterval(() => {
			if (Math.random() > (isExcited ? 0.9 : 0.8)) {
				setIsBlinking(true);
				setTimeout(() => setIsBlinking(false), isExcited ? 100 : 150);
			}
		}, (isExcited ? 2000 : 3000) + Math.random() * 2000);

		return () => clearInterval(blinkInterval);
	}, [isExcited]);

	return (
		<div className="w-full gap-[30px] flex items-center justify-center">
			<div 
				ref={eyeRef1} 
				className={`bg-white border-[2px] rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
					isExcited 
						? 'border-blue-400 shadow-lg shadow-blue-400/30 scale-105' 
						: 'border-[#21212188]'
				} ${className}`}
			>
				{/* Excited glow effect */}
				{isExcited && (
					<div className="absolute -inset-1 bg-blue-400 rounded-full blur-sm opacity-30 animate-pulse" />
				)}
				
				{/* Moving black pupil/kelopak - mata kiri */}
				<div 
					className={`absolute bg-black rounded-full transition-all ease-out ${
						isExcited ? 'w-[70%] h-[70%] duration-200' : 'w-[60%] h-[60%] duration-75'
					} ${
						isBlinking ? 'scale-y-[0.1] opacity-70' : 'scale-y-100 opacity-90'
					}`}
					style={{
						transform: `translate(${eyePosition1.x}px, ${eyePosition1.y}px)`,
					}}
				>
					{/* Inner highlight - more prominent when excited */}
					<div className={`absolute top-[20%] left-[25%] bg-white rounded-full transition-all duration-200 ${
						isExcited ? 'w-[25%] h-[25%] opacity-90' : 'w-[20%] h-[20%] opacity-80'
					}`}></div>
					<div className={`absolute bottom-[30%] right-[20%] bg-white rounded-full transition-all duration-200 ${
						isExcited ? 'w-[12%] h-[12%] opacity-60' : 'w-[10%] h-[10%] opacity-50'
					}`}></div>
					
					{/* Excited sparkle effect */}
					{isExcited && (
						<div className="absolute top-[10%] right-[15%] w-[8%] h-[8%] bg-yellow-300 rounded-full opacity-70 animate-ping"></div>
					)}
				</div>
				
				{/* Eyelid overlay for blinking */}
				{isBlinking && (
					<div className={`absolute inset-0 rounded-full transition-colors duration-200 animate-pulse ${
						isExcited 
							? 'bg-blue-200' 
							: 'bg-pink-200'
					}`} />
				)}
			</div>
			
			<div 
				ref={eyeRef2} 
				className={`bg-white border-[2px] rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
					isExcited 
						? 'border-blue-400 shadow-lg shadow-blue-400/30 scale-105' 
						: 'border-[#21212188]'
				} ${className}`}
			>
				{/* Excited glow effect */}
				{isExcited && (
					<div className="absolute -inset-1 bg-blue-400 rounded-full blur-sm opacity-30 animate-pulse" />
				)}
				
				{/* Moving black pupil/kelopak - mata kanan */}
				<div 
					className={`absolute bg-black rounded-full transition-all ease-out ${
						isExcited ? 'w-[70%] h-[70%] duration-200' : 'w-[60%] h-[60%] duration-75'
					} ${
						isBlinking ? 'scale-y-[0.1] opacity-70' : 'scale-y-100 opacity-90'
					}`}
					style={{
						transform: `translate(${eyePosition2.x}px, ${eyePosition2.y}px)`,
					}}
				>
					{/* Inner highlight - more prominent when excited */}
					<div className={`absolute top-[20%] left-[25%] bg-white rounded-full transition-all duration-200 ${
						isExcited ? 'w-[25%] h-[25%] opacity-90' : 'w-[20%] h-[20%] opacity-80'
					}`}></div>
					<div className={`absolute bottom-[30%] right-[20%] bg-white rounded-full transition-all duration-200 ${
						isExcited ? 'w-[12%] h-[12%] opacity-60' : 'w-[10%] h-[10%] opacity-50'
					}`}></div>
					
					{/* Excited sparkle effect */}
					{isExcited && (
						<div className="absolute top-[10%] right-[15%] w-[8%] h-[8%] bg-yellow-300 rounded-full opacity-70 animate-ping"></div>
					)}
				</div>
				
				{/* Eyelid overlay for blinking */}
				{isBlinking && (
					<div className={`absolute inset-0 rounded-full transition-colors duration-200 animate-pulse ${
						isExcited 
							? 'bg-blue-200' 
							: 'bg-pink-200'
					}`} />
				)}
			</div>
		</div>
	);
}
