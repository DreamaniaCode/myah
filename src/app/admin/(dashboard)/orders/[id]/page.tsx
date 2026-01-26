import { getOrder, updateOrderStatus, updateOrderDetails } from '@/app/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles.module.css';
import InvoiceDownload from '@/components/InvoiceDownload';
import TrackingDownload from '@/components/TrackingDownload';

// Mock settings for invoice - ideally fetch these
const invoiceSettings = {
    siteName: 'أعشاب MYAH',
    contactAddress: 'الدار البيضاء، المغرب',
    contactEmail: 'info@herbsmyah.com',
    bankName: 'CIH Bank',
    bankAccount: '1234567890123456',
    cashPlusInfo: 'اسم المستفيد: محمد فلان | رقم الهاتف: 0600000000'
};

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) {
        notFound();
    }

    const items = JSON.parse(order.items);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return { bg: '#D1FAE5', color: '#065F46' };
            case 'shipped': return { bg: '#DBEAFE', color: '#1E40AF' };
            case 'cancelled': return { bg: '#FEE2E2', color: '#991B1B' };
            default: return { bg: '#FEF3C7', color: '#92400E' };
        }
    };

    const statusStyle = getStatusColor(order.status);

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/orders" className={styles.backLink}>← عودة</Link>
                    <h1 className={styles.title}>تفاصيل الطلب</h1>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6B7280', fontFamily: 'monospace' }}>
                    #{order.id}
                </div>
            </div>

            <div className={styles.tableContainer} style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                    {/* Main Details */}
                    <div>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>معلومات العميل</h2>
                            <div style={{ background: '#F9FAFB', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ marginBottom: '0.5rem' }}><strong>الاسم:</strong> {order.customer}</div>
                                <div style={{ marginBottom: '0.5rem' }}><strong>الهاتف:</strong> {order.phone}</div>
                                <div><strong>العنوان:</strong> {order.address}</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>المنتجات</h2>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>المنتج</th>
                                        <th>السعر</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: any, idx: number) => (
                                        <tr key={idx}>
                                            <td>{item.name}</td>
                                            <td>{item.price} درهم</td>
                                        </tr>
                                    ))}
                                    <tr style={{ background: '#F3F4F6', fontWeight: 'bold' }}>
                                        <td>المجموع</td>
                                        <td>{order.total} درهم</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Admin Notes & Tracking */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>إدارة الطلب</h2>
                            <form action={updateOrderDetails.bind(null, order.id)} style={{ background: '#F9FAFB', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>ملاحظات المسؤول</label>
                                    <textarea
                                        name="notes"
                                        defaultValue={order.notes}
                                        rows={3}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                                        placeholder="أضف ملاحظات خاصة بهذا الطلب..."
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>كود التتبع (لطلبات الشحن)</label>
                                    <input
                                        type="text"
                                        name="trackingCode"
                                        defaultValue={order.trackingCode || ''}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                                        placeholder="أدخل رقم التتبع..."
                                    />
                                </div>
                                <button type="submit" className={`${styles.btn} ${styles.primary}`} style={{ width: '100%' }}>
                                    حفظ التغييرات
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>حالة الطلب</h3>
                            <div style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.color,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem'
                            }}>
                                {order.status === 'pending' ? 'قيد الانتظار' :
                                    order.status === 'paid' ? 'مدفوع' :
                                        order.status === 'shipped' ? 'تم الشحن' : 'ملغي'}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {order.status === 'pending' && (
                                    <form action={updateOrderStatus.bind(null, order.id, 'paid')}>
                                        <button className={`${styles.btn} ${styles.primary}`} style={{ width: '100%' }}>✓ تأكيد الدفع</button>
                                    </form>
                                )}
                                {order.status === 'paid' && (
                                    <form action={updateOrderStatus.bind(null, order.id, 'shipped')}>
                                        <button className={`${styles.btn}`} style={{ width: '100%', background: '#3B82F6', color: 'white' }}>📦 تم الشحن</button>
                                    </form>
                                )}
                                {(order.status === 'pending' || order.status === 'paid') && (
                                    <form action={updateOrderStatus.bind(null, order.id, 'cancelled')}>
                                        <button className={`${styles.btn} ${styles.danger}`} style={{ width: '100%' }}>✕ إلغاء الطلب</button>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>المستندات</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <InvoiceDownload order={order} settings={invoiceSettings} />

                                {order.trackingCode && (
                                    <TrackingDownload order={order} trackingCode={order.trackingCode} />
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
