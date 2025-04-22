import { fetchTrainings } from '@/utils/fetchTrainings';
import { fetchFollowedModules } from '@/utils/fetchFollowedModules';
import { Training } from '@/app/private/types/trainings';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { createClient } from '@/utils/supabase/server';

export default async function TrainingsPage() {
    try {
        const supabase = await createClient();

        // Récupérer l'utilisateur connecté
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            console.error('User not authenticated:', error);
            return <div className="text-center text-red-500">You must be logged in to view this page.</div>;
        }

        const userId = user.id; // ID de l'utilisateur connecté

        const followedModules = await fetchFollowedModules(userId); // Récupère les modules suivis par l'utilisateur
        const trainings: Training[] = await fetchTrainings(); // Récupère tous les trainings disponibles

        // Filtrer les trainings associés aux modules suivis
        const filteredTrainings = trainings.filter((training) =>
            followedModules.includes(training.module?.id || 0)
        );

        // Regrouper les trainings par module
        const trainingsByModule = filteredTrainings.reduce((acc, training) => {
            const moduleName = training.module?.name || 'Uncategorized';
            if (!acc[moduleName]) {
                acc[moduleName] = [];
            }
            acc[moduleName].push(training);
            return acc;
        }, {} as Record<string, Training[]>);

        return (
            <div className="flex flex-col min-h-screen font-mono">
                <Header title="Trainings by Module" />
                <main className="flex-1 px-6 py-8">
                    {Object.keys(trainingsByModule).length > 0 ? (
                        <div className="space-y-8">
                            {Object.entries(trainingsByModule).map(([moduleName, moduleTrainings]) => (
                                <div
                                    key={moduleName}
                                    className="p-6 bg-stone-700 rounded-2xl border border-stone-500 shadow-md"
                                >
                                    <div className="text-2xl font-semibold text-stone-100 mb-4">
                                        Module: {moduleName}
                                    </div>
                                    <div className="space-y-6">
                                        {moduleTrainings.map((training) => (
                                            <div
                                                key={training.id}
                                                className="p-4 bg-stone-600 rounded-lg border border-stone-500"
                                            >
                                                <div className="text-lg font-semibold text-stone-100">
                                                    {training.name}
                                                </div>
                                                <div className="text-sm text-stone-400 mt-2">
                                                    {training.description || 'No description available'}
                                                </div>
                                                <div className="text-sm text-stone-400 mt-1">
                                                    Duration: {training.duration || 'N/A'}
                                                </div>
                                                <div className="text-sm text-stone-400 mt-1">
                                                    Prerequisites: {training.prerequisites || 'None'}
                                                </div>
                                                {training.imageUrl && (
                                                    <img
                                                        src={training.imageUrl}
                                                        alt={training.name}
                                                        className="mt-4 w-full h-auto rounded-md border border-stone-500"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-stone-400">
                            You are not following any modules at the moment.
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        );
    } catch (err) {
        console.error('Error rendering trainings page:', err);
        return <div className="text-center text-red-500">Error loading trainings</div>;
    }
}