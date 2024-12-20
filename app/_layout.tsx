import { SessionProvider } from "@/providers";
import { theme } from "@/styles";
import { queryClient } from "@infra";

import { ThemeProvider } from "@shopify/restyle";
import { QueryClientProvider } from "@tanstack/react-query";

import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
