import type { Metadata, ResolvingMetadata } from "next";
import { Cairo } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSettings } from "@/app/actions/settings";
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
      icon: [
        { url: '/herbs.png' },
        { url: '/herbs.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/herbs.png',
      apple: '/herbs.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/herbs.png',
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
    <html lang="ar" dir="rtl">
      <head>
        {settings.headScripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.headScripts }} />
        )}
      </head>
      <body className={`${cairo.variable}`}>
        {settings.bodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.bodyScripts }} />
        )}
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
