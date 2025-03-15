'use client';
import { ToastProvider } from "./ToastContext";
import { ModalProvider } from "./ModalContext";
import { SearchByIdProvider } from "./SearchByIdContext";
import { FiltersProvider } from "./FiltersContext";

const AppProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    return (
        <FiltersProvider>
            <ModalProvider>
                <ToastProvider>
                    <SearchByIdProvider>
                        {children}
                    </SearchByIdProvider>
                </ToastProvider>
            </ModalProvider>
        </FiltersProvider>
    )
}

export default AppProvider;