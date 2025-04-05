
export interface Theme {
    id: string;
    categoryId: string;
    name: string;
    description?: string;
    isThemeSelected: boolean; // Thème sélectionné pour la révision
}
