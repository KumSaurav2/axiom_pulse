import './globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';
import Header from '@/components/Header';

export const metadata = {
	title: 'Axiom Pulse Replica',
	description: 'Token discovery table replica'
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-axiom-bg text-white antialiased h-screen w-screen">
				<Header />
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}