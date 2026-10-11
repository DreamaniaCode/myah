'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryUploadProps {
    images: string[];
    onChange: (images: string[]) => void;
    mainImage?: string;
    onSetMainImage?: (url: string) => void;
}

export default function GalleryUpload({
    images,
    onChange,
    mainImage,
    onSetMainImage,
}: GalleryUploadProps) {
    const [manualUrl, setManualUrl] = useState('');
    const [showManual, setShowManual] = useState(false);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUploadSuccess = (result: any) => {
        if (result && result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            const url = result.info.secure_url as string;
            if (!images.includes(url)) {
                onChange([...images, url]);
            }
        }
    };

    const handleRemove = (urlToRemove: string) => {
        onChange(images.filter((img) => img !== urlToRemove));
    };

    const handleAddManual = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = manualUrl.trim();
        if (trimmed && !images.includes(trimmed)) {
            onChange([...images, trimmed]);
            setManualUrl('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 600 }}>
                    صور المعرض الإضافية ({images.length})
                </span>
                <button
                    type="button"
                    onClick={() => setShowManual(!showManual)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#059669',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                >
                    {showManual ? 'إخفاء الرابط اليدوي' : 'إضافة عبر رابط مباشر'}
                </button>
            </div>

            {/* Cloudinary Upload Button */}
            {cloudName && uploadPreset ? (
                <CldUploadWidget
                    onSuccess={handleUploadSuccess}
                    uploadPreset={uploadPreset}
                    options={{
                        cloudName: cloudName,
                        multiple: true,
                        maxFiles: 10,
                        resourceType: 'image',
                        clientAllowedFormats: ['image'],
                        sources: ['local', 'url', 'camera', 'unsplash'],
                    }}
                >
                    {({ open }: { open: () => void }) => (
                        <div
                            onClick={() => open?.()}
                            style={{
                                border: '2px dashed #D1D5DB',
                                borderRadius: '8px',
                                padding: '1.25rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: '#F9FAFB',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.borderColor = '#10B981')}
                            onMouseOut={(e) => (e.currentTarget.style.borderColor = '#D1D5DB')}
                        >
                            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>📸</div>
                            <div style={{ fontWeight: 600, color: '#374151', fontSize: '0.95rem' }}>
                                اضغط لرفع صور متعددة لمعرض المنتج
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                                يمكنك تحديد أكثر من صورة معاً (JPG, PNG, WebP)
                            </div>
                        </div>
                    )}
                </CldUploadWidget>
            ) : (
                <div style={{ padding: '0.75rem', border: '1px solid #FECACA', borderRadius: '6px', background: '#FEF2F2', color: '#991B1B', fontSize: '0.8rem' }}>
                    ⚠️ إعدادات Cloudinary غير متوفرة لرفع الصور المتعددة.
                </div>
            )}

            {/* Manual URL Input toggle */}
            {showManual && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={manualUrl}
                        onChange={(e) => setManualUrl(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                        }}
                        dir="ltr"
                    />
                    <button
                        type="button"
                        onClick={handleAddManual}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                        }}
                    >
                        إضافة
                    </button>
                </div>
            )}

            {/* Grid of gallery images */}
            {images.length > 0 && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                        gap: '0.75rem',
                        marginTop: '0.5rem',
                    }}
                >
                    {images.map((imgUrl, index) => {
                        const isCurrentMain = mainImage === imgUrl;
                        return (
                            <div
                                key={`${imgUrl}-${index}`}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '110px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: isCurrentMain ? '2px solid #059669' : '1px solid #E5E7EB',
                                    backgroundColor: '#F3F4F6',
                                }}
                            >
                                <Image
                                    src={imgUrl}
                                    alt={`صورة المعرض ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />

                                {onSetMainImage && !isCurrentMain && (
                                    <button
                                        type="button"
                                        title="تعيين كصورة رئيسية"
                                        onClick={() => onSetMainImage(imgUrl)}
                                        style={{
                                            position: 'absolute',
                                            bottom: '4px',
                                            left: '4px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '2px 5px',
                                            fontSize: '0.65rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ★ رئيسية
                                    </button>
                                )}

                                {isCurrentMain && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            bottom: '4px',
                                            left: '4px',
                                            backgroundColor: '#059669',
                                            color: 'white',
                                            borderRadius: '4px',
                                            padding: '2px 5px',
                                            fontSize: '0.65rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        ★ الرئيسية
                                    </span>
                                )}

                                <button
                                    type="button"
                                    title="حذف الصورة"
                                    onClick={() => handleRemove(imgUrl)}
                                    style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        backgroundColor: '#EF4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '22px',
                                        height: '22px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
