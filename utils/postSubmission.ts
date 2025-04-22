import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { publicationId, userId } = body;

    const { data, error } = await postSubmission(publicationId, userId);

    if (error) {
        console.error('Error posting submission:', error);
        return NextResponse.json({ error: 'Failed to post submission' }, { status: 500 });
    }

    return NextResponse.json({ data });
}

export async function postSubmission(publicationId: number, userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('submission')
        .insert({
            publication_id: publicationId,
            user_id: userId,
            review_status: 'none',
        });

    if (error) {
        console.error('Error posting submission:', error);
        return { error };
    }

    return { data };
}