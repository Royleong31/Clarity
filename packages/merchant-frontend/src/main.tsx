import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { clarityQueryClient } from "../../core/src/react-query/clarityClient.ts";
import { merchantQueryClient } from "../../core/src/react-query/merchantClient.ts";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/46716/clarity-base-sepolia/v0.0.2",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={clarityQueryClient}>
        <QueryClientProvider client={merchantQueryClient}>
          <App />
        </QueryClientProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </StrictMode>
);
