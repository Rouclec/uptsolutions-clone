import "@/styles/globals.css";
import { store } from "@/store";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Roboto, Roboto_Slab, DM_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const inter = Inter({ subsets: ["latin"] });
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
export const roboto_slab = Roboto_Slab({ subsets: ["latin"] });
export const dm_sans = DM_Sans({ subsets: ["latin"] });

const client = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <main
            className={
              (inter.className,
              roboto.className,
              roboto_slab.className,
              dm_sans.className)
            }
          >
            <Component {...pageProps} />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </main>
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
