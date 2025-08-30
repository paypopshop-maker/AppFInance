
import React, { useState } from 'react';
import { CloseIcon } from './icons';

interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onParse: (sms: string) => void;
    isLoading: boolean;
    error: string | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onParse, isLoading, error }) => {
    const [sms, setSms] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sms.trim()) {
            onParse(sms);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
                    <CloseIcon />
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">افزودن تراکنش جدید</h2>
                <form onSubmit={handleSubmit}>
                    <p className="text-sm text-gray-600 mb-2">
                        پیامک بانکی خود را برای پردازش خودکار در کادر زیر جای‌گذاری کنید.
                    </p>
                    <textarea
                        value={sms}
                        onChange={(e) => setSms(e.target.value)}
                        rows={5}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="مثال: برداشت مبلغ ۵۰٬۰۰۰ ریال از حساب شما..."
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading || !sms.trim()}
                            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    در حال پردازش...
                                </>
                            ) : (
                                "پردازش پیامک"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
