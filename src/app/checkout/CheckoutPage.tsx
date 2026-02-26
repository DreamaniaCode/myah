'use client';

import { useState, FormEvent } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './styles.module.css';
import InvoiceDownload from '@/components/InvoiceDownload';
import Image from 'next/image';

export default function CheckoutPage({ settings }: { settings: Record<string, unknown> }) {
    const { items, cartTotal, clearCart } = useCart();

    // Form and submission states
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<Record<string, unknown> | null>(null);
    const [city, setCity] = useState('');

    // Handle empty cart
    if (!loading && !submitted && items.length === 0) {
        return (
            <div className="container section-padding" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>سلة المشتريات فارغة</h2>
                <Link href="/products" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>تصفح المنتجات</Link>

            </div>
        );
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const payload = {
            customer: formData.get('name') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            city: formData.get('city') as string,
            paymentMethod: formData.get('paymentMethod') as string,
            total: cartTotal,
            items: JSON.stringify(items),
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'فشل في إنشاء الطلب');
            }

            // Success: Set order data for invoice and show success screen
            setOrderData({
                id: result.orderId,
                customer: payload.customer,
                phone: payload.phone,
                address: payload.address,
                city: payload.city,
                total: payload.total,
                items: items,
                status: 'pending',
                createdAt: new Date().toISOString(),
                paymentMethod: payload.paymentMethod
            });

            setSubmitted(true);
            clearCart();
        } catch (err) {
            console.error('Order submission error:', err);
            setError(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الطلب');
            alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    // Show Success Screen
    if (submitted && orderData) {
        return (
            <div className={styles.container} dir="rtl" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h1 style={{ marginBottom: '1rem', color: '#1a4d2e' }}>تم استلام طلبك بنجاح!</h1>
                <p style={{ marginBottom: '2rem', color: '#666' }}>شكراً لك على ثقتك. سنتواصل معك قريباً لتأكيد الطلب.</p>

                <div style={{ marginBottom: '2rem' }}>
                    <InvoiceDownload order={orderData} settings={settings} />
                </div>

                <div className={styles.paymentInfo} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem', maxWidth: '600px', margin: '0 auto', background: '#f9fafb' }}>
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem' }}>معلومات الدفع</h2>

                    {orderData.paymentMethod === 'bank_transfer' ? (
                        <div className={styles.method}>
                            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>🏦 التحويل البنكي</h3>
                            <p style={{ marginBottom: '0.5rem' }}><strong>البنك:</strong> {settings.bankName as string || 'التجاري وفا بنك'}</p>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}><strong>رقم الحساب:</strong> {settings.bankAccount as string || '1234 5678 9012 3456'}</p>
                        </div>
                    ) : orderData.paymentMethod === 'cod' ? (
                        <div className={styles.method}>
                            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>🚚 الدفع عند الاستلام</h3>
                            <p>سيقوم موزعنا بتسليمك الطلب في مراكش، والدفع عند الاستلام.</p>
                        </div>
                    ) : (
                        <div className={styles.method}>
                            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>💸 وكالات تحويل الأموال</h3>
                            <p><strong>Cash Plus / Wafacash:</strong> {settings.cashPlusInfo as string || 'الاسم: محمد فلان - رقم الهاتف: 0600000000'}</p>
                        </div>
                    )}

                    <p style={{ marginTop: '1.5rem', color: '#B45309', fontSize: '0.9rem', background: '#FFFBEB', padding: '0.75rem', borderRadius: '6px' }}>
                        يرجى إرسال إثبات الدفع (صورة الوصل) عبر الواتساب لتجهيز شحنتك فوراً.
                    </p>
                </div>{error && <p style={{ color: 'red' }}>{error}</p>}

                <Link href="/" className="btn-primary" style={{ marginTop: '3rem', display: 'inline-block' }}>العودة للرئيسية</Link>
            </div>
        );
    }

    // Main Layout (Split)
    return (
        <div className={styles.splitLayout}>
            {/* Left Column: Form */}
            <div className={styles.formSection} dir="rtl">
                <div className={styles.header}>
                    <h1>أعشاب MYAH</h1>
                    <nav aria-label="Breadcrumb">
                        <ol className={styles.breadcrumbs}>
                            <li><a href="/cart">سلة المشتريات</a></li>
                            <li><span>›</span></li>
                            <li><span aria-current="page">المعلومات والدفع</span></li>
                        </ol>
                    </nav>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <section className={styles.section}>
                        <h2>معلومات الاتصال</h2>
                        <div className={styles.field}>
                            <input type="text" name="name" placeholder="الاسم الكامل" required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <input type="tel" name="phone" placeholder="رقم الهاتف (للتواصل واتساب)" required className={styles.input} />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>عنوان التوصيل</h2>
                        <div className={styles.field}>
                            <input
                                type="text"
                                name="city"
                                placeholder="المدينة"
                                required
                                className={styles.input}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <textarea name="address" placeholder="العنوان بالتفصيل" rows={3} required className={styles.input} />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>طريقة الدفع</h2>
                        <div className={styles.paymentNote}>
                            ⚠️ <strong>تنبيه:</strong> الدفع مسبق لضمان جدية الطلب.
                        </div>
                        <div className={styles.paymentOptions}>
                            <label className={`${styles.paymentOption} ${styles.paymentSelected}`}>
                                <input type="radio" name="paymentMethod" value="bank_transfer" defaultChecked />
                                <span className={styles.radioLabel}>
                                    <span>🏦 تحويل بنكي (Bank Transfer)</span>
                                    <small>سيتم إرسال رقم الحساب بعد تأكيد الطلب</small>
                                </span>
                            </label>
                            <label className={styles.paymentOption}>
                                <input type="radio" name="paymentMethod" value="cashplus" />
                                <span className={styles.radioLabel}>
                                    <span>💸 وكالات تحويل (CashPlus / Wafacash)</span>
                                    <small>أسرع طريقة للدفع</small>
                                </span>
                            </label>
                            {(city.trim().toLowerCase() === 'marrakech' || city.trim() === 'مراكش') && (
                                <label className={styles.paymentOption}>
                                    <input type="radio" name="paymentMethod" value="cod" />
                                    <span className={styles.radioLabel}>
                                        <span>🚚 الدفع عند الاستلام (COD)</span>
                                        <small>متاح حصرياً في مراكش</small>
                                    </span>
                                </label>
                            )}
                        </div>
                    </section>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'جاري المعالجة...' : `إتمام الطلب - ${cartTotal} درهم`}
                    </button>

                    <a href="/cart" className={styles.backLink}>‹ العودة للسلة</a>
                </form>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className={styles.summarySection} dir="rtl">
                <div className={styles.summaryContent}>
                    <h2 className={styles.summaryTitle}>ملخص الطلب</h2>
                    <ul className={styles.itemList}>
                        {items.map((item) => (
                            <li key={item.id} className={styles.item}>
                                <div className={styles.itemImage}>
                                    <div className={styles.badge}>{item.quantity}</div>
                                    <Image src={item.image} alt={item.name} width={64} height={64} style={{ objectFit: 'cover' }} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <span className={styles.itemName}>{item.name}</span>
                                </div>
                                <div className={styles.itemPrice}>
                                    {(item.price * item.quantity).toFixed(2)} د.م
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.totalRow}>
                        <span>المجموع</span>
                        <span className={styles.totalPrice}>{cartTotal} د.م</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
