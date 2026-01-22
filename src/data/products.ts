import { Product } from '@/types';

export const products: Product[] = [
    {
        id: '1',
        name: 'عسل السدر الملكي',
        description: 'عسل سدر طبيعي 100% من أجود المناحل.',
        price: 350,
        image: '/images/sidr_honey_1769122460755.png',
        category: 'honey',
        isNew: true,
    },
    {
        id: '2',
        name: 'عسل الكالبتوس',
        description: 'مفيد للجهاز التنفسي والمناعة.',
        price: 120,
        image: '/images/eucalyptus_honey_1769122481887.png',
        category: 'honey',
    },
    {
        id: '3',
        name: 'زيت أركان للتجميل',
        description: 'زيت أركان بكر معصور على البارد.',
        price: 200,
        image: '/images/argan_oil_1769122501146.png',
        category: 'oils',
    },
    {
        id: '4',
        name: 'زعتر جبلي مجفف',
        description: 'زعتر بري ذو رائحة نفاذة وطعم مميز.',
        price: 45,
        image: '/images/dried_thyme_1769122519801.png',
        category: 'herbs',
    },
    {
        id: '5',
        name: 'خلطة الأعشاب المهدئة',
        description: 'مزيج من البابونج واليانسون للاسترخاء.',
        price: 80,
        image: '/images/herbal_mix_1769122539759.png',
        category: 'herbs',
        isNew: true,
    }
];
