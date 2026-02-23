import { useState } from 'react';
import Navbar from './components/Navbar';
import EmailInput from './components/EmailInput';
import ToneSelector from './components/ToneSelector';
import ReplyOutput from './components/ReplyOutput';
import { generateEmailReply } from './api';
import { Sparkles } from 'lucide-react';

function App() {
    const [emailContent, setEmailContent] = useState('');
    const [tone, setTone] = useState('Professional');
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!emailContent.trim()) {
            setError('Please enter some email content first.');
            return;
        }

        setError('');
        setLoading(true);
        setReply('');

        try {
            const data = await generateEmailReply(emailContent, tone);
            setReply(data.generatedReply);
        } catch (err) {
            if (err.response && err.response.status === 429) {
                setError('Rate limit exceeded. Please wait a moment and try again.');
            } else {
                setError('Failed to generate reply. Please try again later.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-inter text-slate-200">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Write Emails in Seconds
                        </h2>
                        <p className="text-slate-400 max-w-lg mx-auto">
                            Our advanced AI understands context and sentiment to craft the perfect response for any situation.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
                        <EmailInput value={emailContent} onChange={setEmailContent} />

                        <ToneSelector selected={tone} onSelect={setTone} />

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${loading
                                ? 'bg-primary-900/50 text-primary-400 cursor-not-allowed'
                                : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/40 transform hover:-translate-y-0.5 active:translate-y-0'
                                }`}
                        >
                            {loading ? (
                                'Generating...'
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Smart Reply
                                </>
                            )}
                        </button>

                        {error && (
                            <p className="text-red-400 text-sm text-center font-medium animate-bounce">
                                {error}
                            </p>
                        )}

                        <ReplyOutput reply={reply} loading={loading} />
                    </div>

                    {/* Features Section */}
                    <div className="grid md:grid-cols-3 gap-6 pt-12">
                        {[
                            { title: 'AI Powered', desc: 'Driven by Gemini 1.5 Flash for high-speed & high-quality replies.' },
                            { title: 'Any Tone', desc: 'Switch between professional, friendly, or formal with one click.' },
                            { title: 'Smart Summaries', desc: 'AI automatically distills long emails to extract key points.' },
                        ].map((f, i) => (
                            <div key={i} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-sm text-slate-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
                Built with React & Spring Boot • Powered by Google Gemini
            </footer>
        </div>
    );
}

export default App;
