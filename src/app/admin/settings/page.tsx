import { getSettings, updateSettings } from '@/app/actions/settings';
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
