"use client";
import "./globals.css";
import { Oswald, Urbanist } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import store from "@/store/store";
import { Provider } from "react-redux";

const urbanist = Urbanist({
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} bg-mode txt-mode`}>
        <Provider store={store}>
          <Header />
          <div className="h-[calc(100vh-80px)] flex flex-col justify-between">
            {children}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
