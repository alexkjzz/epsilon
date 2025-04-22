import { createClient } from '@/utils/supabase/server';

export async function fetchModules(): Promise<{ id: number; name: string }[]> {
    const supabase = await createClient(); // Utilise le client côté serveur

    const { data, error } = await supabase
        .from('module')
        .select('id, name');

    if (error) {
        console.error('Error fetching modules:', error);
        throw new Error('Failed to fetch modules');
    }

    return data || [];
}