import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Stronix Academia",
  description:
    "Uma academia totalmente renovada, projetada para melhorar os resultados dos nossos alunos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${roboto.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
