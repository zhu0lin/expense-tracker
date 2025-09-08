// src/components/ExpenseSummary/ExpenseSummary.tsx
import React from 'react';
import './ExpenseSummary.css';

/**
 * Displays summary statistics for expenses including total amount and count
 * @param {Object} props - Component props
 * @param {number} props.totalAmount - Sum of all expense amounts in dollars
 * @param {number} props.expenseCount - Total number of expense entries
 * @param {string} props.period - Time period being summarized (e.g., "This Month", "All Time")
 */
interface ExpenseSummaryProps {
    totalAmount: number;
    expenseCount: number;
    period?: string;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
    totalAmount,
    expenseCount,
    period = "All Time"
}) => {
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(totalAmount);

    return (
        <section className="expense-summary">
            <div className="summary-header">
                <h2>Expense Summary</h2>
                <span className="summary-period">{period}</span>
            </div>

            <div className="summary-stats">
                <div className="stat-item">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">{formattedTotal}</span>
                </div>

                <div className="stat-item">
                    <span className="stat-label">Expenses</span>
                    <span className="stat-value">{expenseCount}</span>
                </div>
            </div>
        </section>
    );
};

export default ExpenseSummary;
