'use client';

import { login } from '@/app/actions/auth';
import styles from './login.module.css';
import { useState } from 'react';

export default function LoginPage() {
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        try {
            const result = await login(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
        } catch {
            setError('حدث خطأ غير متوقع');
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>أعشاب MYAH</h1>
                    <p>لوحة التحكم</p>
                </div>

                <form action={handleSubmit} className={styles.form}>
                    {error && (
                        <div style={{ padding: '0.75rem', background: '#FEE2E2', color: '#991B1B', borderRadius: '6px', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <div className={styles.field}>
                        <label htmlFor="username">اسم المستخدم</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder="admin"
                            autoComplete="username"
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">كلمة المرور</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            autoComplete="current-password"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                    </button>
                </form>

                <p className={styles.hint}>
                    المستخدم الافتراضي: <strong>admin</strong> / <strong>admin123</strong>
                </p>
            </div>
        </div>
    );
}
