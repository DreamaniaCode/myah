import styles from './styles.module.css';

// Ideally this would be dynamic, but for now we list our growing collection
const images = [
    { src: '/images/sidr_honey_bottle.png', alt: 'عسل السدر الملكي' },
    { src: '/images/eucalyptus_honey_jar.png', alt: 'عسل الكالبتوس' },
    { src: '/images/argan_oil_bottle.png', alt: 'زيت أركان' },
    { src: '/images/herbal_tea_mix.png', alt: 'خلطة أعشاب' },
    { src: '/images/hero_background_1769122439980.png', alt: 'الطبيعة' },
    { src: '/images/argan_oil_1769122501146.png', alt: 'زيت أركان خام' },
];

export default function GalleryPage() {
    return (
        <div className={styles.container} dir="rtl">
            <h1 className={styles.title}>معرض الصور</h1>
            <p className={styles.subtitle}>لمحات من منتجاتنا وطبيعة عملنا</p>

            <div className={styles.grid}>
                {images.map((img, idx) => (
                    <div key={idx} className={styles.card}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} className={styles.image} />
                        <div className={styles.caption}>{img.alt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
