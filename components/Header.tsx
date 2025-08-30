import React from 'react';
import { WalletIcon } from './icons';

const Header: React.FC = () => {
    return (
        <header className="bg-indigo-600 text-white p-4 shadow-md sticky top-0 z-10 w-full">
            <div className="flex items-center gap-3">
                <WalletIcon className="w-8 h-8"/>
                <h1 className="text-xl font-bold">مدیر مالی هوشمند</h1>
            </div>
        </header>
    );
};

export default Header;