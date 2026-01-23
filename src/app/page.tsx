import Header from "@/components/Header";
export const dynamic = 'force-dynamic';

import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import { getProducts } from "@/app/actions";
import { getSettings } from "@/app/actions/settings";

export default async function Home() {
  const prismaProducts = await getProducts();
  const settingsPromise = getSettings();
  const settings = await settingsPromise;

  // Transform for Client Component (remove Dates)
  const products = prismaProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    category: p.category as any,
    isNew: p.isNew
  }));

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header settingsPromise={settingsPromise} />
      <Hero />
      <section className="container section-padding" style={{ flex: 1, width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: 'var(--text-color)' }}>
          منتجاتنا المميزة
        </h2>
        <ProductList products={products} />
      </section>
      <Footer
        siteName={settings.siteName}
        contactPhone={settings.contactPhone}
        contactEmail={settings.contactEmail}
        contactAddress={settings.contactAddress}
      />
    </main>
  );
}
