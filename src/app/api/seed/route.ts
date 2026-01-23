import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // 1. Seed Products with local images
        const products = [
            {
                name: 'عسل السدر الملكي',
                description: 'عسل سدر طبيعي 100% من أجود المناحل.',
                price: 350,
                image: '/honey.png',
                category: 'honey',
                isNew: true,
            },
            {
                name: 'عسل الكالبتوس',
                description: 'مفيد للجهاز التنفسي والمناعة.',
                price: 120,
                image: '/honey.png',
                category: 'honey',
                isNew: false
            },
            {
                name: 'زيت أركان للتجميل',
                description: 'زيت أركان بكر معصور على البارد.',
                price: 200,
                image: '/oil.png',
                category: 'oils',
                isNew: false
            },
            {
                name: 'زعتر جبلي مجفف',
                description: 'زعتر بري ذو رائحة نفاذة وطعم مميز.',
                price: 45,
                image: '/herbs.png',
                category: 'herbs',
                isNew: false
            },
            {
                name: 'خلطة الأعشاب المهدئة',
                description: 'مزيج من البابونج واليانسون للاسترخاء.',
                price: 80,
                image: '/herbs.png',
                category: 'herbs',
                isNew: true,
            }
        ];

        // Delete all existing products first
        await prisma.product.deleteMany({});

        // Create new products
        for (const product of products) {
            await prisma.product.create({ data: product });
        }

        // 2. Seed Admin
        const adminUsername = 'admin';
        const adminPassword = 'admin123';

        const existingAdmin = await prisma.admin.findUnique({ where: { username: adminUsername } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await prisma.admin.create({
                data: {
                    username: adminUsername,
                    passwordHash: hashedPassword,
                },
            });
            console.log('Admin created');
        }

        // 3. Seed Site Settings
        const existingSettings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
        if (!existingSettings) {
            await prisma.siteSettings.create({
                data: {
                    id: 1,
                    siteName: 'أعشاب MYAH',
                }
            });
            console.log('Site settings created');
        }

        // 4. Seed Categories
        const categories = [
            { name: 'honey', nameAr: 'عسل', icon: '🍯' },
            { name: 'herbs', nameAr: 'أعشاب', icon: '🌿' },
            { name: 'oils', nameAr: 'زيوت', icon: '🫒' },
        ];

        for (const category of categories) {
            const existing = await prisma.category.findUnique({ where: { name: category.name } });
            if (!existing) {
                await prisma.category.create({ data: category });
                console.log(`Category created: ${category.nameAr}`);
            }
        }

        return NextResponse.json({ message: 'Seeding completed: Products, Admin, Settings, and Categories.' });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Seeding failed', details: String(error) }, { status: 500 });
    }
}
