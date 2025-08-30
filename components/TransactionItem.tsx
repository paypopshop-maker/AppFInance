import React from 'react';
import { Transaction } from '../types';
import { OtherIcon } from './icons';

interface TransactionItemProps {
    transaction: Transaction;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount);
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const isIncome = transaction.type === 'income';
    const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
    const sign = isIncome ? '+' : '-';

    const CategoryIcon = transaction.category?.icon || OtherIcon;
    const categoryName = transaction.category?.name || 'بدون دسته‌بندی';

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4 space-x-reverse">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gray-100 rounded-full">
                <CategoryIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">{categoryName}</p>
                    <p className={`font-mono font-bold ${amountColor}`}>
                        {sign}{formatCurrency(transaction.amount)}
                    </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                    <p>{transaction.notes || transaction.bank || 'بدون یادداشت'}</p>
                    <p className="font-mono">{transaction.date}</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;