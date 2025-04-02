
export interface Theme {
    id: string;
    categoryId: string;
    name: string;
    description?: string;
    cardCount: number;
    isThemeSelected: boolean; // Thème sélectionné pour la révision
}
