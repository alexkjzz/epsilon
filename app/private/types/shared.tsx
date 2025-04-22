export interface Module {
    id: number;
    name: string;
}

export interface Publication {
    id: number;
    name: string;
    module: Module | Module[];
}