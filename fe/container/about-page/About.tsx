import { fotorino2 } from "@/public";
import { BackgroundImg } from "@/components";
import Image from "next/image";
import { Ratings } from "@/components";
import { pendidikanku } from "@/constants";
import { useState, useEffect } from "react";

interface Education {
	id: string;
	institution: string;
	degree: string;
	period: string;
	description: string;
	logo?: string;
}

interface Organization {
	id: string;
	name: string;
	position: string;
	period: string;
	description: string;
	logo?: string;
}

interface CustomSection {
	id: string;
	sectionTitle?: string;
	title: string;
	subtitle?: string;
	content: string;
	image?: string;
	imageCaption?: string;
}

interface AboutData {
	aboutText: string;
	heroDescription: string;
	educations: Education[];
	organizations: Organization[];
	customSections: CustomSection[];
	sectionOrder?: string[];
}

export default function About() {
	const aboutTextDefault = "Saya adalah seorang mahasiswa aktif di Universitas Negeri Surabaya.\nDengan pengalaman dalam berbagai bidang desain, mulai dari desain grafis hingga desain UI/UX,\nsaya selalu berusaha menghadirkan kreativitas yang tak hanya\nmenarik secara visual, tetapi juga fungsional.\n\nSebagai seorang desainer,\nsaya selalu berusaha\nterus berkembang dan\nmengeksplorasi tren desain\nterkini untuk memberikan hasil yang\nrelevan dan up-to-date.";

	const [aboutData, setAboutData] = useState<AboutData>({
		aboutText: aboutTextDefault,
		heroDescription:
			"Saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional.",
		educations: [
			{
				id: "1",
				institution: "Universitas Negeri Surabaya",
				degree: "S1 Pendidikan Teknologi Informasi",
				period: "2022 - Sekarang",
				description:
					"Saya saat ini menempuh studi di Universitas Negeri Surabaya, jurusan Teknik Informatika, program studi S1 Pendidikan Teknologi Informasi angkatan 2022. Melalui pendidikan ini, saya mengembangkan pemahaman mendalam tentang teknologi informasi, pemrograman, dan pengaplikasiannya dalam bidang pendidikan. Studi ini juga membantu saya mengasah keterampilan teknis sekaligus membekali saya dengan pendekatan pedagogis untuk berbagi ilmu teknologi secara efektif.",
				logo: "/logo unesa black.svg",
			},
		],
		organizations: [
			{
				id: "1",
				name: "Himti Unesa",
				position: "Staff Departemen Komunikasi dan Informasi",
				period: "2023 - 2024",
				description:
					"Di Himpunan Mahasiswa Teknik Informatika (HIMTI) Universitas Negeri Surabaya saya menjabat sebagai staff Departemen Komunikasi dan Informasi (KOMINFO) dengan masa 6 bulan yaitu maret sampai desember. Dalam peran ini, saya bertanggung jawab untuk mengelola feed Instagram HIMTI Unesa, termasuk mengupdate informasi terbaru dan membuat konten visual yang menarik. Melalui pengalaman ini, saya mengasah kemampuan komunikasi visual dan manajemen media sosial.",
				logo: "/logo himti.svg",
			},
			{
				id: "2",
				name: "GDSC Unesa",
				position: "Content Creator",
				period: "2023 - 2024",
				description:
					"Saya juga aktif di Google Developer Student Club Universitas Negeri Surabaya (GDSC Unesa) sebagai anggota divisi Content Creator. Dalam peran ini, saya bertanggung jawab untuk membuat feed postingan yang sesuai dengan timeline yang sudah ditentukan. Pengalaman ini memperkuat kemampuan saya dalam perencanaan konten, desain grafis, dan manajemen waktu untuk memastikan setiap informasi tersampaikan dengan efektif.",
				logo: "/logo gdsc.svg",
			},
			{
				id: "3",
				name: "HMP PTI Unesa",
				position: "Ketua Departemen Komunikasi dan Informasi",
				period: "2023 - 2024",
				description:
					"Di Himpunan Mahasiswa Prodi Pendidikan Teknologi Informasi HIMTI Unesa (HMP PTI) Unesa saya juga menjabat sebagai Ketua Departemen Komunikasi dan Informasi (KOMINFO). Dalam peran ini, saya bertanggung jawab untuk mengatur dan mengelola timeline postingan di akun Instagram HMP PTI, memastikan setiap informasi dapat tersampaikan dengan terorganisir dan tepat waktu.",
				logo: "/logo hmppti.svg",
			},
		],
		customSections: [],
		sectionOrder: ["about", "educations", "organizations"],
	});

	// Load data from API
	useEffect(() => {
		const loadAboutData = async () => {
			try {
				const response = await fetch('/api/about');
				if (response.ok) {
					const data = await response.json();
					setAboutData((prev) => ({
						...prev,
						aboutText: data.aboutText || prev.aboutText,
						heroDescription: data.heroDescription || prev.heroDescription,
						educations: data.educations || prev.educations,
						organizations: data.organizations || prev.organizations,
						customSections: data.customSections || prev.customSections,
						sectionOrder: data.sectionOrder || prev.sectionOrder,
					}));
				}
			} catch (error) {
				console.error('Error loading about data:', error);
				// Fallback to localStorage if API fails
				try {
					const savedData = localStorage.getItem('aboutMeData');
					if (savedData) {
						const parsedData = JSON.parse(savedData);
						setAboutData((prev) => ({
							...prev,
							aboutText: parsedData.aboutText || prev.aboutText,
							heroDescription: parsedData.heroDescription || prev.heroDescription,
							educations: parsedData.educations || prev.educations,
							organizations: parsedData.organizations || prev.organizations,
							customSections: parsedData.customSections || prev.customSections,
							sectionOrder: parsedData.sectionOrder || prev.sectionOrder,
						}));
					}
				} catch (localError) {
					console.error('Error loading from localStorage:', localError);
				}
			}
		};

		loadAboutData();

		// Listen for storage changes (ketika data diupdate dari admin)
		const handleStorageChange = () => {
			loadAboutData();
		};

		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('aboutDataUpdated', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('aboutDataUpdated', handleStorageChange);
		};
	}, []);

	return (
		<>
			<section className="w-full padding-y">
				<div className="w-full flex flex-col">
					<h2 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px]">
						Tentang Saya
					</h2>
					<div className="w-full border-t border-[#21212155] pt-[20px]">
						<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[15px] padding-x">
							<div className="w-1/2 sm:w-full xm:w-full">
								<h3 className="paragraph font-medium text-secondry font-NeueMontreal">
									Tentang Saya:
								</h3>
							</div>
							<div className="w-1/2 sm:w-full xm:w-full">
								<p className="paragraph font-NeueMontreal text-secondry whitespace-pre-line">
									{aboutData.aboutText}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{renderCustomSections()}
		</>
	);

	function renderCustomSections() {
		if (!aboutData.customSections || aboutData.customSections.length === 0) {
			return null;
		}

		// Group sections by sectionTitle
		const groupedSections = aboutData.customSections.reduce((acc, section) => {
			const sectionTitle = section.sectionTitle || 'Section Lainnya';
			if (!acc[sectionTitle]) {
				acc[sectionTitle] = [];
			}
			acc[sectionTitle].push(section);
			return acc;
		}, {} as Record<string, typeof aboutData.customSections>);

		// Respect the section order from admin
		const currentOrder = aboutData.sectionOrder || ['about', 'educations', 'organizations'];

		return Object.entries(groupedSections).map(([sectionTitle, sections]) => (
			<section key={sectionTitle} className="w-full bg-background">
				<div>
					<h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry mt-20">
						{sectionTitle}
					</h1>
				</div>
				<div className="w-full border-t border-[#21212155] mt-[50px]">
					{sections.map((section, index) => (
						<div key={section.id} className={`flex justify-between gap-[20px] sm:flex-col xm:flex-col pt-[50px] ${index > 0 ? 'border-t border-[#21212130] mt-[50px]' : ''}`}>
							<div className="w-[440px] sm:w-[380px] xm:w-[350px] padding-x py-[30px] shrink-0">
								<div className="w-full h-full flex flex-col gap-[50px]">
									{section.image && (
										<div>
											<Image
												src={section.image}
												alt={section.title}
												width={80}
												height={80}
												className="w-[80px] h-[80px] object-cover rounded-lg"
											/>
										</div>
									)}
									<div className="flex flex-col gap-[20px]">
										<h3 className="paragraph text-secondry font-NeueMontreal font-semibold">
											{section.title}
										</h3>
										{section.subtitle && (
											<p className="paragraph text-secondry font-NeueMontreal font-normal underline">
												{section.subtitle}
											</p>
										)}
										<p className="paragraph text-secondry font-NeueMontreal font-normal whitespace-pre-line">
											{section.content}
										</p>
										{section.imageCaption && (
											<p className="text-sm text-secondry font-NeueMontreal font-normal italic">
												{section.imageCaption}
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="padding-x padding-y">
					<Ratings />
				</div>
			</section>
		));
	}
}