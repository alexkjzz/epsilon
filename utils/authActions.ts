import { createClient } from './supabase/client';  // Assurez-vous de bien importer le client Supabase

// Fonction pour vérifier si l'utilisateur est connecté
export const isLoggedIn = async () => {
const supabase = createClient();
const user = supabase.auth.getUser();
return user !== null;
};

// Fonction pour se déconnecter
export const logout = async () => {
const supabase = createClient();
const { error } = await supabase.auth.signOut();
if (error) {
    console.error("Logout error:", error.message);
}
};
