'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function register(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Utilisation de signUp pour l'inscription de l'utilisateur
    const { data: user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    })

    if (error) {
        return { error: 'Error during registration: ' + error.message }
    }

    // Après l'inscription, on vérifie si l'utilisateur doit confirmer son e-mail
    if (user) {
        return { success: 'Please check your email to confirm your account.' }
    }

    // Revalidation du cache et redirection après une inscription réussie
    revalidatePath('/', 'layout')
    redirect('/private')  // La redirection arrête l'exécution ici, donc pas besoin de retourner quoi que ce soit après
}
