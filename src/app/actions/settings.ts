'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const defaultSettings = {
    id: 1,
    siteName: "أعشاب MYAH",
    logoUrl: "/images/logo.png",
    heroTitle: "طبيعة نقية، صحة مستدامة",
    heroSubtitle: "اكتشف مجموعتنا المختارة من العسل الحر والأعشاب الطبيعية",
    heroImage: "/images/hero_background_1769122439980.png",
    contactPhone: "0600000000",
    contactEmail: "info@herbsmyah.com",
    contactAddress: "الدار البيضاء، المغرب",
    bankName: "CIH Bank",
    bankAccount: "1234567890123456",
    cashPlusInfo: "اسم المستفيد: محمد فلان | رقم الهاتف: 0600000000",
    metaTitle: "أعشاب MYAH",
    metaDescription: "متجر أعشاب طبيعية وزيوت أصلية وعسل حر في المغرب",
    headScripts: null,
    bodyScripts: null,
    updatedAt: new Date()
};

export async function getSettings() {
    try {
        let settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

        if (!settings) {
            // Create default settings if not exists
            settings = await prisma.siteSettings.create({
                data: { id: 1 }
            });
        }

        return settings;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return defaultSettings;
    }
}

export async function updateSettings(formData: FormData) {
    const data = {
        siteName: formData.get('siteName') as string,
        logoUrl: formData.get('logoUrl') as string,
        heroTitle: formData.get('heroTitle') as string,
        heroSubtitle: formData.get('heroSubtitle') as string,
        heroImage: formData.get('heroImage') as string,
        contactPhone: formData.get('contactPhone') as string,
        contactEmail: formData.get('contactEmail') as string,
        contactAddress: formData.get('contactAddress') as string,
        bankName: formData.get('bankName') as string,
        bankAccount: formData.get('bankAccount') as string,
        cashPlusInfo: formData.get('cashPlusInfo') as string,
        metaTitle: formData.get('metaTitle') as string,
        metaDescription: formData.get('metaDescription') as string,
        headScripts: formData.get('headScripts') as string,
        bodyScripts: formData.get('bodyScripts') as string,
    };

    await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: data,
        create: { id: 1, ...data },
    });

    revalidatePath('/admin/settings');
    revalidatePath('/'); // Update homepage
    revalidatePath('/checkout'); // Update checkout
}
