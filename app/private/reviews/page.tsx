import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

interface Submission {
    id: number;
    user_id: string;
    review_status: string;
    publication: {
        id: number;
        name: string;
        module: { id: number; name: string } | { id: number; name: string }[];
    };
}

export default async function ReviewsPage() {
    const supabase = await createClient();

    // Récupérer l'utilisateur connecté
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    // Récupérer les soumissions à réviser
    const { data: rawSubmissions, error: submissionsError } = await supabase
        .from('submissions')
        .select(
            `
            id,
            user_id,
            review_status,
            publication (
                id,
                name,
                module (
                    id,
                    name
                )
            )
        `
        )
        .eq('review_status', 'pending'); // Filtrer uniquement les soumissions en attente de révision

    if (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
        return <div className="text-center text-red-500">Failed to load submissions.</div>;
    }

    const submissions: Submission[] =
        rawSubmissions?.map((submission: any) => ({
            id: submission.id,
            user_id: submission.user_id,
            review_status: submission.review_status,
            publication: {
                id: submission.publication.id,
                name: submission.publication.name,
                module: Array.isArray(submission.publication.module)
                    ? submission.publication.module.map((mod: any) => ({
                          id: mod.id,
                          name: mod.name,
                      }))
                    : { id: submission.publication.module.id, name: submission.publication.module.name },
            },
        })) || [];

    return (
        <div className="flex flex-col min-h-screen font-mono">
            <Header title="Reviews" />
            <main className="flex-1 px-6 py-8">
                <div className="mb-4 text-2xl font-bold">Submissions to Review</div>
                {submissions.length > 0 ? (
                    <ul>
                        {submissions.map((submission) => (
                            <li key={submission.id} className="mb-4 p-4 border rounded">
                                <div className="font-bold">
                                    {submission.publication.name} -{' '}
                                    {Array.isArray(submission.publication.module)
                                        ? submission.publication.module.map((mod) => mod.name).join(', ')
                                        : submission.publication.module.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Submitted by User ID: {submission.user_id}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Review Status: {submission.review_status}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-500">No submissions to review.</div>
                )}
            </main>
            <Footer />
        </div>
    );
}