'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { cartTotal, clearCart } = useCart();
    const [issubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send data to server here
        setIsSubmitted(true);
        clearCart();
    };

    return (
        <main>
            <Header />
            <div className={styles.container}>
                {!issubmitted ? (
                    <>
                        <h1 className={styles.title}>إتمام الطلب</h1>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>الاسم الكامل</label>
                                <input type="text" id="name" required className={styles.input} placeholder="الاسم واللقب" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>رقم الهاتف</label>
                                <input type="tel" id="phone" required className={styles.input} placeholder="06XXXXXXXX" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="address" className={styles.label}>العنوان</label>
                                <textarea id="address" required className={styles.input} rows={3} placeholder="عنوان التوصيل (المدينة، الحي...)" />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>طريقة الدفع</label>
                                <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    سيتواصل معك فريقنا لتأكيد الدفع عبر التحويل البنكي أو كاش بلس.
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                                المبلغ الإجمالي: <span style={{ color: 'var(--primary-color)' }}>{cartTotal} درهم</span>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                تأكيد الطلب
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles.success}>
                        <span className={styles.successIcon}>✓</span>
                        <h2>تم استلام طلبك بنجاح!</h2>
                        <p style={{ color: '#666', marginTop: '0.5rem' }}>شكراً لثقتكم في أعشاب MYAH.</p>

                        <div className={styles.instructions}>
                            <h3>معلومات الدفع</h3>
                            <p>المرجو تحويل المبلغ ({cartTotal} درهم) إلى أحد الحسابات التالية:</p>

                            <ul className={styles.bankDetails}>
                                <li>البنك الشعبي (CIH): <span dir="ltr" style={{ fontFamily: 'monospace' }}>230 330 3456789012345678 01</span></li>
                                <li>كاش بلس / وافاكاش: <span style={{ fontWeight: 'bold' }}>MYAH Herbs SARL</span></li>
                            </ul>

                            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                                * سيتم التواصل معكم عبر الهاتف لتأكيد عملية الدفع والشحن.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => window.location.href = '/'}
                        >
                            العودة للرئيسية
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
