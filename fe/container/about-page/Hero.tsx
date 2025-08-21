"use client";
import Link from "next/link";
import Image from "next/image";
import { Saya } from "@/public";
import { Eyes, PDFViewer } from "@/components";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
// import { api } from "@/services/api"; // Removed - services folder deleted

interface HeroData {
	heroDescription: string;
}

interface CVData {
	id?: number;
	fileName: string;
	fileUrl: string;
	description?: string;
	uploadDate: string;
	fileSize?: string;
	originalName?: string;
}

export default function Hero() {
	const [heroData, setHeroData] = useState<HeroData>({
		heroDescription: "Saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional."
	});

	// PDF Viewer state
	const [showPDFViewer, setShowPDFViewer] = useState(false);
	const [cvData, setCvData] = useState<CVData | null>(null);
	const [loadingCV, setLoadingCV] = useState(false);

	// Load CV data when viewer opens
	const handleShowCV = async () => {
		setShowPDFViewer(true);
		setLoadingCV(true);
		
		try {
			// Direct API call instead of using api service
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/cv/current`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
				},
			});

			const data = await response.json();
			
			if (response.ok && data.success && data.data) {
				setCvData({
					id: data.data.id,
					fileName: data.data.original_name || data.data.file_name,
					originalName: data.data.original_name,
					fileUrl: data.data.file_url,
					description: data.data.description,
					uploadDate: data.data.created_at,
					fileSize: data.data.file_size
				});
			} else {
				setCvData(null);
			}
		} catch (error) {
			console.error('Error loading CV:', error);
			setCvData(null);
		} finally {
			setLoadingCV(false);
		}
	};

	// Load data from API
	useEffect(() => {
		const loadHeroData = async () => {
			try {
				const response = await fetch('/api/about');
				if (response.ok) {
					const data = await response.json();
					setHeroData({
						heroDescription: data.heroDescription || "Saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional."
					});
				}
			} catch (error) {
				console.error('Error loading hero data:', error);
				// Fallback to localStorage
				try {
					const savedData = localStorage.getItem('aboutMeData');
					if (savedData) {
						const parsedData = JSON.parse(savedData);
						setHeroData({
							heroDescription: parsedData.heroDescription || "Saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional."
						});
					}
				} catch (localError) {
					console.error('Error loading from localStorage:', localError);
				}
			}
		};

		loadHeroData();

		// Listen for storage changes
		const handleStorageChange = () => {
			loadHeroData();
		};

		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('aboutDataUpdated', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('aboutDataUpdated', handleStorageChange);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<section className="w-full min-h-screen mt-[60px]">
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								Tentang <br />
								<div className="flex items-center gap-[5px]">
									<motion.span
										initial={{ width: 0 }}
										animate={{ width: "auto" }}
										transition={{
											ease: [0.86, 0, 0.07, 0.995],
											duration: 1,
											delay: 1.5,
										}}>
										<Image
										src={Saya}
										alt="img"
										className="h-[64px] w-auto sm:h-[45px] md:h-[63px] lg:h-[95px] xl:mt-[15px] mt-[10px] object-cover rounded-[10px]"
										/>

									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
										SAYA
									</h1>
								</div>
							</h1>
						</div>
					</div>
					<div className="w-full border-t border-[#21212155] pt-[20px]">
						{/* Removed the original CV button from here */}
					</div>
				</div>
			</div>
			<div
				className="padding-y"
				data-scroll
				data-scroll-speed="-.1">
				<Eyes className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
			</div>
			
			{/* CV Button below Eyes */}
			<div className="w-full flex justify-center items-center pb-[50px] relative z-50">
				<button
					onClick={handleShowCV}
					className="flex w-fit h-fit gap-[8px] group relative z-50 transform hover:scale-105 transition-transform duration-300">
					<div className="rounded-[50px] border-2 border-[#21212199] group-hover:border-secondry group-hover:bg-secondry py-[8px] px-[20px] cursor-pointer transition-all duration-200 ease-in bg-background shadow-lg hover:shadow-xl">
						<span className="text-[16px] font-semibold font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-200 ease-in tracking-wide">
							Lihat CV
						</span>
					</div>
					<div className="w-[42px] flex items-center justify-center h-[42px] border-2 border-[#21212199] group-hover:border-secondry rounded-[50px] p-[12px] group-hover:bg-secondry transition-all duration-200 ease-in cursor-pointer bg-background shadow-lg hover:shadow-xl">
						<ArrowUpRight strokeWidth={2} className="w-5 h-5 text-secondry group-hover:text-background transition-all duration-200 ease-in" />
					</div>
				</button>
			</div>
			
			<div className="padding-x">

			</div>

			{/* PDF Viewer */}
			{cvData && (
				<PDFViewer
					isOpen={showPDFViewer}
					onClose={() => setShowPDFViewer(false)}
					fileUrl={cvData.fileUrl}
					fileName={cvData.fileName}
					cvId={cvData.id}
				/>
			)}
		</section>
	);
}