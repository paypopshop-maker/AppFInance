import React from 'react';
import { Transaction, AccountWithBalance, Debt } from '../types';
import Summary from './Summary';
import TransactionList from './TransactionList';
import { CalendarIcon } from './icons';

interface DashboardProps {
    accounts: AccountWithBalance[];
    transactions: Transaction[];
    debts: Debt[];
}

const getDueDateStatus = (dueDate: string): {text: string, color: string} => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return {text: `${diffDays} روز مانده`, color: 'text-yellow-600'};
    if (diffDays === 0) return {text: 'امروز!', color: 'text-red-600 font-bold'};
    return {text: `${Math.abs(diffDays)} روز گذشته`, color: 'text-red-500'};
}


const Dashboard: React.FC<DashboardProps> = ({ accounts, transactions, debts }) => {
    const summaryData = React.useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);
        return { income, expense, balance: totalBalance };
    }, [transactions, accounts]);

    const upcomingDebts = React.useMemo(() => {
        return debts.filter(d => !d.isPaid).slice(0, 3);
    }, [debts]);

    return (
        <div className="space-y-6 p-4">
            <Summary {...summaryData} />
            
            {upcomingDebts.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-gray-800 px-1 mb-2">یادآوری بدهی‌ها</h2>
                    <div className="space-y-2">
                        {upcomingDebts.map(debt => {
                            const status = getDueDateStatus(debt.dueDate);
                            return (
                                <div key={debt.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CalendarIcon className="w-5 h-5 text-indigo-500"/>
                                        <div>
                                            <p className="font-semibold text-gray-800">{debt.description}</p>
                                            <p className="text-sm text-gray-500">{new Intl.NumberFormat('fa-IR').format(debt.amount)} ریال</p>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-bold ${status.color}`}>{status.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            <TransactionList transactions={transactions.slice(0, 5)} title="۵ تراکنش آخر" />
        </div>
    );
};

export default Dashboard;