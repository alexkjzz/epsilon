import { redirect } from 'next/navigation';
import { fetchUser } from '@/utils/fetchUser';
import { createClient } from '@/utils/supabase/server';
import SubmitForm from '../components/SubmitForm';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

export default async function SubmitPage() {
    const user = await fetchUser();
    if (!user) {
        redirect('/login');
    }

    const supabase = await createClient();
    const { data: modules, error } = await supabase
        .from('module')
        .select(`
            id,
            name,
            trainings:training (
                id,
                name
            )
        `);

    if (error) {
        console.error('Error fetching modules and trainings:', error);
        throw new Error('Failed to fetch modules and trainings');
    }

    return (
        <div className="flex flex-col min-h-screen font-mono">
            <Header title="Submit Work" />
            <main className="flex-1 px-6 py-8">
                <SubmitForm modules={modules} userId={user.id} />
            </main>
            <Footer />
        </div>
    );
}