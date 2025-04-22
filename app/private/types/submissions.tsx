import { Publication } from './shared';

export interface Module {
    name: string;
}

export interface Submission {
    id: number;
    user_id: string;
    review_status: string;
    publication: Publication;
}