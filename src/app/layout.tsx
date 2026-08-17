import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexus Vault | Wealth & Business Management',
  description: 'Manage your wealth, track business income, and monitor liabilities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
