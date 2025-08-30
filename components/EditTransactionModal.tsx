import React, { useState, useEffect } from 'react';
import { Transaction, ParsedTransaction, TransactionCategory, Account } from '../types';
import { CloseIcon } from './icons';

interface EditTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (details: { category: TransactionCategory; notes: string; accountId: number }) => void;
    transaction: Omit<Transaction, 'id' | 'category' | 'accountId'>;
    categories: TransactionCategory[];
    accounts: Account[];
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ isOpen, onClose, onSave, transaction, categories, accounts }) => {
    const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | null>(null);
    const [selectedAccountId, setSelectedAccountId] = useState<number | ''>('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        // Set a default category when modal opens
        if (isOpen && categories.length > 0) {
            const defaultCategory = categories.find(c => c.name === 'متفرقه') || categories[0];
            setSelectedCategory(defaultCategory);
        }
        if (isOpen && accounts.length === 1) {
            setSelectedAccountId(accounts[0].id);
        }
    }, [isOpen, categories, accounts]);

    if (!isOpen) return null;
    
    const formatCurrency = (amount: number) => new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';

    const handleSave = () => {
        if (selectedCategory && selectedAccountId) {
            onSave({ category: selectedCategory, notes, accountId: Number(selectedAccountId) });
        }
    };
    
    const isIncome = transaction.type === 'income';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                 <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
                    <CloseIcon />
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">تکمیل اطلاعات تراکنش</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center">
                    <p className="text-sm text-gray-500">{isIncome ? 'مبلغ واریزی' : 'مبلغ برداشتی'}</p>
                    <p className={`text-2xl font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{transaction.date} {transaction.time}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">انتخاب حساب</label>
                    <select
                        value={selectedAccountId}
                        onChange={(e) => setSelectedAccountId(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>یک حساب انتخاب کنید</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">دسته بندی</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-colors ${selectedCategory?.name === cat.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                            >
                                <cat.icon className="w-6 h-6 mb-1 text-gray-600" />
                                <span className="text-xs text-center">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">یادداشت (اختیاری)</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="مثال: خرید از فروشگاه"
                    />
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        disabled={!selectedCategory || !selectedAccountId}
                        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    >
                        ذخیره تراکنش
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTransactionModal;