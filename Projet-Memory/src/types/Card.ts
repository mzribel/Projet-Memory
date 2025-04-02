
export interface Card {
    id: string;
    themeId: string;
    front: string;
    back: string;
    multimediaFront?: string;
    multimediaBack?: string;
    level: number; // Niveau de révision
}
