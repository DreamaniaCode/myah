import { getProduct, getProducts } from '@/app/actions';
import { getSettings } from '@/app/actions/settings';
import { notFound } from 'next/navigation';
import ProductGallery from "@/components/ProductGallery";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = 'force-dynamic';


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    // Ensure images is an array (handle legacy data)
    const productImages = Array.isArray(product.images) ? product.images : [];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header settingsPromise={getSettings()} />

            <main className="container section-padding" style={{ flex: 1, marginTop: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Gallery Section */}
                    <ProductGallery
                        mainImage={product.image}
                        images={productImages}
                        name={product.name}
                    />

                    {/* Product Info (unchanged) */}
                    <div dir="rtl">
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111827' }}>{product.name}</h1>
                        <div style={{ fontSize: '1.5rem', color: '#059669', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                            {product.price} درهم
                        </div>

                        <div style={{ marginBottom: '2rem', lineHeight: '1.8', color: '#374151', fontSize: '1.1rem' }}>
                            {product.description}
                        </div>

                        <AddToCartButton product={{ ...product, isNew: product.isNew }} />

                        <div style={{ marginTop: '2rem', padding: '1rem', background: '#F3F4F6', borderRadius: '8px', fontSize: '0.9rem' }}>
                            <p>✅ شحن سريع لجميع المدن</p>
                            <p>✅ ضمان جودة المنتجات 100%</p>
                            <p>✅ دعم فني 24/7</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer
                siteName="أعشاب MYAH"
                contactPhone="+212 600 000 000"
                contactEmail="contact@herbsmyah.com"
                contactAddress="الدار البيضاء، المغرب"
            />
        </div>
    );
}
