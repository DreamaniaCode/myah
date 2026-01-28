import { getSettings, updateSettings } from '@/app/actions/settings';

export const dynamic = 'force-dynamic';

import styles from '../styles.module.css';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>إعدادات الموقع</h1>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '800px' }}>
                <form action={updateSettings} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Site Identity */}
                    <section>
                        <h2 style={{ marginBottom: '1rem', color: '#1F2937' }}>🏷️ هوية الموقع</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>اسم الموقع</label>
                                <input
                                    name="siteName"
                                    defaultValue={settings.siteName}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>رابط الشعار (Logo URL)</label>
                                <input
                                    name="logoUrl"
                                    defaultValue={settings.logoUrl}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section>
                        <h2 style={{ marginBottom: '1rem', color: '#1F2937' }}>🖼️ القسم الرئيسي (Hero)</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>العنوان الرئيسي</label>
                                <input
                                    name="heroTitle"
                                    defaultValue={settings.heroTitle}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>العنوان الفرعي</label>
                                <input
                                    name="heroSubtitle"
                                    defaultValue={settings.heroSubtitle}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>رابط صورة الخلفية</label>
                                <input
                                    name="heroImage"
                                    defaultValue={settings.heroImage}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section>
                        <h2 style={{ marginBottom: '1rem', color: '#1F2937' }}>📞 معلومات التواصل</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>رقم الهاتف</label>
                                <input
                                    name="contactPhone"
                                    defaultValue={settings.contactPhone}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>البريد الإلكتروني</label>
                                <input
                                    name="contactEmail"
                                    defaultValue={settings.contactEmail}
                                    type="email"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>العنوان</label>
                                <input
                                    name="contactAddress"
                                    defaultValue={settings.contactAddress}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section>
                        <h2 style={{ marginBottom: '1rem', color: '#1F2937' }}>💳 طرق الدفع</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>اسم البنك</label>
                                <input
                                    name="bankName"
                                    defaultValue={settings.bankName}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>رقم الحساب البنكي</label>
                                <input
                                    name="bankAccount"
                                    defaultValue={settings.bankAccount}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>معلومات Cash Plus / Wafacash</label>
                                <textarea
                                    name="cashPlusInfo"
                                    defaultValue={settings.cashPlusInfo}
                                    rows={3}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* SEO & Scripts */}
                    <section>
                        <h2 style={{ marginBottom: '1rem', color: '#1F2937' }}>🔍 تحسين محركات البحث (SEO)</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>عنوان الصفحة (Meta Title)</label>
                                <input
                                    name="metaTitle"
                                    defaultValue={settings.metaTitle || "أعشاب MYAH"}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>وصف الصفحة (Meta Description)</label>
                                <textarea
                                    name="metaDescription"
                                    defaultValue={settings.metaDescription || "متجر أعشاب طبيعية وزيوت أصلية وعسل حر في المغرب"}
                                    rows={3}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Scripts & Analytics */}
                    <section>
                        <h2 style={{ marginBottom: '1rem', color: '#1F2937' }}>📊 أكواد التتبع (Scripts)</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>أكواد الرأس (Head Scripts)</label>
                                <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                    مثل: Google Analytics, Facebook Pixel. سيتم وضعها داخل {`<head>`}.
                                </p>
                                <textarea
                                    name="headScripts"
                                    defaultValue={settings.headScripts || ""}
                                    rows={5}
                                    placeholder="<!-- Paste your scripts here -->"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontFamily: 'monospace', direction: 'ltr', textAlign: 'left' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>أكواد الجسم (Body Scripts)</label>
                                <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                    سيتم وضعها في بداية {`<body>`}.
                                </p>
                                <textarea
                                    name="bodyScripts"
                                    defaultValue={settings.bodyScripts || ""}
                                    rows={5}
                                    placeholder="<!-- Paste your scripts here -->"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontFamily: 'monospace', direction: 'ltr', textAlign: 'left' }}
                                />
                            </div>
                        </div>
                    </section>

                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.primary}`}
                        style={{ padding: '1rem', fontSize: '1.1rem' }}
                    >
                        💾 حفظ التغييرات
                    </button>
                </form>
            </div>
        </div>
    );
}
