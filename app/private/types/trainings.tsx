export interface Module {
    id: number;
    name: string;
}

export interface Training {
    id: number;
    name: string;
    prerequisites: string | null;
    description: string | null;
    duration: string | null;
    imageUrl: string | null;
    module?: Module | null; // Objet module associé (optionnel)
}