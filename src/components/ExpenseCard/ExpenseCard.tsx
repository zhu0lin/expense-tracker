// src/components/ExpenseCard/ExpenseCard.tsx
import React, { useState } from 'react';
import './ExpenseCard.css';

/*
TYPESCRIPT FEATURE INVENTORY:
Interfaces Found:
1. ExpenseCardProps - defines component contract

Type Annotations Found:
1. amount: number - ensures currency values are numeric

Autocomplete Helped:
I did not use autocomplete.

Error I Fixed:
Created type union types for better type safety
*/


export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';

// TypeScript interface defines the structure of props this component expects
// This acts like a contract - any parent component must provide these exact properties
export interface ExpenseCardProps {
    id: number;              // Unique identifier for each expense
    description: string;     // What the expense was for (e.g., "Lunch at Joe's Pizza")
    amount: number;         // Cost in dollars (will be formatted to show currency)
    category: ExpenseCategory;       // Type of expense (e.g., "Food", "Transportation")
    date: string;          // When the expense occurred (formatted as string)

    // Optional props
    onDelete?: (id: number) => void;
    highlighted?: boolean;
    showCategory?: boolean;
}

/**
 * Displays a single expense item with formatted currency and professional styling
 * @param {Object} props - Component props
 * @param {number} props.id - Unique identifier for the expense entry
 * @param {string} props.description - Human-readable description of the expense
 * @param {number} props.amount - Expense amount in dollars (will be formatted as currency)
 * @param {string} props.category - Expense category for organization and filtering
 * @param {string} props.date - Date when expense occurred (ISO string format)
 */

const ExpenseCard: React.FC<ExpenseCardProps> = ({
    id,
    description,
    amount,
    category,
    date,
    highlighted = false,
    showCategory = false,
    onDelete
}) => {

    // Local state for UI interactions (can be overridden by props)
    const [isHighlighted, setIsHighlighted] = useState(highlighted);
    const [isCategoryVisible, setIsCategoryVisible] = useState(showCategory);

    // Format currency for professional display
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);

    // Format date for user-friendly display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const handleToggleCategory = () => {
        setIsCategoryVisible(prev => !prev);
    }

    const handleToggleHighlight = () => {
        setIsHighlighted(prev => !prev);
    }

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    }


    return (

        
        <article className={`expense-card ${isHighlighted ? 'highlighted' : ''}`}>
            <div className="expense-header">
                {/* Only show category when isCategoryVisible is true */}
                {isCategoryVisible && <span className="expense-category">{category}</span>}

                <time className="expense-date" dateTime={date}>
                    {formattedDate}
                </time>

                {/* controls: toggle highlight, toggle category visibility, delete (only if provided) */}
                <div className="expense-controls">
                    <button
                        type="button"
                        className="btn-toggle-highlight"
                        onClick={handleToggleHighlight}
                        aria-pressed={isHighlighted}
                        title="Toggle highlight"
                    >
                        {isHighlighted ? 'Unhighlight' : 'Highlight'}
                    </button>

                    <button
                        type="button"
                        className="btn-toggle-category"
                        onClick={handleToggleCategory}
                        aria-pressed={isCategoryVisible}
                        title={isCategoryVisible ? 'Hide category' : 'Show category'}
                    >
                        {isCategoryVisible ? 'Hide Category' : 'Show Category'}
                    </button>

                    {/* Only show delete button if onDelete prop exists */}
                    {onDelete && (
                        <button
                            type="button"
                            className="btn-delete"
                            onClick={handleDelete}
                            title="Delete expense"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>

            <div className="expense-body">
                <h3 className="expense-description">{description}</h3>
                <p className="expense-amount">{formattedAmount}</p>
            </div>
        </article>
    );
};

export default ExpenseCard;
