import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Hero />
      <section className="container section-padding" style={{ flex: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: 'var(--text-color)' }}>
          منتجاتنا المميزة
        </h2>
        <ProductList products={products} />
      </section>
      <Footer />
    </main>
  );
}
