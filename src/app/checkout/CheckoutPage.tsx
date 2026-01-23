'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage({ settings }: { settings: any }) {
    const { cart, total, clearCart } = useCart();
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const orderData = {
            customer: formData.get('name') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            total,
            items: JSON.stringify(cart),
        };

        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        setSubmitted(true);
        clearCart();
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
                {cart.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <span>{item.name}</span>
                        <span>{item.price} درهم</span>
                    </div>
                ))}
                <div className={styles.total}>
                    <strong>المجموع:</strong>
                    <strong>{total} درهم</strong>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>معلومات التوصيل</h2>

                <div className={styles.field}>
                    <label htmlFor="name">الاسم الكامل</label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div className={styles.field}>
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input type="tel" id="phone" name="phone" required />
                </div>

                <div className={styles.field}>
                    <label htmlFor="address">العنوان الكامل</label>
                    <textarea id="address" name="address" rows={3} required />
                </div>

                <button type="submit" className={styles.submitBtn}>
                    تأكيد الطلب
                </button>
            </form>
        </div>
    );
}
