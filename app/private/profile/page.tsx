
import { fetchUser } from '@/utils/fetchUser';
import { StatsProps } from '@/app/private/types/stats';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import UserStatsSection from '../components/UserStatsSection';

export default async function ProfilePage() {
    try {
        const userData: StatsProps = await fetchUser();

        return (
            <div className="flex flex-col min-h-screen font-mono">
                <Header title="Profile" />
                <main className="flex-1 px-6 py-8">
                    <UserStatsSection
                        email={userData.email}
                        submissionCount={userData.submissionCount}
                        reviewCount={userData.reviewCount}
                        trainingCount={userData.trainingCount}
                        role={userData.role}
                    />
                </main>
                <Footer />
            </div>
        );
    } catch (err) {
        console.error('Error rendering profile page:', err);
        return <div>Error loading profile</div>;
    }
}
