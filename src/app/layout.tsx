import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "أعشاب MYAH - منتجات طبيعية 100%",
  description: "متجر أعشاب MYAH للعسل الحر والمنتجات الطبيعية",
  icons: {
    icon: '/herbs.png',
    shortcut: '/herbs.png',
    apple: '/herbs.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable}`}>
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
