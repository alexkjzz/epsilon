// src/app/private/profile/page.tsx
import { fetchUser } from '@/utils/fetchUser';
import { StatsProps } from '@/app/private/types/stats';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import UserStatsSection from '../components/UserStatsSection';

export default async function ProfilePage() {
    try {
        // Récupérer les données de l'utilisateur via fetchUser
        const userData: StatsProps = await fetchUser();

        return (
            <div className="flex flex-col min-h-screen font-mono">
                <Header title="Profile" />
                <main className="flex-1 px-6 py-8">
                    <UserStatsSection {...userData} />
                </main>
                <Footer />
            </div>
        );
    } catch (err) {
        console.error('Error rendering profile page:', err);
        return <div>Error loading profile</div>;
    }
}
