import { createClient } from '@/utils/supabase/server';

export async function fetchFollowedModules(userId: string): Promise<number[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('followed_module')
        .select('module_id')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching followed modules:', error);
        throw new Error('Failed to fetch followed modules');
    }

    return data?.map((item) => item.module_id) || [];
}