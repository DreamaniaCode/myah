import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log('Received order request:', {
            customer: body.customer,
            phone: body.phone,
            total: body.total,
            itemsLength: body.items?.length
        });

        // Validate required fields
        if (!body.customer || !body.phone || !body.address || !body.total || !body.items) {
            console.error('Missing required fields:', body);
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const order = await prisma.order.create({
            data: {
                customer: body.customer,
                phone: body.phone,
                address: body.address,
                total: parseFloat(body.total),
                items: body.items,
            },
        });

        console.log('Order created successfully:', order.id);

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create order: ' + (error instanceof Error ? error.message : 'Unknown error') },
            { status: 500 }
        );
    }
}
