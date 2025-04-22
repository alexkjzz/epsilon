import { createClient } from '@/utils/supabase/server';

export async function fetchSubmissionsToReview(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('submission')
        .select(`
            id,
            user_id,
            review_status,
            publication:publication_id (
                name,
                module:module_id (
                    name
                )
            )
        `)
        .neq('user_id', userId);

    if (error) {
        console.error('Error fetching submissions to review:', error);
        throw new Error('Failed to fetch submissions to review');
    }

    return data;
}