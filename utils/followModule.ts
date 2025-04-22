import { createClient } from '@/utils/supabase/client';

export async function followModule(userId: string, moduleId: number): Promise<void> {
    const supabase = createClient(); // Utilise le client côté client

    const { error } = await supabase
        .from('followed_module')
        .insert([{ user_id: userId, module_id: moduleId }]);

    if (error) {
        console.error('Error following module:', error);
        throw new Error('Failed to follow module');
    }
}