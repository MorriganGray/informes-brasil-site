import { Montserrat, Lato } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../lib/auth';
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-montserrat',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

export const metadata = {
  title: 'Informes Brasil - Notícias sem Fake News',
  description: 'O seu portal de notícias confiáveis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.variable} ${lato.variable} bg-brand-light font-lato text-brand-dark`}>
<SpeedInsights />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}