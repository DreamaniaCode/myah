'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Product Actions
export async function getProducts() {
    return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getProduct(id: string) {
    return await prisma.product.findUnique({ where: { id } });
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string;
    const isNew = formData.get('isNew') === 'on';

    await prisma.product.create({
        data: { name, description, price, category, image, isNew },
    });

    revalidatePath('/admin/products');
    revalidatePath('/');
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string;
    const isNew = formData.get('isNew') === 'on';

    await prisma.product.update({
        where: { id },
        data: { name, description, price, category, image, isNew },
    });

    revalidatePath('/admin/products');
    revalidatePath('/');
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    revalidatePath('/');
}

// Order Actions
export async function getOrders() {
    return await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getOrder(id: string) {
    return await prisma.order.findUnique({ where: { id } });
}

export async function updateOrderStatus(id: string, status: string) {
    await prisma.order.update({
        where: { id },
        data: { status },
    });
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);
}

export async function updateOrderDetails(id: string, formData: FormData) {
    const notes = formData.get('notes') as string;
    const trackingCode = formData.get('trackingCode') as string;

    await prisma.order.update({
        where: { id },
        data: { notes, trackingCode },
    });

    revalidatePath(`/admin/orders/${id}`);
}
