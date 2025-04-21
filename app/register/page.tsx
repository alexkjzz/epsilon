'use client';

import { useRef, useState } from 'react';
import { register } from './actions'; // ou login selon la page

import Header from '@/app/private/components/ui/Header';
import Footer from '@/app/private/components/ui/Footer';

export default function RegisterPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        const result = await register(formData);

        if (result.error) {
            setError(result.error);
            setSuccess(''); // on reset le succès
        } else if (result.success) {
            setSuccess(result.success);
            setError(''); // on reset l’erreur
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex flex-col">
                <Header title="Register" />
                <div className="flex-1 flex justify-center items-center px-6 py-4">
                    <div className="w-full max-w-md bg-stone-700 p-8 rounded-2xl space-y-4 border border-stone-500">
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        {success && <p className="text-green-400 text-sm text-center">{success}</p>}

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-1 text-sm">Email.</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 text-sm rounded bg-stone-600 text-stone-100 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="password" className="mb-1 text-sm">Password.</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="px-4 py-2 text-sm rounded bg-stone-600 text-stone-100 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 rounded bg-stone-600 hover:bg-stone-500 transition-colors"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
