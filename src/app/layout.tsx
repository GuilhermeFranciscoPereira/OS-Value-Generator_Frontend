import type { Metadata } from "next";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import AppProvider from "@/contexts/AppProvider";
import ToQueryClientProvider from "@/services/queryClient";
import '@/styles/GlobalStyles.css';

export const metadata: Metadata = {
  title: "Gerador de valor de OS",
  description: "Gerador automático de valor de OS",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppProvider>
      <ToQueryClientProvider>
        <html lang="pt-br">
          <body>
            <Toast></Toast> {/* Rendered only when invoked and set to true, and disappears when set to false */}
            <Modal></Modal> {/* Rendered only when invoked and set to true, and disappears when set to false */}
            {children}
          </body>
        </html>
      </ToQueryClientProvider>
    </AppProvider>
  );
}