import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { Quicksand } from "next/font/google";
// import {
//   ChakraProvider,
//   createSystem,
//   defaultConfig,
//   defineConfig,
// } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../auth/auth-context";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
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
    <html
      lang="en"
      suppressHydrationWarning
      style={styling}
      className={quicksand.variable}
    >
      <body style={styling}>
        <AuthProvider>
          <Provider>
            <Toaster /> {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
