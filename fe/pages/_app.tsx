import "@/styles/globals.css";
import { Footer, Navbar, LocomotiveScrollWrapper } from "@/components";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { configureSweetAlert } from "@/utils/sweetalert-config";

export default function App({
	Component,
	pageProps,
	router,
}: {
	Component: any;
	pageProps: any;
	router: any;
}) {
	const isAdminRoute = router.route.startsWith('/admin');

	// Configure SweetAlert on app initialization
	useEffect(() => {
		configureSweetAlert();
	}, []);

	return (
		<AuthProvider>
			<LocomotiveScrollWrapper>
				{!isAdminRoute && <Navbar />}
				<AnimatePresence mode="wait">
					<Component
						key={router.route}
						{...pageProps}
					/>
				</AnimatePresence>
				{!isAdminRoute && <Footer />}
			</LocomotiveScrollWrapper>
		</AuthProvider>
	);
}
