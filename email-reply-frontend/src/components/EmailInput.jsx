import React from 'react';

const EmailInput = ({ value, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
                Original Email Message
            </label>
            <textarea
                className="w-full h-64 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none text-slate-100 placeholder-slate-500"
                placeholder="Paste the email you want to reply to here..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default EmailInput;
