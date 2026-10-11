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
  const siteTitle = settings.metaTitle || "أعشاب MYAH - منتجات طبيعية 100%";
  const siteDescription = settings.metaDescription || "متجر أعشاب MYAH للعسل الحر والمنتجات الطبيعية والزيوت الأصلية";
  const ogImage = settings.heroImage || settings.logoUrl || '/images/logo.png';

  return {
    metadataBase: new URL('https://herbsmyah.com'),
    title: {
      default: siteTitle,
      template: '%s | أعشاب MYAH',
    },
    description: siteDescription,
    alternates: {
      canonical: 'https://herbsmyah.com',
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: 'https://herbsmyah.com',
      siteName: 'أعشاب MYAH',
      locale: 'ar_MA',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'أعشاب MYAH',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
    },
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
          <WhatsAppButton phone={settings.contactPhone} />
        </CartProvider>
        <CustomScripts
          headScripts={settings.headScripts}
          bodyScripts={settings.bodyScripts}
        />
      </body>
    </html>
  );
}
