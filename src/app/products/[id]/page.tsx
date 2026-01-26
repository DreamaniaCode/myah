import { getProduct, getProducts } from '@/app/actions';
import { getSettings } from '@/app/actions/settings';
import { notFound } from 'next/navigation';
import ProductGallery from "@/components/ProductGallery";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductActions from "@/components/ProductActions";
import RelatedProducts from "@/components/RelatedProducts";
import styles from './page.module.css';

export const dynamic = 'force-dynamic';


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    // Ensure images is an array (handle legacy data)
    const productImages = Array.isArray(product.images) ? product.images : [];
    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header settingsPromise={settingsPromise} />

            <main className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    {/* Gallery Section */}
                    <div className={styles.gallerySection}>
                        <ProductGallery
                            mainImage={product.image}
                            images={productImages}
                            name={product.name}
                        />
                    </div>

                    {/* Product Info */}
                    <div className={styles.infoSection} dir="rtl">
                        <div>
                            <h1 className={styles.title}>{product.name}</h1>
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>{product.price}</span>
                                <span className={styles.currency}>درهم</span>
                            </div>
                        </div>

                        <div className={styles.description}>
                            {product.description}
                        </div>

                        <ProductActions product={{ ...product, isNew: product.isNew }} price={product.price} />

                        <div className={styles.trustBadges}>
                            <div className={styles.badge}>
                                <span className={styles.badgeIcon}>🚚</span>
                                <div>شحن سريع لجميع المدن</div>
                            </div>
                            <div className={styles.badge}>
                                <span className={styles.badgeIcon}>🛡️</span>
                                <div>ضمان جودة المنتجات 100%</div>
                            </div>
                            <div className={styles.badge}>
                                <span className={styles.badgeIcon}>💬</span>
                                <div>دعم فني 7/7</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.relatedSection}>
                    <RelatedProducts currentProductId={product.id} category={product.category} />
                </div>
            </main>

            <Footer
                siteName={settings.siteName}
                contactPhone={settings.contactPhone}
                contactEmail={settings.contactEmail}
                contactAddress={settings.contactAddress}
            />
        </div>
    );
}
