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

        // Query the custom 'users' table
        const { data, error } = await supabase
            .from('users') // Custom users table
            .select('id, email, workcount, reviewcount, coursecount, role') // Include new fields
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching user from users table:', error);
            throw new Error('Failed to fetch user from users table');
        }

        // Map database fields to camelCase
        return {
            id: data.id,
            email: data.email,
            workCount: data.workcount,
            reviewCount: data.reviewcount,
            courseCount: data.coursecount,
            role: data.role,
        };
    } catch (err) {
        console.error('Unexpected error:', err);
        throw new Error('Unexpected error while fetching user');
    }
}