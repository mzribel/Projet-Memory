
export interface Theme {
    id: string;
    categoryId: string;
    name: string;
    description?: string;
    newCardsPerDay?: number;
    isThemeSelected: boolean; // Thème sélectionné pour la révision
    maxLevel: number; // Niveau de révision du thème
    createdAt: string;
}
