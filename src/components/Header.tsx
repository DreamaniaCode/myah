'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';
import { use } from 'react';

export default function Header({ settingsPromise }: { settingsPromise: Promise<any> }) {
    const { cartCount } = useCart();
    const settings = use(settingsPromise);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <Image
                        src={settings.logoUrl}
                        alt={settings.siteName}
                        width={120}
                        height={60}
                        style={{ width: 'auto', height: '60px' }}
                        priority
                    />
                </Link>

                <ul className={styles.links}>
                    <li><Link href="/" className={styles.link}>الرئيسية</Link></li>
                    <li><Link href="/products" className={styles.link}>المنتجات</Link></li>
                    <li><Link href="/gallery" className={styles.link}>معرض الصور</Link></li>
                    <li><Link href="/blog" className={styles.link}>المدونة</Link></li>
                    <li><Link href="/about" className={styles.link}>من نحن</Link></li>
                    <li><Link href="/contact" className={styles.link}>اتصل بنا</Link></li>
                </ul>

                <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
                    🛒
                    {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                </Link>
            </div>
        </header >
    );
}
