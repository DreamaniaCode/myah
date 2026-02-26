import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSettings } from "@/app/actions/settings";
import CustomScripts from "@/components/CustomScripts";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.metaTitle || "أعشاب MYAH - منتجات طبيعية 100%",
    description: settings.metaDescription || "متجر أعشاب MYAH للعسل الحر والمنتجات الطبيعية",
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/logo.png',
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable}`} suppressHydrationWarning>
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
        <CustomScripts
          headScripts={settings.headScripts}
          bodyScripts={settings.bodyScripts}
        />
      </body>
    </html>
  );
}
