'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { createWhatsAppOrderUrl, formatWhatsAppNumber, DEFAULT_MANAGER_PHONE } from '@/lib/whatsapp';

interface QuickOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    quantity: number;
    managerPhone?: string;
}

export default function QuickOrderModal({
    isOpen,
    onClose,
    product,
    quantity,
    managerPhone = DEFAULT_MANAGER_PHONE
}: QuickOrderModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderSuccess, setOrderSuccess] = useState<{ id: string; whatsappUrl: string } | null>(null);

    if (!isOpen) return null;

    const totalPrice = product.price * quantity;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const items = [
            {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image
            }
        ];

        const fullAddress = city && !address.includes(city) ? `${address} - ${city}` : address;

        const payload = {
            customer: name,
            phone: phone,
            city: city,
            address: fullAddress,
            total: totalPrice,
            paymentMethod: paymentMethod,
            items: JSON.stringify(items)
        };

        try {
            // 1. Create order on the site database
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'فشل في تسجيل الطلب');
            }

            // 2. Generate WhatsApp URL with all order info
            const orderDetails = {
                id: result.orderId,
                customer: name,
                phone: phone,
                city: city,
                address: fullAddress,
                total: totalPrice,
                paymentMethod: paymentMethod,
                items: items,
                createdAt: new Date().toISOString()
            };

            const whatsappUrl = createWhatsAppOrderUrl(orderDetails, managerPhone);

            setOrderSuccess({
                id: result.orderId,
                whatsappUrl: whatsappUrl
            });

            // 3. Open WhatsApp in new tab
            try {
                window.open(whatsappUrl, '_blank');
            } catch (popupErr) {
                console.warn('Popup blocked:', popupErr);
            }
        } catch (err) {
            console.error('Quick order error:', err);
            setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تسجيل الطلب');
        } finally {
            setLoading(false);
        }
    };

    // Inquiry-only WhatsApp URL (without placing order)
    const directInquiryUrl = `https://wa.me/${formatWhatsAppNumber(managerPhone)}?text=${encodeURIComponent(
        `السلام عليكم، أود الاستفسار عن منتج: ${product.name} (السعر: ${product.price} درهم).`
    )}`;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            backdropFilter: 'blur(3px)'
        }} onClick={onClose}>
            <div
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    maxWidth: '520px',
                    width: '100%',
                    maxHeight: '92vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    padding: '1.75rem',
                    position: 'relative'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="إغلاق"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: '#F3F4F6',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: '#6B7280'
                    }}
                >
                    ✕
                </button>

                {orderSuccess ? (
                    /* Success view */
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>✅</div>
                        <h2 style={{ color: '#065F46', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                            تم تسجيل طلبك بنجاح في الموقع!
                        </h2>
                        <p style={{ color: '#4B5563', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            رقم الطلب: <strong style={{ color: '#111827' }}>#{orderSuccess.id.slice(0, 8)}</strong>
                        </p>

                        <div style={{
                            background: '#ECFDF5',
                            border: '1px solid #10B981',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            marginBottom: '1.5rem'
                        }}>
                            <p style={{ color: '#065F46', fontWeight: 600, marginBottom: '0.75rem' }}>
                                تم إرسال الطلب، ويُرجى الضغط أدناه لفتح محادثة واتساب مع المسؤول لتأكيد طلبك فوراً:
                            </p>
                            <a
                                href={orderSuccess.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: '#25D366',
                                    color: 'white',
                                    fontWeight: 700,
                                    padding: '0.85rem 1.5rem',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                            >
                                📲 فتح واتساب لتأكيد الطلب
                            </a>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                background: '#F3F4F6',
                                color: '#374151',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            إغلاق
                        </button>
                    </div>
                ) : (
                    /* Order Form */
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#ECFDF5',
                                color: '#065F46',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem'
                            }}>
                                <span>💬</span> طلب سريع ومباشر عبر واتساب
                            </div>
                            <h2 style={{ fontSize: '1.35rem', color: '#1F2937', margin: 0 }}>
                                إتمام الطلب وإرساله لواتساب
                            </h2>
                            <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                سيتم تسجيل طلبك في الموقع وتحويلك لواتساب للتأكيد الفوري
                            </p>
                        </div>

                        {/* Product Summary Box */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: '#F9FAFB',
                            padding: '0.85rem',
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            marginBottom: '1.25rem'
                        }}>
                            <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {product.name}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                                    الكمية: <strong>{quantity}</strong> × {product.price} د.م
                                </div>
                            </div>
                            <div style={{ fontWeight: 700, color: '#059669', fontSize: '1.1rem', flexShrink: 0 }}>
                                {totalPrice.toFixed(2)} د.م
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                background: '#FEE2E2',
                                border: '1px solid #EF4444',
                                color: '#991B1B',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                fontSize: '0.85rem'
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                                    الاسم الكامل *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="مثال: يوسف الإدريسي"
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 0.85rem',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '0.95rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                                    رقم الهاتف (واتساب للتواصل) *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="مثال: 0612345678"
                                    dir="ltr"
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 0.85rem',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '0.95rem',
                                        textAlign: 'right',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                                        المدينة *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="مثال: الدار البيضاء"
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.85rem',
                                            borderRadius: '8px',
                                            border: '1px solid #D1D5DB',
                                            fontSize: '0.95rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                                        طريقة الدفع
                                    </label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.85rem',
                                            borderRadius: '8px',
                                            border: '1px solid #D1D5DB',
                                            fontSize: '0.9rem',
                                            background: 'white',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <option value="cod">الدفع عند الاستلام (COD)</option>
                                        <option value="bank_transfer">تحويل بنكي</option>
                                        <option value="cashplus">CashPlus / Wafacash</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                                    العنوان بالتفصيل *
                                </label>
                                <textarea
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="الحي، رقم المنزل، اسم الشارع..."
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 0.85rem',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '0.95rem',
                                        resize: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    background: loading ? '#9CA3AF' : '#1A4D2E',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '0.9rem',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(26, 77, 46, 0.3)'
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                {loading ? 'جاري تسجيل الطلب...' : `تأكيد الطلب (${totalPrice.toFixed(2)} د.م) وإرساله لواتساب`}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                                <a
                                    href={directInquiryUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: '0.85rem',
                                        color: '#059669',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    💬 أو تواصل معنا للاستفسار فقط عبر واتساب دون طلب
                                </a>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
