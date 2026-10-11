'use client';

import { useState, FormEvent } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './styles.module.css';
import InvoiceDownload from '@/components/InvoiceDownload';
import Image from 'next/image';

import { createWhatsAppOrderUrl, OrderWhatsAppDetails } from '@/lib/whatsapp';

export default function CheckoutPage({ settings }: { settings: Record<string, unknown> }) {
    const { items, cartTotal, clearCart, removeFromCart } = useCart();

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

            const fullAddress = payload.city && !payload.address.includes(payload.city)
                ? `${payload.address} - ${payload.city}`
                : payload.address;

            // Success: Set order data for invoice and show success screen
            const newOrderData: OrderWhatsAppDetails = {
                id: result.orderId,
                customer: payload.customer,
                phone: payload.phone,
                address: fullAddress,
                city: payload.city,
                total: payload.total,
                items: items,
                status: 'pending',
                createdAt: new Date().toISOString(),
                paymentMethod: payload.paymentMethod
            };

            setOrderData(newOrderData as unknown as Record<string, unknown>);
            setSubmitted(true);
            clearCart();

            // Automatically open WhatsApp to send order details to the manager (0608933695)
            const whatsappUrl = createWhatsAppOrderUrl(newOrderData, settings?.contactPhone as string);
            try {
                window.open(whatsappUrl, '_blank');
            } catch (popupErr) {
                console.warn('Popup blocked:', popupErr);
            }
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
        const whatsappUrl = createWhatsAppOrderUrl(orderData as unknown as OrderWhatsAppDetails, settings?.contactPhone as string);

        return (
            <div className={styles.container} dir="rtl" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h1 style={{ marginBottom: '1rem', color: '#1a4d2e' }}>تم استلام طلبك بنجاح!</h1>
                <p style={{ marginBottom: '2rem', color: '#666' }}>شكراً لك على ثقتك. تم تسجيل طلبك في الموقع برقم: <strong>#{((orderData.id as string) || '').slice(0, 8)}</strong></p>

                {/* WhatsApp Order Notification to Manager */}
                <div style={{
                    background: '#ECFDF5',
                    border: '2px solid #10B981',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem auto',
                    boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.1)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📲</div>
                    <h2 style={{ color: '#065F46', fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                        إرسال الطلب عبر واتساب للمسؤول
                    </h2>
                    <p style={{ color: '#047857', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                        تم تسجيل الطلب في الموقع بنجاح! لتأكيد الطلب وبدء التجهيز الفوري، يُرجى الضغط على الزر أدناه لإرسال كامل تفاصيل طلبك مباشرة إلى واتساب المسؤول:
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            background: '#25D366',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
                            width: '100%',
                            boxSizing: 'border-box',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        فتح واتساب لتأكيد الطلب مع المسؤول (0608933695)
                    </a>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <InvoiceDownload order={orderData} settings={settings} />
                </div>

                <div className={styles.paymentInfo} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem', maxWidth: '600px', margin: '0 auto', background: '#f9fafb' }}>
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem' }}>معلومات الدفع</h2>

                    {orderData.paymentMethod === 'bank_transfer' ? (
                        <div className={styles.method}>
                            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>🏦 التحويل البنكي</h3>
                            <p style={{ marginBottom: '0.5rem' }}><strong>البنك:</strong> {settings.bankName as string || 'ATTIJARIWAFABANK'}</p>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}><strong>رقم الحساب:</strong> {settings.bankAccount as string || '007 450 0006119000000547 10'}</p>
                        </div>
                    ) : orderData.paymentMethod === 'cod' ? (
                        <div className={styles.method}>
                            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>🚚 الدفع عند الاستلام</h3>
                            <p>سيقوم موزعنا بتسليمك الطلب والدفع عند الاستلام.</p>
                        </div>
                    ) : (
                        <div className={styles.method}>
                            <h3 style={{ color: '#059669', marginBottom: '1rem' }}>💸 وكالات تحويل الأموال</h3>
                            <p><strong>Cash Plus / Wafacash:</strong> {settings.cashPlusInfo as string || 'الاسم: شركة MYAHHEALTY SARL - رقم الهاتف: 0608933695'}</p>
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
                                <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className={styles.deleteBtn}
                                    title="حذف هذا المنتج من السلة"
                                    aria-label={`حذف ${item.name}`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
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
