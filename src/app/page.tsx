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
    slug: p.slug ?? undefined,
    description: p.description,
    price: p.price,
    image: p.image,
    category: p.category as "honey" | "herbs" | "oils",
    isNew: p.isNew
  }));

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header settingsPromise={settingsPromise} />
      <Hero />
      <section id="products" className="container section-padding" style={{ flex: 1, width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: 'var(--text-color)' }}>
          منتجاتنا المميزة
        </h2>
        <ProductList products={products} />
      </section>

      <section className="container section-padding" style={{ background: '#f9fafb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#B45309' }}>فوائد العسل الطبيعي</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4B5563', marginBottom: '2rem' }}>
            يعتبر العسل من أكثر الأغذية الطبيعية فائدة لصحة الإنسان. فهو يحتوي على مضادات الأكسدة التي تعزز مناعة الجسم،
            كما يعمل كمضاد حيوي طبيعي. العسل الحر، مثل عسل السدر وعسل الكالبتوس، معروف بقدرته على تحسين الهضم،
            تهدئة السعال، وتزويد الجسم بالطاقة الطبيعية دون التأثير السلبي للسكريات المصنعة.
          </p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#166534' }}>الأعشاب الطبيعية</h3>
            <p style={{ lineHeight: '1.7', color: '#4B5563' }}>
              نقدم لكم تشكيلة مختارة من الأعشاب المغربية الأصيلة. من خلطات التهدئة والاسترخاء إلى الأعشاب العلاجية.
              جميع أعشابنا يتم تجفيفها بعناية للحفاظ على زيوتها العطرية وخصائصها العلاجية.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💧</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#B91C1C' }}>الزيوت الأساسية</h3>
            <p style={{ lineHeight: '1.7', color: '#4B5563' }}>
              اكتشف قوة الطبيعة مع زيوتنا المعصورة على البارد. زيت الأركان للتجميل، وزيوت المساج العلاجية.
              منتجات خالية من الإضافات الكيميائية لضمان أقصى فائدة لبشرتك وشعرك.
            </p>
          </div>
        </div>
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
