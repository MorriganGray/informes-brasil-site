import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Corrigindo o caminho do ThemeProvider
import { ThemeProvider } from "./components/theme-provider"; 
// Corrigindo o caminho e o nome do Header
import SiteHeader from "./components/SiteHeader"; 
// Corrigindo o caminho e o nome do Footer
import SiteFooter from "./components/SiteFooter"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Informes Brasil",
  description: "O seu portal de notícias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="container py-10">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}