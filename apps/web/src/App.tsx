import "./app/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { AuthProvider } from "./app/auth/AuthProvider";
import { trpc } from "./trpc";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      headers() {
        const token = sessionStorage.getItem("token");

        return token
          ? {
              Authorization: token,
            }
          : {};
      },
    }),
  ],
});

const queryClient = new QueryClient();

function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
