import React from 'react';
import type { ExtraPaymentResult } from '../logic/extraPaymentCalculations';

interface BreakdownTableProps {
    result: ExtraPaymentResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

const formatTime = (months: number): string => {
    if (months >= 600) {
        return '50+ years';
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const originalRows = [
        { label: 'Estimated Loan Balance', value: formatMoney(result.loanBalance), isTotal: false },
        { label: 'Interest Rate', value: `${result.interestRate.toFixed(2)}%`, isTotal: false },
        { label: 'Regular Monthly Payment', value: formatMoney(result.regularPayment), isTotal: false },
        { label: 'Estimated Original Payoff Time', value: formatTime(result.originalPayoffMonths), isTotal: false },
        { label: 'Estimated Original Total Interest', value: formatMoney(result.originalTotalInterest), isTotal: false },
    ];

    const newRows = [
        { label: 'Extra Monthly Payment', value: formatMoney(result.extraPayment), isTotal: false },
        { label: 'Total Monthly Payment', value: formatMoney(result.totalMonthlyPayment), isTotal: false },
        { label: 'Estimated New Payoff Time', value: formatTime(result.newPayoffMonths), isTotal: false },
        { label: 'Estimated New Total Interest', value: formatMoney(result.newTotalInterest), isTotal: false },
    ];

    const savingsRows = [
        { label: 'Estimated Time Saved', value: formatTime(result.monthsSaved), isTotal: false },
        { label: 'Estimated Interest Saved', value: formatMoney(result.interestSaved), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? (result.interestSaved >= 0 ? '#166534' : '#B91C1C') : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Original Payment Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Original Payment Schedule</h3>
            </div>
            {renderTable(originalRows)}

            {/* With Extra Payment Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0F9FF' }}>
                <h3 style={{ fontSize: '1rem', color: '#0369A1' }}>Estimated With Extra Payment</h3>
            </div>
            {renderTable(newRows)}

            {/* Savings Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: result.interestSaved >= 0 ? '#F0FDF4' : '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: result.interestSaved >= 0 ? '#166534' : '#92400E' }}>Estimated Savings Summary</h3>
            </div>
            {renderTable(savingsRows, true)}
        </div>
    );
};
