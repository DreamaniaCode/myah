import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.blob1}></div>
            <div className={styles.blob2}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    اكتشف سر الطبيعة مع <span style={{ color: 'var(--primary-color)' }}>أعشاب MYAH</span>
                </h1>
                <p className={styles.subtitle}>
                    نقدم لكم أجود أنواع العسل الطبيعي والأعشاب الطبية، مستخلصة من قلب الطبيعة لتعزيز صحتكم وجمالكم.
                </p>
                <div className={styles.actions}>
                    <Link href="/products" className="btn btn-primary">
                        تصفح المنتجات
                    </Link>
                    <Link href="/about" className="btn btn-secondary">
                        اقرأ عنّا
                    </Link>
                </div>
            </div>
        </section>
    );
}
