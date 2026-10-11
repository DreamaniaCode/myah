/**
 * Centralized WhatsApp utilities for Myah e-commerce store
 * Manager WhatsApp: 0608933695 (+212608933695)
 */

export const DEFAULT_MANAGER_PHONE = '0608933695';
export const DEFAULT_MANAGER_WHATSAPP = '212608933695';

/**
 * Format any Moroccan or international phone number into standard international format for WhatsApp wa.me
 * Example: '0608933695' -> '212608933695'
 * Example: '00212608933695' -> '212608933695'
 * Example: '+212 608-933695' -> '212608933695'
 */
export function formatWhatsAppNumber(phone?: string | null): string {
    if (!phone) return DEFAULT_MANAGER_WHATSAPP;
    const digits = phone.replace(/\D/g, '');

    if (digits.startsWith('00212')) {
        return digits.slice(2);
    }
    if (digits.startsWith('212')) {
        return digits;
    }
    if (digits.startsWith('0')) {
        return '212' + digits.slice(1);
    }
    if (digits.length === 9) {
        return '212' + digits;
    }
    return digits || DEFAULT_MANAGER_WHATSAPP;
}

export interface OrderItemWhatsApp {
    name: string;
    quantity: number;
    price: number;
}

export interface OrderWhatsAppDetails {
    id: string;
    customer: string;
    phone: string;
    address: string;
    city?: string;
    paymentMethod?: string;
    status?: string;
    total: number;
    items: OrderItemWhatsApp[] | string;
    createdAt?: string;
}

/**
 * Translates payment method code to human-readable Arabic text
 */
export function getPaymentMethodLabel(method?: string): string {
    switch (method) {
        case 'cod':
            return 'الدفع عند الاستلام (COD)';
        case 'bank_transfer':
            return 'تحويل بنكي (Bank Transfer)';
        case 'cashplus':
            return 'وكالات تحويل الأموال (CashPlus / Wafacash)';
        default:
            return method || 'الدفع عند الاستلام';
    }
}

/**
 * Formats a comprehensive, professional WhatsApp message containing all order details
 */
export function generateOrderWhatsAppMessage(order: OrderWhatsAppDetails): string {
    let itemsList: OrderItemWhatsApp[] = [];

    if (typeof order.items === 'string') {
        try {
            itemsList = JSON.parse(order.items);
        } catch {
            itemsList = [];
        }
    } else if (Array.isArray(order.items)) {
        itemsList = order.items;
    }

    const shortId = order.id && order.id.length > 8 ? order.id.slice(0, 8).toUpperCase() : (order.id || 'N/A');
    const paymentLabel = getPaymentMethodLabel(order.paymentMethod);

    // Format products list
    const itemsFormatted = itemsList.length > 0
        ? itemsList.map((item, index) => {
            const lineTotal = (item.price * item.quantity).toFixed(2);
            return `${index + 1}. *${item.name}*\n   ▫️ الكمية: ${item.quantity}\n   ▫️ السعر: ${item.price} د.م  (المجموع: ${lineTotal} د.م)`;
        }).join('\n\n')
        : '▫️ تفاصيل المنتجات مسجلة في الموقع';

    // Format full address
    const fullAddress = order.city && !order.address.includes(order.city)
        ? `${order.address} - ${order.city}`
        : order.address;

    const dateStr = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString('ar-MA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : new Date().toLocaleDateString('ar-MA');

    return `🌿 *طلب جديد من الموقع - أعشاب MYAH* 🌿\n` +
        `-----------------------------------------\n` +
        `📦 *رقم الطلب:* #${shortId}\n` +
        `📅 *التاريخ:* ${dateStr}\n\n` +
        `👤 *معلومات العميل:*\n` +
        `• الاسم الكامل: *${order.customer}*\n` +
        `• رقم الهاتف: *${order.phone}*\n` +
        `• العنوان: *${fullAddress}*\n` +
        `• طريقة الدفع: *${paymentLabel}*\n\n` +
        `🛍️ *المنتجات المطلوبة:*\n` +
        `${itemsFormatted}\n\n` +
        `-----------------------------------------\n` +
        `💰 *المجموع الإجمالي: ${Number(order.total).toFixed(2)} درهم مغربي*\n` +
        `-----------------------------------------\n` +
        `✅ تم تسجيل الطلب بنجاح في الموقع ويُرجى تأكيده وتجهيز الشحنة.`;
}

/**
 * Creates the complete wa.me link for sending the order to WhatsApp
 */
export function createWhatsAppOrderUrl(order: OrderWhatsAppDetails, managerPhone?: string): string {
    const targetPhone = formatWhatsAppNumber(managerPhone || DEFAULT_MANAGER_PHONE);
    const message = generateOrderWhatsAppMessage(order);
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
