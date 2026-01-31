import React from 'react';
import type { ExtraPaymentInput } from '../logic/extraPaymentCalculations';

interface ScenarioControlsProps {
    values: ExtraPaymentInput;
    onChange: (field: keyof ExtraPaymentInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const balanceOptions = [
        { label: '$10,000', value: 10000 },
        { label: '$25,000', value: 25000 },
        { label: '$50,000', value: 50000 },
        { label: '$100,000', value: 100000 },
    ];

    const extraPaymentOptions = [
        { label: '$50', value: 50 },
        { label: '$100', value: 100 },
        { label: '$200', value: 200 },
        { label: '$500', value: 500 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Balance Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Loan Balance</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {balanceOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('loanBalance', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.loanBalance === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.loanBalance === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.loanBalance === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Extra Payment Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Extra Payment</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {extraPaymentOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('extraPayment', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.extraPayment === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.extraPayment === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.extraPayment === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
