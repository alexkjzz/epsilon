import { createClient } from '@/utils/supabase/server';
import { Training } from '@/app/private/types/trainings';

export async function fetchTrainings(): Promise<Training[]> {
    try {
        const supabase = await createClient();
        const { data: trainings, error } = await supabase
            .from('training')
            .select(`
                id,
                name,
                prerequisites,
                description,
                duration,
                image_url,
                module:module (
                    id,
                    name
                )
            `);

        if (error) {
            console.error('Error fetching trainings:', error);
            throw new Error('Failed to fetch trainings');
        }

        if (!trainings) {
            throw new Error('No trainings found');
        }

        return trainings.map((training: any) => ({
            id: training.id,
            name: training.name,
            prerequisites: training.prerequisites,
            description: training.description,
            duration: training.duration,
            imageUrl: training.image_url,
            module: training.module ? {
                id: training.module.id,
                name: training.module.name,
            } : null,
        }));
    } catch (err) {
        console.error('Unexpected error:', err);
        throw new Error('Unexpected error while fetching trainings');
    }
}