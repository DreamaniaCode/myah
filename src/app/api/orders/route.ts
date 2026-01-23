import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const order = await prisma.order.create({
            data: {
                customer: body.customer,
                phone: body.phone,
                address: body.address,
                total: body.total,
                items: body.items,
            },
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
