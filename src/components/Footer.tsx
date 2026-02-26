'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { useEffect, useState } from 'react';

interface FooterProps {
    siteName?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
}

export default function Footer({
    siteName = 'أعشاب MYAH',
    contactPhone = '',
    contactEmail = '',
    contactAddress = ''
}: FooterProps) {
    const [year, setYear] = useState<number | string>('...');

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <div className={styles.logoContainer}>
                            <Image
                                src="/images/logo.png"
                                alt={siteName}
                                width={150}
                                height={150}
                                className={styles.logo}
                                priority
                            />
                        </div>
                        <h3>{siteName}</h3>
                        <p>
                            نحيي تراث الأجداد بتقديم أجود أنواع العسل والأعشاب الطبيعية.
                            منتجاتنا عضوية 100% ومختارة بعناية لضمان صحتكم وسلامتكم.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3>روابط سريعة</h3>
                        <ul className={styles.links}>
                            <li><Link href="/">الرئيسية</Link></li>
                            <li><Link href="/products">جميع المنتجات</Link></li>
                            <li><Link href="/about">من نحن</Link></li>
                            <li><Link href="/contact">اتصل بنا</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>تواصل معنا</h3>
                        <ul className={styles.links}>
                            {contactPhone && <li>الهاتف: {contactPhone}</li>}
                            {contactEmail && <li>البريد: {contactEmail}</li>}
                            {contactAddress && <li>العنوان: {contactAddress}</li>}
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {year} {siteName}. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
