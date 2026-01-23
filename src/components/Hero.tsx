import { getSettings } from '@/app/actions/settings';
import styles from './Hero.module.css';

export default async function Hero() {
    const settings = await getSettings();

    return (
        <section className={styles.hero} style={{ backgroundImage: `url(${settings.heroImage})` }}>
            <div className={styles.content}>
                <h1 className={styles.title}>{settings.heroTitle}</h1>
                <p className={styles.subtitle}>{settings.heroSubtitle}</p>
                <div className={styles.actions}>
                    <a href="#products" className="btn btn-primary">تصفح المنتجات</a>
                    <a href="/about" className="btn btn-secondary">اقرأ عنا</a>
                </div>
            </div>
        </section>
    );
}
