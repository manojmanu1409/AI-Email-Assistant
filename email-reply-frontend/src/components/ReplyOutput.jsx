import React from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const ReplyOutput = ({ reply, loading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (reply) {
            navigator.clipboard.writeText(reply);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="w-full p-8 bg-slate-800/50 border border-slate-700 border-dashed rounded-xl flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="text-slate-400 animate-pulse">Generating your perfect reply...</p>
            </div>
        );
    }

    if (!reply) return null;

    return (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-300">
                    Generated Reply
                </label>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                    {copied ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" /> Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" /> Copy Reply
                        </>
                    )}
                </button>
            </div>
            <div className="w-full min-h-[200px] p-6 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 whitespace-pre-wrap leading-relaxed shadow-xl">
                {reply}
            </div>
        </div>
    );
};

export default ReplyOutput;
