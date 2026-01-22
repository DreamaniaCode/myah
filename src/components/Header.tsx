'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { cartCount } = useCart();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <Image
                        src="/images/logo.png"
                        alt="Herbs MYAH"
                        width={120}
                        height={60}
                        style={{ width: 'auto', height: '60px' }}
                        priority
                    />
                </Link>

                <ul className={styles.links}>
                    <li><Link href="/" className={styles.link}>الرئيسية</Link></li>
                    <li><Link href="/products" className={styles.link}>المنتجات</Link></li>
                    <li><Link href="/about" className={styles.link}>من نحن</Link></li>
                </ul>

                <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
                    🛒
                    {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                </Link>
            </div>
        </header>
    );
}
