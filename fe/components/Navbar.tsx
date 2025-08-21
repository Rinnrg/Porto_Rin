import Link from "next/link";
import SafeImage from "./SafeImage";
import { logo } from "@/public";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { MobileNav, SideHome} from "@/components";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";


export default function Navbar() {
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous && latest > previous) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<>
			<motion.nav
				variants={navVariants}
				className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between sm:hidden xm:hidden md:hidden"
				animate={hidden ? "hidden" : "visible"}>
				<div className="w-[10%] flex items-center justify-start">
					<Link href={"/"}>
						<SafeImage
							src="/Logoblck.png"
							alt="logoku"
							width={25}
							height={25}
						/>
					</Link>
				</div>
				<div className="flex gap-x-[20px] w-[90%] justify-end">
					{navbarItems.map((item) => (
						<Link
							key={item.id}
							className={`w-fit paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover`}
							href={item.href}>
							<TextHover
								titile1={item.title}
								titile2={item.title}
							/>
						</Link>
					))}
				</div>
			</motion.nav>
			<SideHome />
		</>
	);
}
