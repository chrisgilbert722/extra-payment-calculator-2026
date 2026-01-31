import React from 'react';
import type { ExtraPaymentInput } from '../logic/extraPaymentCalculations';

interface InputCardProps {
    values: ExtraPaymentInput;
    onChange: (field: keyof ExtraPaymentInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Loan Balance */}
                <div>
                    <label htmlFor="loanBalance">Loan Balance ($)</label>
                    <input
                        type="number"
                        id="loanBalance"
                        value={values.loanBalance}
                        onChange={(e) => onChange('loanBalance', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="1000"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current loan balance to pay off
                    </span>
                </div>

                {/* Interest Rate */}
                <div>
                    <label htmlFor="interestRate">Interest Rate (%)</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={values.interestRate}
                        onChange={(e) => onChange('interestRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Annual interest rate on your loan
                    </span>
                </div>

                {/* Regular Payment */}
                <div>
                    <label htmlFor="regularPayment">Regular Monthly Payment ($)</label>
                    <input
                        type="number"
                        id="regularPayment"
                        value={values.regularPayment}
                        onChange={(e) => onChange('regularPayment', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="25"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your standard monthly payment amount
                    </span>
                </div>

                {/* Extra Payment */}
                <div>
                    <label htmlFor="extraPayment">Extra Payment ($)</label>
                    <input
                        type="number"
                        id="extraPayment"
                        value={values.extraPayment}
                        onChange={(e) => onChange('extraPayment', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="25"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Additional amount to pay each month toward principal
                    </span>
                </div>
            </div>
        </div>
    );
};
