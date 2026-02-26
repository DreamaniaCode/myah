'use client';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import styles from './InvoiceDownload.module.css';

interface InvoiceProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settings: any;
}

export default function InvoiceDownload({ order, settings }: InvoiceProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        if (!invoiceRef.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2, // Higher resolution
                useCORS: true, // Allow loading images from external URLs
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice-${order.id.slice(0, 8)}.pdf`);
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('فشل إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsGenerating(false);
        }
    };

    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
    const paymentLabel = order.paymentMethod === 'bank_transfer' ? 'تحويل بنكي' : 'الدفع عند الاستلام';

    return (
        <div>
            <button onClick={generatePDF} className={styles.downloadBtn} disabled={isGenerating}>
                {isGenerating ? 'جاري التحميل...' : '📄 تحميل الفاتورة (Invoice)'}
            </button>

            {/* Hidden Invoice Template - Visible only to html2canvas via absolute positioning off-screen */}
            <div style={{ position: 'absolute', top: -9999, left: -9999 }}>
                <div ref={invoiceRef} style={{
                    width: '210mm',
                    minHeight: '297mm',
                    background: 'white',
                    padding: '20mm',
                    color: '#000',
                    fontFamily: 'sans-serif',
                    direction: 'rtl'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                        <div>
                            {settings.logoUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={settings.logoUrl} alt="Logo" style={{ height: '60px', objectFit: 'contain' }} />
                            )}
                            <h2 style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', color: '#111' }}>{settings.siteName}</h2>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h1 style={{ fontSize: '2rem', color: '#2c3e50', margin: 0 }}>فـاتـورة</h1>
                            <p style={{ margin: 0, color: '#666' }}>#{order.id.slice(0, 8)}</p>
                            <p style={{ margin: 0, color: '#666' }}>{new Date(order.createdAt).toLocaleDateString('ar-MA')}</p>
                        </div>
                    </div>

                    {/* Info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                        <div style={{ width: '45%' }}>
                            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>بيانات العميل</h3>
                            <p><strong>الاسم:</strong> {order.customer}</p>
                            <p><strong>الهاتف:</strong> {order.phone}</p>
                            <p><strong>العنوان:</strong> {order.address}</p>
                        </div>
                        <div style={{ width: '45%' }}>
                            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>تفاصيل الدفع</h3>
                            <p><strong>طريقة الدفع:</strong> {paymentLabel}</p>
                            <p><strong>الحالة:</strong> {order.status === 'paid' ? 'مدفوع' : order.status === 'pending' ? 'قيد الانتظار' : order.status}</p>
                        </div>
                    </div>

                    {/* Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                        <thead>
                            <tr style={{ background: '#f3f4f6', color: '#374151' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'right', border: '1px solid #e5e7eb' }}>المنتج</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>السعر</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: { name: string; price: number }, idx: number) => (
                                <tr key={idx}>
                                    <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{item.name}</td>
                                    <td style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>{item.price} درهم</td>
                                </tr>
                            ))}
                            <tr style={{ fontWeight: 'bold', background: '#f9fafb' }}>
                                <td style={{ padding: '0.75rem', textAlign: 'right', border: '1px solid #e5e7eb' }}>المجموع</td>
                                <td style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb', color: '#059669' }}>{order.total} درهم</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Footer */}
                    <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                        <p>{settings.contactAddress} | {settings.contactEmail} | {settings.contactPhone}</p>
                        <p>شكراً لتعاملكم معنا!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
