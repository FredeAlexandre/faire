"use client";

import {
  QueryClient,
  QueryClientProvider as TansStackQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TansStackQueryClientProvider client={queryClient}>
      {children}
    </TansStackQueryClientProvider>
  );
}
