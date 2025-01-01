import { QueryClientConfig } from "@tanstack/query-core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "@/styles";
import { RenderOptions, render } from "@testing-library/react-native";
import { Global } from "../src/services/global/Global";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
};

function wrapAllProviders() {
  const queryClient = new QueryClient(queryClientConfig);

  return ({ children }: React.PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {children}
        <Global />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function customRender<T>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(component, { wrapper: wrapAllProviders(), ...options });
}

export * from "@testing-library/react-native";
export { customRender as render };
