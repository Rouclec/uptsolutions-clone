import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter, Roboto, Roboto_Slab, DM_Sans } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
export const roboto_slab = Roboto_Slab({ subsets: ["latin"] });
export const dm_sans = DM_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={
        (inter.className,
        roboto.className,
        roboto_slab.className,
        dm_sans.className)
      }
    >
      <Component {...pageProps} />
    </main>
  );
}
