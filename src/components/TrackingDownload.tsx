'use client';

import { jsPDF } from 'jspdf';
import styles from './InvoiceDownload.module.css';

interface TrackingProps {
    order: any;
    trackingCode: string;
}

export default function TrackingDownload({ order, trackingCode }: TrackingProps) {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(44, 62, 80);
        doc.text('TRACKING INFORMATION', 105, 30, { align: 'center' });

        // Order ID
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Order #${order.id.slice(0, 8)}`, 105, 50, { align: 'center' });

        // Customer Info
        doc.setFontSize(14);
        doc.text(`Customer: ${order.customer}`, 20, 70);
        doc.text(`Address: ${order.address}`, 20, 80);
        doc.text(`Phone: ${order.phone}`, 20, 90);

        // Tracking Box
        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);
        doc.rect(20, 110, 170, 40, 'F');

        doc.setFontSize(16);
        doc.setTextColor(6, 95, 70);
        doc.text('Tracking Code:', 105, 125, { align: 'center' });

        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text(trackingCode, 105, 140, { align: 'center' });

        // Footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text('Please keep this code for your reference.', 105, 170, { align: 'center' });

        doc.save(`Tracking-${order.id.slice(0, 8)}.pdf`);
    };

    return (
        <button onClick={generatePDF} className={styles.trackingBtn}>
            🚚 تحميل كود التتبع
        </button>
    );
}
