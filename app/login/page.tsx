'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from './actions';
import { useRouter } from 'next/navigation';
import Header from '@/app/private/components/ui/Header';
import Footer from '@/app/private/components/ui/Footer';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-2 rounded bg-stone-600 hover:bg-stone-500 transition-colors disabled:opacity-50"
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}

export default function LoginForm() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(formRef.current!);
        const result = await login(formData);

        if (result?.error) {
            setError(result.error);
        } else {
            
            router.push('/private');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex flex-col">
                <Header title="Login" />
                <div className="flex-1 flex justify-center items-center px-6 py-4">
                    <div className="w-full max-w-md bg-stone-700 p-8 rounded-2xl space-y-4 border border-stone-500">
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-1 text-sm">Email.</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email..."
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
                                    placeholder="Enter your password..."
                                    className="px-4 py-2 text-sm rounded bg-stone-600 text-stone-100 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
                                    required
                                />
                            </div>
                            <SubmitButton />
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
