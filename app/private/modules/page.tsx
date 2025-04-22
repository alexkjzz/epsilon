'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer'; 

interface Module {
    id: number;
    name: string;
}

export default function ModulesPage() {
    const [allModules, setAllModules] = useState<Module[]>([]);
    const [followedModules, setFollowedModules] = useState<number[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient();

                const { data: { user }, error } = await supabase.auth.getUser();

                if (error || !user) {
                    console.error('User not authenticated:', error);
                    setLoading(false);
                    return;
                }

                setUserId(user.id);

                const { data: modules, error: modulesError } = await supabase
                    .from('module')
                    .select('id, name');

                if (modulesError) {
                    console.error('Error fetching modules:', modulesError);
                    setLoading(false);
                    return;
                }

                setAllModules(modules || []);

                const { data: followed, error: followedError } = await supabase
                    .from('followed_module')
                    .select('module_id')
                    .eq('user_id', user.id);

                if (followedError) {
                    console.error('Error fetching followed modules:', followedError);
                    setLoading(false);
                    return;
                }

                setFollowedModules(followed?.map((item) => item.module_id) || []);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFollow = async (moduleId: number) => {
        try {
            const supabase = createClient();

            const { error } = await supabase
                .from('followed_module')
                .insert([{ user_id: userId, module_id: moduleId }]);

            if (error) {
                console.error('Error following module:', error);
                return;
            }

            setFollowedModules((prev) => [...prev, moduleId]);
        } catch (err) {
            console.error('Error following module:', err);
        }
    };

    if (loading) {
        return <div className="text-center text-stone-100">Loading...</div>;
    }

    if (!userId) {
        return <div className="text-center text-red-500">You must be logged in to view this page.</div>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header title="Modules" />
            <div className="flex-1 flex justify-center items-center px-6 py-4">
                <div className="w-full max-w-4xl bg-stone-700 p-8 rounded-2xl space-y-6 border border-stone-500">
                    {allModules.map((module) => (
                        <div
                            key={module.id}
                            className="p-4 bg-stone-600 rounded-lg border border-stone-500 flex justify-between items-center"
                        >
                            <div className="text-lg text-stone-100">{module.name}</div>
                            {followedModules.includes(module.id) ? (
                                <span className="text-green-500 font-medium">Followed</span>
                            ) : (
                                <button
                                    onClick={() => handleFollow(module.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}