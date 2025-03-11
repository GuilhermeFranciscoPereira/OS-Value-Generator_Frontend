'use client';
import { ToastProvider } from "./ToastContext";
import { ModalProvider } from "./ModalContext";
import { SearchByIdProvider } from "./SearchByIdContext";

const AppProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    return (
        <ModalProvider>
            <ToastProvider>
                <SearchByIdProvider>
                    {children}
                </SearchByIdProvider>
            </ToastProvider>
        </ModalProvider>
    )
}

export default AppProvider;