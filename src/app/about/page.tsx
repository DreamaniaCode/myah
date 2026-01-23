import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSettings } from '@/app/actions/settings';
import styles from './page.module.css';

export default async function AboutPage() {
    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    return (
        <>
            <Header settingsPromise={settingsPromise} />

            <main className={styles.container}>
                <div className="container">
                    {/* Hero Section */}
                    <section className={styles.hero}>
                        <h1 className={styles.title}>من نحن</h1>
                        <p className={styles.subtitle}>
                            رحلتنا في تقديم أجود المنتجات الطبيعية
                        </p>
                    </section>

                    {/* Story Section */}
                    <section className={styles.section}>
                        <div className={styles.content}>
                            <h2 className={styles.sectionTitle}>قصتنا</h2>
                            <p className={styles.text}>
                                أعشاب MYAH هي علامة تجارية متخصصة في تقديم أجود أنواع العسل الطبيعي والأعشاب والزيوت العضوية.
                                نحن نؤمن بقوة الطبيعة وفوائدها الصحية، ونسعى لتقديم منتجات طبيعية 100% خالية من المواد الكيميائية والإضافات الصناعية.
                            </p>
                            <p className={styles.text}>
                                بدأت رحلتنا من شغفنا بالطب البديل والعلاج بالأعشاب الطبيعية. نحن نعمل مع مزارعين محليين ومناحل موثوقة
                                لضمان جودة منتجاتنا وأصالتها.
                            </p>
                        </div>
                    </section>

                    {/* Values Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>قيمنا</h2>
                        <div className={styles.valuesGrid}>
                            <div className={styles.valueCard}>
                                <div className={styles.icon}>🌿</div>
                                <h3>طبيعي 100%</h3>
                                <p>جميع منتجاتنا طبيعية وخالية من المواد الكيميائية</p>
                            </div>

                            <div className={styles.valueCard}>
                                <div className={styles.icon}>✨</div>
                                <h3>جودة عالية</h3>
                                <p>نختار أفضل المنتجات من مصادر موثوقة</p>
                            </div>

                            <div className={styles.valueCard}>
                                <div className={styles.icon}>🤝</div>
                                <h3>ثقة العملاء</h3>
                                <p>رضاكم هو أولويتنا القصوى</p>
                            </div>

                            <div className={styles.valueCard}>
                                <div className={styles.icon}>🚚</div>
                                <h3>توصيل سريع</h3>
                                <p>نوصل منتجاتنا لجميع المدن بسرعة وأمان</p>
                            </div>
                        </div>
                    </section>

                    {/* Products Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>منتجاتنا</h2>
                        <div className={styles.productsGrid}>
                            <div className={styles.productCategory}>
                                <div className={styles.categoryIcon}>🍯</div>
                                <h3>العسل الطبيعي</h3>
                                <p>عسل السدر، الكالبتوس، والزهور من أجود المناحل</p>
                            </div>

                            <div className={styles.productCategory}>
                                <div className={styles.categoryIcon}>🌿</div>
                                <h3>الأعشاب الطبية</h3>
                                <p>أعشاب طبيعية مجففة بعناية للعلاج والاسترخاء</p>
                            </div>

                            <div className={styles.productCategory}>
                                <div className={styles.categoryIcon}>🫒</div>
                                <h3>الزيوت الطبيعية</h3>
                                <p>زيت أركان، الزيتون، وزيوت عطرية نقية</p>
                            </div>
                        </div>
                    </section>

                    {/* Contact CTA */}
                    <section className={styles.ctaSection}>
                        <h2>هل لديك أسئلة؟</h2>
                        <p>نحن هنا لمساعدتك! تواصل معنا عبر واتساب</p>
                        <a
                            href={`https://wa.me/${settings.contactPhone.replace(/\D/g, '')}`}
                            className={styles.ctaButton}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            تواصل معنا الآن
                        </a>
                    </section>
                </div>
            </main>

            <Footer
                siteName={settings.siteName}
                contactPhone={settings.contactPhone}
                contactEmail={settings.contactEmail}
                contactAddress={settings.contactAddress}
            />
        </>
    );
}
