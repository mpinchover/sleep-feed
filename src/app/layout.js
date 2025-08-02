import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@/components/ui/provider";
// import {
//   ChakraProvider,
//   createSystem,
//   defaultConfig,
//   defineConfig,
// } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Voyager",
  description: "Voyager",
};

const styling = {
  margin: 0,
  padding: 0,
  // overflow: "hidden",
  height: "100%",
  // boxSizing: "border-box",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning style={styling}>
      <body style={styling}>
        <Provider>
          <Toaster /> {children}
        </Provider>
      </body>
    </html>
  );
}
