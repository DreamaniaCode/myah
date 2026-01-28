"use client";

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    onRemove?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
    onRemove
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <div>
            <CldUploadWidget
                onSuccess={handleUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Explicitly pass cloudName
                    maxFiles: 1,
                    resourceType: "image",
                    clientAllowedFormats: ["image"], // only allow images
                    sources: ["local", "url", "camera", "unsplash"],
                }}
            >
                {({ open }: { open: any }) => {
                    return (
                        <div
                            onClick={() => open?.()}
                            style={{
                                border: '2px dashed #E5E7EB',
                                borderRadius: '8px',
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                backgroundColor: value ? 'white' : '#F9FAFB',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '200px'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = '#10B981'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                        >
                            {value ? (
                                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        alt="Upload"
                                        src={value}
                                    />
                                    {onRemove && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onRemove(); }}
                                            type="button"
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                background: '#EF4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                cursor: 'pointer',
                                                zIndex: 10
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#9CA3AF' }}>☁️</div>
                                    <div style={{ fontWeight: 600, color: '#4B5563' }}>
                                        اضغط لرفع صورة
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.5rem' }}>
                                        JPG, PNG, WebP
                                    </div>
                                </>
                            )}
                        </div>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;
