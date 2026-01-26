'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';
import { use, useState } from 'react';

export default function Header({ settingsPromise }: { settingsPromise: Promise<any> }) {
    const { cartCount } = useCart();
    const settings = use(settingsPromise);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <button
                    className={styles.hamburgerBtn}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
                </button>

                <Link href="/" className={styles.logoWrapper} onClick={closeMenu}>
                    <Image
                        src={settings.logoUrl}
                        alt={settings.siteName}
                        width={120}
                        height={60}
                        style={{ width: 'auto', height: '60px' }}
                        priority
                    />
                </Link>

                <div className={`${styles.menuOverlay} ${isMenuOpen ? styles.show : ''}`} onClick={closeMenu}></div>

                <ul className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
                    <button className={styles.closeBtn} onClick={closeMenu}>&times;</button>
                    <li><Link href="/" className={styles.link} onClick={closeMenu}>الرئيسية</Link></li>
                    <li><Link href="/products" className={styles.link} onClick={closeMenu}>المنتجات</Link></li>
                    <li><Link href="/blog" className={styles.link} onClick={closeMenu}>المدونة</Link></li>
                    <li><Link href="/about" className={styles.link} onClick={closeMenu}>من نحن</Link></li>
                    <li><Link href="/contact" className={styles.link} onClick={closeMenu}>اتصل بنا</Link></li>
                </ul>

                <Link href="/cart" className={styles.cartBtn} aria-label="Cart" onClick={closeMenu}>
                    🛒
                    {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                </Link>
            </div>
        </header >
    );
}
