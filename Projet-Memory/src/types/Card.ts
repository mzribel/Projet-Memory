
export interface Card {
    id: string;
    themeId: string;
    front: string;
    back: string;
    multimedia?: string;
    level: number; // Niveau de révision
}
