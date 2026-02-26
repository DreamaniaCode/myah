'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

interface ProductDetailClientProps {
    product: Product;
    relatedProducts: Product[];
    settingsPromise: Promise<{ logoUrl: string; siteName: string;[key: string]: unknown }>;
    settings: {
        siteName: string;
        contactPhone: string;
        contactEmail: string;
        contactAddress: string;
    };
}

export default function ProductDetailClient({ product, relatedProducts, settingsPromise, settings }: ProductDetailClientProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setTimeout(() => setIsAdding(false), 800);
    };

    const handleWhatsAppOrder = () => {
        const message = `مرحباً، أريد طلب:\n${product.name}\nالكمية: ${quantity}\nالسعر: ${product.price * quantity} درهم`;
        const whatsappUrl = `https://wa.me/212676953050?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <Header settingsPromise={settingsPromise} />

            <div className={styles.container}>
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb}>
                        <Link href="/">الرئيسية</Link>
                        <span>/</span>
                        <span>المنتجات</span>
                        <span>/</span>
                        <span>{product.name}</span>
                    </nav>

                    {/* Product Detail */}
                    <div className={styles.productDetail}>
                        <div className={styles.imageSection}>
                            <div className={styles.mainImage}>
                                {product.isNew && <span className={styles.badge}>جديد</span>}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                        </div>

                        <div className={styles.infoSection}>
                            <h1 className={styles.title}>{product.name}</h1>

                            <div className={styles.price}>
                                <span className={styles.amount}>{product.price}</span>
                                <span className={styles.currency}>درهم</span>
                            </div>

                            <div className={styles.description}>
                                <h3>الوصف</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className={styles.features}>
                                <h3>المميزات</h3>
                                <ul>
                                    <li>✓ منتج طبيعي 100%</li>
                                    <li>✓ جودة عالية مضمونة</li>
                                    <li>✓ توصيل سريع لجميع المدن</li>
                                    <li>✓ ضمان الاسترجاع</li>
                                </ul>
                            </div>

                            <div className={styles.quantitySection}>
                                <label>الكمية:</label>
                                <div className={styles.quantityControl}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button
                                    onClick={handleAddToCart}
                                    className={`${styles.btn} ${styles.addToCart}`}
                                    disabled={isAdding}
                                >
                                    {isAdding ? '✓ تمت الإضافة' : '🛒 أضف للسلة'}
                                </button>

                                <button
                                    onClick={handleWhatsAppOrder}
                                    className={`${styles.btn} ${styles.whatsapp}`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    اطلب عبر واتساب
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className={styles.relatedSection}>
                            <h2>منتجات مشابهة</h2>
                            <div className={styles.relatedGrid}>
                                {relatedProducts.map((relatedProduct, index) => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer
                siteName={settings.siteName}
                contactPhone={settings.contactPhone}
                contactEmail={settings.contactEmail}
                contactAddress={settings.contactAddress}
            />
        </>
    );
}
