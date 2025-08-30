import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';
import { EmptyStateIcon } from './icons';

interface TransactionListProps {
    transactions: Transaction[];
    title: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, title }) => {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-10 px-4 text-gray-500 bg-gray-50 rounded-lg">
                <EmptyStateIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">بدون تراکنش</h3>
                <p className="mt-1 text-sm text-gray-500">برای شروع، از بخش صندوق ورودی، یک پیامک بانکی را پردازش کنید.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800 px-1">{title}</h2>
            {transactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
};

export default TransactionList;