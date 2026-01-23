'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
        return { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isValid) {
        return { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
    }

    await createSession(admin.id);
    redirect('/admin/products');
}

export async function logout() {
    await deleteSession();
    redirect('/admin/login');
}
