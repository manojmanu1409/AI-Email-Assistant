import React from 'react';
import { Mail } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-primary-600 p-2 rounded-lg">
                    <Mail className="text-white w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Smart Email AI
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm hidden sm:block">AI-Powered Professional Replies</span>
            </div>
        </nav>
    );
};

export default Navbar;
