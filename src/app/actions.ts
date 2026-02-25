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

    // Parse additional images from comma-separated string
    const imagesStr = formData.get('images') as string;
    const images = imagesStr ? imagesStr.split(',').map(s => s.trim()).filter(Boolean) : [];

    await prisma.product.create({
        data: { name, description, price, category, image, images, isNew },
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

    // Parse additional images from comma-separated string
    const imagesStr = formData.get('images') as string;
    const images = imagesStr ? imagesStr.split(',').map(s => s.trim()).filter(Boolean) : [];

    await prisma.product.update({
        where: { id },
        data: { name, description, price, category, image, images, isNew },
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

// Blog Category Actions
export async function getBlogCategories() {
    return await prisma.blogCategory.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createBlogCategory(formData: FormData) {
    const name = formData.get('name') as string;
    const nameAr = formData.get('nameAr') as string;
    const slug = formData.get('slug') as string;

    await prisma.blogCategory.create({
        data: { name, nameAr, slug },
    });

    revalidatePath('/admin/blog');
}

export async function deleteBlogCategory(id: string) {
    await prisma.blogCategory.delete({ where: { id } });
    revalidatePath('/admin/blog');
}

// Blog Post Actions
export async function getBlogPosts() {
    return await prisma.blogPost.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getBlogPost(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id },
        include: { category: true }
    });
}

export async function createBlogPost(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const published = formData.get('published') === 'on';
    const categoryId = formData.get('categoryId') as string;

    await prisma.blogPost.create({
        data: { title, slug, excerpt, content, featuredImage, published, categoryId },
    });

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const published = formData.get('published') === 'on';
    const categoryId = formData.get('categoryId') as string;

    await prisma.blogPost.update({
        where: { id },
        data: { title, slug, excerpt, content, featuredImage, published, categoryId },
    });

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
}

