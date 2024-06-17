import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { CookiesProvider } from "next-client-cookies/server";

const pjs = Plus_Jakarta_Sans({
  weights: [200, 300, 400, 500, 600, 700, 800],
  subsets: ["vietnamese"],
  style: "normal",
});

export const metadata = {
  title: "Padukuhan Gangsalan Kidul",
  description: "Unofficial Website of Padukuhan Gangsalan Kidul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pjs.className}>
        <Providers>
          <CookiesProvider>{children}</CookiesProvider>
        </Providers>
      </body>
    </html>
  );
}
