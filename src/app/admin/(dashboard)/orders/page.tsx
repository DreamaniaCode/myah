export const dynamic = 'force-dynamic';
import { getOrders, updateOrderStatus } from '@/app/actions';
import Link from 'next/link';
import { formatWhatsAppNumber } from '@/lib/whatsapp';
import styles from '../styles.module.css';

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return { bg: '#D1FAE5', color: '#065F46' };
            case 'shipped': return { bg: '#DBEAFE', color: '#1E40AF' };
            case 'cancelled': return { bg: '#FEE2E2', color: '#991B1B' };
            default: return { bg: '#FEF3C7', color: '#92400E' };
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'قيد الانتظار';
            case 'paid': return 'مدفوع';
            case 'shipped': return 'تم الشحن';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    };

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>إدارة الطلبات</h1>
                <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                    إجمالي الطلبات: {orders.length}
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>رقم الطلب</th>
                            <th>العميل</th>
                            <th>المنتجات</th>
                            <th>المجموع</th>
                            <th>الحالة</th>
                            <th>التاريخ</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const items = JSON.parse(order.items);
                            const statusStyle = getStatusColor(order.status);

                            return (
                                <tr key={order.id}>
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        <Link href={`/admin/orders/${order.id}`} style={{ color: '#2563EB', textDecoration: 'underline' }}>
                                            {order.id.slice(0, 8)}...
                                        </Link>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{order.customer}</div>
                                        <div style={{ fontSize: '0.85rem' }}>
                                            <a
                                                href={`https://wa.me/${formatWhatsAppNumber(order.phone)}?text=${encodeURIComponent(`السلام عليكم ${order.customer}، نتواصل معكم من أعشاب MYAH بخصوص طلبكم #${order.id.slice(0, 8)}.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#059669', textDecoration: 'none', fontWeight: 600 }}
                                                title="مراسلة العميل عبر واتساب"
                                            >
                                                💬 {order.phone}
                                            </a>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{order.address}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem' }}>
                                            {items.map((item: { name: string }, idx: number) => (
                                                <div key={idx} style={{ marginBottom: '0.25rem' }}>
                                                    • {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 700, color: '#F59E0B' }}>
                                        {order.total} درهم
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '6px',
                                            backgroundColor: statusStyle.bg,
                                            color: statusStyle.color,
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            display: 'inline-block'
                                        }}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '0.85rem', color: '#6B7280' }} suppressHydrationWarning>
                                        {new Date(order.createdAt).toLocaleDateString('ar-MA')}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <a
                                                href={`https://wa.me/${formatWhatsAppNumber(order.phone)}?text=${encodeURIComponent(`السلام عليكم ${order.customer}، نتواصل معكم من أعشاب MYAH بخصوص طلبكم #${order.id.slice(0, 8)}.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.btn}
                                                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem', background: '#25D366', color: 'white', textDecoration: 'none' }}
                                                title="مراسلة عبر واتساب"
                                            >
                                                💬 واتساب
                                            </a>
                                            {order.status === 'pending' && (
                                                <form action={updateOrderStatus.bind(null, order.id, 'paid')} style={{ display: 'inline' }}>
                                                    <button className={`${styles.btn} ${styles.primary}`} style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}>
                                                        ✓ تأكيد الدفع
                                                    </button>
                                                </form>
                                            )}
                                            {order.status === 'paid' && (
                                                <form action={updateOrderStatus.bind(null, order.id, 'shipped')} style={{ display: 'inline' }}>
                                                    <button className={`${styles.btn}`} style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem', background: '#3B82F6', color: 'white' }}>
                                                        📦 تم الشحن
                                                    </button>
                                                </form>
                                            )}
                                            {(order.status === 'pending' || order.status === 'paid') && (
                                                <form action={updateOrderStatus.bind(null, order.id, 'cancelled')} style={{ display: 'inline' }}>
                                                    <button className={`${styles.btn} ${styles.danger}`} style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}>
                                                        ✕ إلغاء
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
