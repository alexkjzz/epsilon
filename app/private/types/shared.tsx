export interface Module {
    id: number;
    name: string;
}

export interface Publication {
    id: number;
    name: string;
    module: Module | Module[]; // Peut être un objet unique ou un tableau
}