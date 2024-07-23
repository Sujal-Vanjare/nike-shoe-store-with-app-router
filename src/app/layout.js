"use client";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import store from "@/store/store";
import { Provider } from "react-redux";

const urbanist = Urbanist({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="[scrollbar-gutter:_stable]">
      <meta
        name="google-site-verification"
        content="k3Mu_NRmonR916_W69sQXbvwCkKEQ8VczZ8IAWJpmBc"
      />
      <body className={`${urbanist.className} bg-white text-black`}>
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
