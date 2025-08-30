import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

interface SummaryProps {
    income: number;
    expense: number;
    balance: number;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
};

const SummaryCard: React.FC<{ title: string; amount: number; icon: React.ReactNode; color: string }> = ({ title, amount, icon, color }) => (
    <div className={`bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 ${color}`}>
        <div className="p-3 rounded-full bg-opacity-20">
            {icon}
        </div>
        <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-lg font-bold text-gray-800">{formatCurrency(amount)}</p>
        </div>
    </div>
);


const Summary: React.FC<SummaryProps> = ({ income, expense, balance }) => {
    return (
        <div>
            <div className="bg-white p-4 rounded-xl shadow-md mb-4 text-center">
                <p className="text-gray-500 text-sm">موجودی کل</p>
                <p className={`text-3xl font-bold ${balance >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                    {formatCurrency(balance)}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <SummaryCard 
                    title="مجموع درآمد"
                    amount={income}
                    icon={<ArrowUpIcon className="text-green-600"/>}
                    color="bg-green-100"
                />
                <SummaryCard 
                    title="مجموع هزینه"
                    amount={expense}
                    icon={<ArrowDownIcon className="text-red-600"/>}
                    color="bg-red-100"
                />
            </div>
        </div>
    );
};

export default Summary;