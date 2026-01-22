'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CartPage() {
    const { items, removeFromCart, cartTotal } = useCart();

    return (
        <main>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>سلة المشتريات</h1>

                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <p>السلة فارغة حالياً.</p>
                        <Link href="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            تصفح المنتجات
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={styles.list}>
                            {items.map((item) => (
                                <div key={item.id} className={styles.item}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className={styles.image}
                                    />
                                    <div className={styles.details}>
                                        <div className={styles.name}>{item.name}</div>
                                        <div className={styles.price}>{item.price} درهم</div>
                                    </div>
                                    <div className={styles.quantity}>
                                        العدد: {item.quantity}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className={styles.remove}
                                    >
                                        حذف
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.total}>
                                المجموع: <span style={{ color: 'var(--primary-color)' }}>{cartTotal} درهم</span>
                            </div>
                            <Link href="/checkout" className={styles.checkoutBtn}>
                                إتمام الطلب
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
