"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClent] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://chatter-xi.vercel.app/api/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClent}>
      <QueryClientProvider client={queryClent}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
