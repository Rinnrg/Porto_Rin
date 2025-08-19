import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { LinkHover, TextMask , Linksaja} from "@/animation";
import { footerItems, footernavbarItems } from "@/constants";

export default function Footer() {
	const phrase = ["RR-","Portfolio"];
	const phrase1 = ["Link Sosmed"];
	return (
		<footer className="w-full min-h-screen padding-x z-30 relative pt-[40px] bg-background flex flex-col justify-between rounded-t-[20px] mt-[-20px]">
			<div className="w-full flex justify-between sm:flex-col xm:flex-col">
				<div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2">
					<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>
				<div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2">
					<div>
						<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
							<TextMask>{phrase1}</TextMask>
						</h1>
						<div className="pt-[50px]">
							<h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
								Sosmed:
							</h1>
							{footerItems.map((item) => (
								<LinkHover
									title={item.title}
									href={item.href}
									key={item.id}
									className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
								/>
							))}
						</div>
						<div className="flex justify-between">

							<div className="pt-[50px]">
								<h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
									Kontak:
								</h1>
								<div className="flex flex-col gap-y-[10px]">
								<LinkHover
								title="rinogumilang2@gmail.com"
								href="https://rinogumilang2@gmail.com"
								className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]"
								/>
								<LinkHover
									title="+62 8123 1233 415"
									href="https://wa.me/6281231233415"
									className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]"
								/>
								</div>
							</div>

							<div className="pt-[50px]">
								<h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">
									Navigasi:
								</h1>
								{footernavbarItems.map((item) => (
									<Linksaja
										key={item.id}
										className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
										title={item.title}
										href={item.href}
										
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full pt-[40px] pb-[30px] flex justify-between sm:flex-col xm:flex-col sm:gap-[10px] xm:gap-[10px]">
				<div className="w-1/2 sm:w-full xm:w-full">
					<Link href={"/"}>
						<Image
							src= "/logo grey.svg"
							alt="logoku"
							width={60}
							height={60}
						/>
					</Link>
				</div>
				<div className="w-1/2 h-full flex gap-[10px] justify-end items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-end xm:items-end">
					<div className="flex sm:flex-col xm:flex-col gap-[10px]">
						<h1 className="paragraph font-medium font-NeueMontreal text-secondry opacity-40">
							© RR 2024.
						</h1>
					</div>
				</div>
			</div>
		</footer>
	);
}
