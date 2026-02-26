import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSettings } from "@/app/actions/settings";
import SafeHydrate from "@/components/SafeHydrate";
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
      <head>
        {settings.headScripts && (
          <script
            id="head-scripts"
            dangerouslySetInnerHTML={{
              __html: `(function() {
                                var div = document.createElement('div');
                                div.innerHTML = ${JSON.stringify(settings.headScripts)};
                                while (div.firstChild) {
                                    if (div.firstChild.tagName === 'SCRIPT') {
                                        var s = document.createElement('script');
                                        s.textContent = div.firstChild.textContent;
                                        Array.from(div.firstChild.attributes).forEach(attr => s.setAttribute(attr.name, attr.value));
                                        document.head.appendChild(s);
                                    } else {
                                        document.head.appendChild(div.firstChild);
                                    }
                                    div.removeChild(div.firstChild);
                                }
                            })()`
            }}
          />
        )}
      </head>
      <body className={`${cairo.variable}`} suppressHydrationWarning>
        {settings.bodyScripts && (
          <SafeHydrate>
            <div dangerouslySetInnerHTML={{ __html: settings.bodyScripts }} />
          </SafeHydrate>
        )}
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
