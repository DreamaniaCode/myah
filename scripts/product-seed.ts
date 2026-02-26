import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: 'عسل السدر الملكي',
            description: 'عسل سدر طبيعي 100%، غني بالفوائد الصحية والمذاق الرائع. مفيد للمناعة والطاقة.',
            price: 350,
            image: '/images/sidr_honey_bottle.png', // Will update extension after generation
            category: 'عسل',
            isNew: true,
        },
        {
            name: 'عسل الكالبتوس',
            description: 'عسل الكالبتوس النقي، مثالي للجهاز التنفسي ونزلات البرد. طعم مميز ورائحة زكية.',
            price: 180,
            image: '/images/eucalyptus_honey_jar.png',
            category: 'عسل',
            isNew: false,
        },
        {
            name: 'زيت أركان للتجميل',
            description: 'الذهب السائل المغربي. زيت أركان بكر معصور على البارد، للشعر والبشرة والأظافر.',
            price: 200,
            image: '/images/argan_oil_bottle.png',
            category: 'زيوت',
            isNew: true,
        },
        {
            name: 'خلطة أعشاب التهدئة',
            description: 'مزيج فريد من البابونج واللويزة والنعناع. تساعد على الاسترخاء والنوم العميق.',
            price: 45,
            image: '/images/herbal_tea_mix.png',
            category: 'أعشاب',
            isNew: false,
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('Mock products created successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
