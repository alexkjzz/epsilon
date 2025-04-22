import { createClient } from '@/utils/supabase/server';

export async function fetchUser() {
    try {
        const supabase = await createClient();
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
            console.error('Error fetching authenticated user:', authError);
            throw new Error('Failed to fetch authenticated user');
        }

        if (!user) {
            throw new Error('No user is logged in');
        }

        // Récupérer uniquement les données nécessaires depuis la table 'users'
        const { data: userData, error } = await supabase
            .from('users')
            .select('id, email, submission_count, review_count, training_count, role')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching user data:', error);
            throw new Error('Failed to fetch user data');
        }

        // Retourner les données directement
        return {
            id: userData.id,
            email: userData.email,
            submissionCount: userData.submission_count,
            reviewCount: userData.review_count,
            trainingCount: userData.training_count,
            role: userData.role,
        };
    } catch (err) {
        console.error('Unexpected error:', err);
        throw new Error('Unexpected error while fetching user data');
    }
}