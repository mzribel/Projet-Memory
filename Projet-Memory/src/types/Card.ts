
export interface Card {
    id: string;
    themeId: string;
    front: string;
    back: string;
    multimediaFront?: string;
    multimediaBack?: string;
    currentLevel: number; // Niveau de révision
    createdAt?: string;
    lastReviewedAt?: string;
    firstReviewedAt?:string;
    nextReviewAt?: string; // Date de la prochaine révision
}
