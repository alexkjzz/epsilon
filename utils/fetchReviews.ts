import { createClient } from '@/utils/supabase/server';
import { ReviewProps } from '@/app/private/types/reviews';

export async function fetchReviews(userId: string): Promise<ReviewProps[]> {
    try {
        const supabase = await createClient();

        const { data: reviews, error } = await supabase
            .from('submission')
            .select('id, publication_id, user_id, review_status')
            .neq('user_id', userId); 
        if (error) {
            console.error('Error fetching reviews:', error);
            throw new Error('Failed to fetch reviews');
        }

        return reviews.map((review) => ({
            id: review.id,
            publicationId: review.publication_id,
            userId: review.user_id,
            reviewStatus: review.review_status,
        }));
    } catch (err) {
        console.error('Unexpected error:', err);
        throw new Error('Unexpected error while fetching reviews');
    }
}