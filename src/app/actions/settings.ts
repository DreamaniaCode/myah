'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

    if (!settings) {
        // Create default settings if not exists
        settings = await prisma.siteSettings.create({
            data: { id: 1 }
        });
    }

    return settings;
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
