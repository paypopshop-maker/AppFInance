import React from 'react';
import { HomeIcon, InboxIcon, CreditCardIcon, CogIcon, ListIcon } from './icons';

type View = 'dashboard' | 'inbox' | 'debts' | 'settings' | 'transactions';

interface BottomNavProps {
    activeView: View;
    setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
    const activeClass = isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600';
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${activeClass}`}>
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-t-md z-20">
            <div className="flex justify-around">
                <NavItem icon={HomeIcon} label="داشبورد" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                <NavItem icon={InboxIcon} label="صندوق ورودی" isActive={activeView === 'inbox'} onClick={() => setActiveView('inbox')} />
                <NavItem icon={CreditCardIcon} label="بدهی‌ها" isActive={activeView === 'debts'} onClick={() => setActiveView('debts')} />
                <NavItem icon={ListIcon} label="تراکنش‌ها" isActive={activeView === 'transactions'} onClick={() => setActiveView('transactions')} />
                <NavItem icon={CogIcon} label="تنظیمات" isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
            </div>
        </div>
    );
};

export default BottomNav;
