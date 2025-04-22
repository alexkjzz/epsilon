export interface ReviewProps {
    id: string;
    publicationId: string;
    userId: string;
    reviewStatus: 'none' | 'one_review' | 'fully_reviewed';
}