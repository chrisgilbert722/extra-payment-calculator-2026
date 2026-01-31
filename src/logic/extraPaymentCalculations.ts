export interface ExtraPaymentInput {
    loanBalance: number;
    interestRate: number;
    regularPayment: number;
    extraPayment: number;
}

export interface ExtraPaymentResult {
    interestSaved: number;
    monthsSaved: number;
    newPayoffDate: Date;
    newPayoffDateFormatted: string;
    originalPayoffDate: Date;
    originalPayoffDateFormatted: string;
    originalTotalInterest: number;
    newTotalInterest: number;
    originalPayoffMonths: number;
    newPayoffMonths: number;
    originalTotalPaid: number;
    newTotalPaid: number;
    totalCostDifference: number;
    loanBalance: number;
    interestRate: number;
    regularPayment: number;
    extraPayment: number;
    totalMonthlyPayment: number;
    canPayOffOriginal: boolean;
    canPayOffNew: boolean;
    savingsMessage: string;
}

function calculatePayoff(balance: number, apr: number, monthlyPayment: number): { months: number; totalInterest: number; canPayOff: boolean } {
    const monthlyRate = apr / 100 / 12;
    let remaining = balance;
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600;

    // Check if payment covers first month interest
    const firstMonthInterest = remaining * monthlyRate;
    const canPayOff = monthlyPayment > firstMonthInterest || apr === 0;

    if (!canPayOff || balance <= 0 || monthlyPayment <= 0) {
        return { months: maxMonths, totalInterest: firstMonthInterest * maxMonths, canPayOff: false };
    }

    while (remaining > 0.01 && months < maxMonths) {
        const monthInterest = remaining * monthlyRate;
        totalInterest += monthInterest;
        remaining += monthInterest;
        const payment = Math.min(monthlyPayment, remaining);
        remaining -= payment;
        months++;
    }

    return { months, totalInterest, canPayOff: months < maxMonths };
}

export function calculateExtraPayment(input: ExtraPaymentInput): ExtraPaymentResult {
    const loanBalance = Math.max(0, input.loanBalance);
    const interestRate = Math.max(0, Math.min(100, input.interestRate));
    const regularPayment = Math.max(0, input.regularPayment);
    const extraPayment = Math.max(0, input.extraPayment);

    const totalMonthlyPayment = regularPayment + extraPayment;

    // Calculate original payoff (without extra payment)
    const originalPayoff = calculatePayoff(loanBalance, interestRate, regularPayment);

    // Calculate new payoff (with extra payment)
    const newPayoff = calculatePayoff(loanBalance, interestRate, totalMonthlyPayment);

    // Calculate savings
    const interestSaved = originalPayoff.totalInterest - newPayoff.totalInterest;
    const monthsSaved = originalPayoff.months - newPayoff.months;

    const originalTotalPaid = loanBalance + originalPayoff.totalInterest;
    const newTotalPaid = loanBalance + newPayoff.totalInterest;
    const totalCostDifference = originalTotalPaid - newTotalPaid;

    // Calculate payoff dates
    const now = new Date();
    const originalPayoffDate = new Date(now);
    originalPayoffDate.setMonth(originalPayoffDate.getMonth() + originalPayoff.months);

    const newPayoffDate = new Date(now);
    newPayoffDate.setMonth(newPayoffDate.getMonth() + newPayoff.months);

    const formatDate = (date: Date, months: number): string => {
        if (months >= 600) return 'Beyond 50 years';
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    // Generate savings message
    let savingsMessage: string;
    if (loanBalance === 0) {
        savingsMessage = 'Enter a loan balance to calculate savings';
    } else if (regularPayment === 0) {
        savingsMessage = 'Enter a regular monthly payment';
    } else if (!originalPayoff.canPayOff) {
        savingsMessage = 'Regular payment does not cover interest';
    } else if (extraPayment === 0) {
        savingsMessage = 'Add an extra payment to see potential savings';
    } else if (monthsSaved > 12) {
        savingsMessage = `Could save over ${Math.floor(monthsSaved / 12)} year${Math.floor(monthsSaved / 12) > 1 ? 's' : ''} of payments`;
    } else if (monthsSaved > 0) {
        savingsMessage = `Could save ${monthsSaved} month${monthsSaved !== 1 ? 's' : ''} of payments`;
    } else {
        savingsMessage = 'Extra payments reduce interest over time';
    }

    return {
        interestSaved,
        monthsSaved,
        newPayoffDate,
        newPayoffDateFormatted: formatDate(newPayoffDate, newPayoff.months),
        originalPayoffDate,
        originalPayoffDateFormatted: formatDate(originalPayoffDate, originalPayoff.months),
        originalTotalInterest: originalPayoff.totalInterest,
        newTotalInterest: newPayoff.totalInterest,
        originalPayoffMonths: originalPayoff.months,
        newPayoffMonths: newPayoff.months,
        originalTotalPaid,
        newTotalPaid,
        totalCostDifference,
        loanBalance,
        interestRate,
        regularPayment,
        extraPayment,
        totalMonthlyPayment,
        canPayOffOriginal: originalPayoff.canPayOff,
        canPayOffNew: newPayoff.canPayOff,
        savingsMessage
    };
}
