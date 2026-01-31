import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This extra payment savings calculator provides estimated interest savings and payoff
                time reduction when making additional payments toward your loan principal. Calculations
                assume consistent monthly payments throughout the payoff period. These figures are
                estimates only and actual savings will depend on your specific loan terms, payment
                timing, and any fees or penalties. This calculator is for informational purposes
                and does not constitute financial guidance.
            </p>
        </div>
    );
};
