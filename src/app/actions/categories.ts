'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
    return await prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createCategory(formData: FormData) {
    const name = formData.get('name') as string;
    const nameAr = formData.get('nameAr') as string;
    const icon = formData.get('icon') as string;

    await prisma.category.create({
        data: { name, nameAr, icon },
    });

    revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
}
