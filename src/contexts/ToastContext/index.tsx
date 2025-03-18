import { createContext, useContext, useEffect, useState } from "react";

type ToastProps = {
    message: string;
    backgroundColor: string;
}

type ToastContextProps = {
    toast: ToastProps;
    toastState: boolean;
    progress: number;
    showToast: (toast: ToastProps) => void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const [toast, setToast] = useState<ToastProps>({} as ToastProps);
    const [toastState, setToastState] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const duration: number = 5000;

    function showToast({ message, backgroundColor }: ToastProps) {
        setToast({ message, backgroundColor });
        setProgress(0);
        setToastState(true);
        setTimeout(() => setToastState(false), duration);
    }

    useEffect(() => {
        const intervalProgress = setInterval(() => { setProgress((prev) => Math.min(prev + (100 / (duration / 100)), 100)) }, 100);
        return () => clearInterval(intervalProgress);
    }, [duration]);

    return (
        <ToastContext.Provider value={{ toast, toastState, progress, showToast }}>
            {children}
        </ToastContext.Provider>
    )
}

function useToastContext() {
    return useContext(ToastContext);
}

export { ToastProvider, useToastContext };