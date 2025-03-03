'use client';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient: QueryClient = new QueryClient();

export default function ToQueryClientProvider({children}: {children: React.ReactNode}): React.ReactNode {
    return (
        <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </>
    )
}