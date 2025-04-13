import {db} from '@/database.ts';
import type {Category} from '@/types/Category.ts';
import type {Theme} from '@/types/Theme.ts';
import type {Card} from '@/types/Card.ts';

export function importDataComposable() {
    const jsonImport = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        try {
            const text = await file.text();
            const json = JSON.parse(text);

            await db.transaction('rw', db.categories, db.themes, db.cards, async () => {
                if (json.categories) await db.categories.bulkPut(json.categories as Category[]);
                if (json.themes) await db.themes.bulkPut(json.themes as Theme[]);
                if (json.cards) await db.cards.bulkPut(json.cards as Card[]);
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const exportDataToJson = async () => {
        const categories = await db.categories.toArray();
        const themes = await db.themes.toArray();
        const cards = await db.cards.toArray();

        const json = JSON.stringify({categories, themes, cards}, null, 2);
        const blob = new Blob([json], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    return {
        jsonImport,
        exportDataToJson
    };
}