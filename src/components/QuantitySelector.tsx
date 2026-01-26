'use client';

// Define styles object since component is small
const style = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        overflow: 'hidden',
        width: 'fit-content',
    },
    btn: {
        padding: '0.5rem 1rem',
        background: '#F9FAFB',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: '#374151',
        transition: 'background 0.2s',
    },
    input: {
        width: '50px',
        textAlign: 'center' as const,
        border: 'none',
        borderLeft: '1px solid #E5E7EB',
        borderRight: '1px solid #E5E7EB',
        padding: '0.5rem',
        fontSize: '1rem',
        fontWeight: '600' as const,
        color: '#111827',
        appearance: 'textfield' as const,
    }
};

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {

    const decrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const increase = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    return (
        <div style={style.wrapper}>
            <button style={style.btn} onClick={decrease} aria-label="Decrease quantity">-</button>
            <div style={style.input}>{value}</div>
            <button style={style.btn} onClick={increase} aria-label="Increase quantity">+</button>
        </div>
    );
}
