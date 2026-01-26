'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './InvoiceDownload.module.css';

interface InvoiceProps {
    order: any;
    settings: any;
}

export default function InvoiceDownload({ order, settings }: InvoiceProps) {
    const generatePDF = () => {
        const doc = new jsPDF();
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

        // Add Arabic font support (simulated for standard PDF, real Arabic requires custom fonts)
        // For simplicity/compatibility in client-side generation without custom fonts:
        // We will transliterate or use English labels where possible, or rely on device support.
        // Note: jsPDF default fonts don't support Arabic well. 
        // Ideally we would load a custom font, but for this MVP we'll structure it simply.

        // Header
        doc.setFontSize(22);
        doc.setTextColor(44, 62, 80);
        doc.text('INVOICE', 105, 20, { align: 'center' });

        // Company Info
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(settings.siteName || 'Herbs MYAH', 20, 40);
        doc.text(settings.contactAddress || 'Casablanca, Morocco', 20, 45);
        doc.text(settings.contactEmail || 'info@herbsmyah.com', 20, 50);

        // Order Info
        doc.text(`Order ID: #${order.id.slice(0, 8)}`, 140, 40);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 140, 45);
        doc.text(`Status: ${order.status.toUpperCase()}`, 140, 50);

        // Customer Info
        doc.setLineWidth(0.5);
        doc.line(20, 60, 190, 60);
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('Bill To:', 20, 70);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(order.customer, 20, 76);
        doc.text(order.phone, 20, 81);
        doc.text(order.address, 20, 86); // Note: Arabic address might show garbled without custom font

        // Items Table
        const tableColumn = ["Item", "Price (MAD)"];
        const tableRows = items.map((item: any) => [
            item.name, // CAUTION: Arabic names
            item.price.toFixed(2)
        ]);

        autoTable(doc, {
            startY: 95,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [6, 95, 70] },
        });

        // Total
        const finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Total: ${order.total} MAD`, 140, finalY);

        // Payment Info
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Payment Information:', 20, finalY + 20);
        doc.text(`Bank: ${settings.bankName}`, 20, finalY + 26);
        doc.text(`Account: ${settings.bankAccount}`, 20, finalY + 31);
        doc.text(settings.cashPlusInfo, 20, finalY + 36);

        // Footer
        doc.setFontSize(8);
        doc.text('Thank you for your business!', 105, 280, { align: 'center' });

        doc.save(`Invoice-${order.id.slice(0, 8)}.pdf`);
    };

    return (
        <button onClick={generatePDF} className={styles.downloadBtn}>
            📄 تحميل الفاتورة (Invoice)
        </button>
    );
}
