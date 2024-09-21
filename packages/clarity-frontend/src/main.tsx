import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { clarityQueryClient } from "../../core/src/react-query/clarityClient.ts";
import { merchantQueryClient } from "../../core/src/react-query/merchantClient.ts";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "./providers.ts";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/46716/clarity-test/v0.1.6",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={clarityQueryClient}>
        <QueryClientProvider client={merchantQueryClient}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} modalSize="compact">
              <App />
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </StrictMode>
);
