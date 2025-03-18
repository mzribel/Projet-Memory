
export interface Theme {
    id: string; // Identifiant unique
    categoryId: string; // Lien vers une catégorie
    name: string; // Nom du thème
    description?: string; // Description du thème (optionnelle)
    cardCount: number; // Nombre de cartes associées
}
