import type { Metadata } from "next";
import '@/styles/GlobalStyles.css';

export const metadata: Metadata = {
  title: "Gerador de valor de OS",
  description: "Gerador automático de valor de OS",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}