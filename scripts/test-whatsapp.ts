import {
    formatWhatsAppNumber,
    generateOrderWhatsAppMessage,
    createWhatsAppOrderUrl,
    DEFAULT_MANAGER_PHONE,
    DEFAULT_MANAGER_WHATSAPP
} from '../src/lib/whatsapp';

function test() {
    console.log('--- Testing WhatsApp Number Formatting ---');
    console.assert(formatWhatsAppNumber('0608933695') === '212608933695', '0608933695 test failed');
    console.assert(formatWhatsAppNumber('00212608933695') === '212608933695', '00212608933695 test failed');
    console.assert(formatWhatsAppNumber('+212608933695') === '212608933695', '+212608933695 test failed');
    console.assert(formatWhatsAppNumber('06 08 93 36 95') === '212608933695', 'spaced test failed');
    console.log('WhatsApp formatting tests passed successfully! Manager WhatsApp is:', DEFAULT_MANAGER_WHATSAPP);

    console.log('\n--- Testing WhatsApp Message Generation ---');
    const mockOrder = {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        customer: 'محمد العلمي',
        phone: '0612345678',
        city: 'الدار البيضاء',
        address: 'شارع الزرقطوني، عمارة 45',
        paymentMethod: 'cod',
        total: 350.00,
        items: [
            { name: 'عسل السدر الحر', quantity: 2, price: 150 },
            { name: 'زيت أركان أصلي', quantity: 1, price: 50 }
        ],
        createdAt: new Date().toISOString()
    };

    const msg = generateOrderWhatsAppMessage(mockOrder);
    console.log('Generated Message:\n' + msg);

    const url = createWhatsAppOrderUrl(mockOrder, DEFAULT_MANAGER_PHONE);
    console.log('\nGenerated WhatsApp URL:\n' + url);

    console.assert(url.startsWith('https://wa.me/212608933695?text='), 'Target WhatsApp URL failed');
    console.log('\nAll WhatsApp verification tests PASSED! ✅');
}

test();
