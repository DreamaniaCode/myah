'use client';

import { useEffect, useRef } from 'react';

interface CustomScriptsProps {
    headScripts?: string | null;
    bodyScripts?: string | null;
}

export default function CustomScripts({ headScripts, bodyScripts }: CustomScriptsProps) {
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headScripts) {
            const div = document.createElement('div');
            div.innerHTML = headScripts;
            Array.from(div.childNodes).forEach(node => {
                if (node.nodeName === 'SCRIPT') {
                    const script = document.createElement('script');
                    script.text = node.textContent || '';
                    Array.from((node as Element).attributes).forEach(attr => script.setAttribute(attr.name, attr.value));
                    document.head.appendChild(script);
                } else {
                    document.head.appendChild(node.cloneNode(true));
                }
            });
        }
    }, [headScripts]);

    useEffect(() => {
        if (bodyScripts && bodyRef.current) {
            bodyRef.current.innerHTML = bodyScripts;
            const scripts = bodyRef.current.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode?.replaceChild(newScript, oldScript);
            });
        }
    }, [bodyScripts]);

    return <div ref={bodyRef} suppressHydrationWarning style={{ display: 'none' }} />;
}
