import "@/styles/globals.css";
import { Footer, Navbar, LocomotiveScrollWrapper } from "@/components";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { TransitionProvider } from "@/context/TransitionContext";
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

	// For admin routes, wrap with AuthProvider
	if (isAdminRoute) {
		return (
			<AuthProvider>
				<TransitionProvider>
					<LocomotiveScrollWrapper>
						<AnimatePresence mode="wait">
							<Component
								key={router.route}
								{...pageProps}
							/>
						</AnimatePresence>
					</LocomotiveScrollWrapper>
				</TransitionProvider>
			</AuthProvider>
		);
	}

	// For public routes, no AuthProvider
	return (
		<TransitionProvider>
			<LocomotiveScrollWrapper>
				<Navbar />
				<AnimatePresence mode="wait">
					<Component
						key={router.route}
						{...pageProps}
					/>
				</AnimatePresence>
				<Footer />
			</LocomotiveScrollWrapper>
		</TransitionProvider>
	);
}
