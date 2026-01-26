'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    mainImage: string;
    images: string[];
    name: string;
}

export default function ProductGallery({ mainImage, images, name }: ProductGalleryProps) {
    // Combine main image with additional images, ensuring mainImage is first
    const allImages = [mainImage, ...images.filter(img => img !== mainImage)];
    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Main Image */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                background: '#fff'
            }}>
                <Image
                    src={selectedImage}
                    alt={name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {allImages.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            style={{
                                position: 'relative',
                                minWidth: '80px',
                                height: '80px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: selectedImage === img ? '2px solid #059669' : '1px solid #e5e7eb',
                                opacity: selectedImage === img ? 1 : 0.7,
                                transition: 'all 0.2s'
                            }}
                        >
                            <Image
                                src={img}
                                alt={`${name} view ${idx + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
