import { prisma } from '../src/lib/prisma';

async function updatePhone() {
    console.log('Updating SiteSettings with manager phone: 0608933695...');
    const updated = await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {
            contactPhone: '0608933695',
            cashPlusInfo: 'اسم المستفيد: شركة MYAHHEALTY SARL | رقم الهاتف: 0608933695'
        },
        create: {
            id: 1,
            contactPhone: '0608933695',
            cashPlusInfo: 'اسم المستفيد: شركة MYAHHEALTY SARL | رقم الهاتف: 0608933695'
        }
    });

    console.log('Updated SiteSettings:', updated);
}

updatePhone()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
