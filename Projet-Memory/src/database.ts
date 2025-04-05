import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Category } from '@/types/Category';
import type {Theme} from "@/types/Theme.ts";
import type {Card} from "@/types/Card.ts";

class MemoryDatabase extends Dexie {
    categories!: Table<Category>;
    themes!: Table<Theme>;
    cards!: Table<Card>;
    files!: Table<{ id: string; file: Blob }>;
    constructor() {
        super('MemoryAppDB');
        this.version(1).stores({
            categories: 'id, name, description',
            themes: 'id, categoryId, name, description, isThemeSelected',
            cards: 'id, themeId, front, back, multimediaFront, multimediaBack, level',
            files: 'id',
        });
    }
}

export const db = new MemoryDatabase();
