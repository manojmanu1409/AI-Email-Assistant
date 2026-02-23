import React from 'react';

const tones = [
    { id: 'Professional', label: 'Professional' },
    { id: 'Friendly', label: 'Friendly' },
    { id: 'Formal', label: 'Formal' },
    { id: 'Apology', label: 'Apology' },
    { id: 'Short & Crisp', label: 'Short & Crisp' },
];

const ToneSelector = ({ selected, onSelect }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
                Select Reply Tone
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {tones.map((tone) => (
                    <button
                        key={tone.id}
                        onClick={() => onSelect(tone.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selected === tone.id
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                            }`}
                    >
                        {tone.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ToneSelector;
