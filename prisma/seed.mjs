import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
    {
        name: 'عسل السدر الملكي',
        description: 'عسل سدر طبيعي 100% من أجود المناحل.',
        price: 350,
        image: '/images/sidr_honey_1769122460755.png',
        category: 'honey',
        isNew: true,
    },
    {
        name: 'عسل الكالبتوس',
        description: 'مفيد للجهاز التنفسي والمناعة.',
        price: 120,
        image: '/images/eucalyptus_honey_1769122481887.png',
        category: 'honey',
        isNew: false
    },
    {
        name: 'زيت أركان للتجميل',
        description: 'زيت أركان بكر معصور على البارد.',
        price: 200,
        image: '/images/argan_oil_1769122501146.png',
        category: 'oils',
        isNew: false
    },
    {
        name: 'زعتر جبلي مجفف',
        description: 'زعتر بري ذو رائحة نفاذة وطعم مميز.',
        price: 45,
        image: '/images/dried_thyme_1769122519801.png',
        category: 'herbs',
        isNew: false
    },
    {
        name: 'خلطة الأعشاب المهدئة',
        description: 'مزيج من البابونج واليانسون للاسترخاء.',
        price: 80,
        image: '/images/herbal_mix_1769122539759.png',
        category: 'herbs',
        isNew: true,
    }
];

async function main() {
    console.log('Start seeding ...');
    for (const product of products) {
        const p = await prisma.product.create({
            data: product,
        });
        console.log(`Created product with id: ${p.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
