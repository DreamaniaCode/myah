'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage({ settings }: { settings: any }) {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const orderData = {
            customer: formData.get('name') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            total: cartTotal,
            items: JSON.stringify(items),
        };

        console.log('Submitting order:', orderData);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            console.log('Order response:', result);

            if (!response.ok) {
                throw new Error(result.error || 'فشل في إنشاء الطلب');
            }

            setSubmitted(true);
            clearCart();
        } catch (err) {
            console.error('Order submission error:', err);
            setError(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className={styles.container}>
                <div className={styles.success}>
                    <div className={styles.icon}>✅</div>
                    <h1>تم استلام طلبك بنجاح!</h1>
                    <p>شكراً لك على ثقتك. سنتواصل معك قريباً لتأكيد الطلب.</p>

                    <div className={styles.paymentInfo}>
                        <h2>معلومات الدفع</h2>
                        <div className={styles.method}>
                            <h3>🏦 التحويل البنكي</h3>
                            <p><strong>البنك:</strong> {settings.bankName}</p>
                            <p><strong>رقم الحساب:</strong> {settings.bankAccount}</p>
                        </div>
                        <div className={styles.method}>
                            <h3>💰 Cash Plus / Wafacash</h3>
                            <p>{settings.cashPlusInfo}</p>
                        </div>
                        <p className={styles.note}>
                            يرجى إرسال إثبات الدفع عبر الواتساب أو البريد الإلكتروني.
                        </p>
                    </div>

                    <button onClick={() => router.push('/')} className={styles.homeBtn}>
                        العودة للرئيسية
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>إتمام الطلب</h1>

            <div className={styles.summary}>
                <h2>ملخص الطلب</h2>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <span>{item.name}</span>
                        <span>{item.price} درهم</span>
                    </div>
                ))}
                <div className={styles.total}>
                    <strong>المجموع:</strong>
                    <strong>{cartTotal} درهم</strong>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>معلومات التوصيل</h2>

                {error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <div className={styles.field}>
                    <label htmlFor="name">الاسم الكامل</label>
                    <input type="text" id="name" name="name" required disabled={loading} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input type="tel" id="phone" name="phone" required disabled={loading} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="address">العنوان الكامل</label>
                    <textarea id="address" name="address" rows={3} required disabled={loading} />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'جاري الإرسال...' : 'تأكيد الطلب'}
                </button>
            </form>
        </div>
    );
}
