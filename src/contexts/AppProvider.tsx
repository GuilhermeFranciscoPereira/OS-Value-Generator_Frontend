'use client';
import { ToastProvider } from "./ToastContext";
import { ModalProvider } from "./ModalContext";

const AppProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    return (
        <ModalProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </ModalProvider>
    )
}

export default AppProvider;