'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from '@/app/private/components/ui/Header';
import Footer from '@/app/private/components/ui/Footer';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        // Fonction pour gérer l'authentification et récupérer l'utilisateur
        async function checkUser() {
            const { data, error } = await supabase.auth.getSession();

            if (error || !data?.session?.user) {
                setError("User not authenticated");
                router.push('/login');
                return;
            }

            setUser(data.session.user);
            setLoading(false);
        }

        // Appel initial pour vérifier la session de l'utilisateur
        checkUser();

        // Écouteur pour la mise à jour de la session en temps réel
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session?.user) {
                router.push('/login');
            } else {
                setUser(session.user);
                setLoading(false);
            }
        });

        // Nettoyer l'écouteur à la destruction du composant
        return () => {
            subscription?.unsubscribe(); // Désabonnement de l'écouteur
        };
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-mono)]">
            <Header title="Dashboard" />
            <main className="flex-1 flex flex-col gap-8 items-center sm:items-start px-6 py-8 text-sm/6">
                <p>Here is your dashboard...</p>
                <p>Hello, {user?.email}</p>
            </main>
            <Footer />
        </div>
            
        );
    
}
