import {defineStore} from "pinia";
import {ref} from "vue";
import {db} from "@/database.ts";
import type {FileType} from "@/types/FileType.ts";

export const useFileStore = defineStore("files", () => {
    const isLoaded = ref(false);
    const files = ref<FileType[]>([]);

    const loadFiles = async () => {
        try {
            files.value = await db.files.toArray();
        } catch (error) {
            console.error('Error loading cards:', error);
        }
        isLoaded.value = true;
    };

    const addFile = async (id:string, file: File) => {
        const blob = new Blob([await file.arrayBuffer()], { type: file.type });
        await db.files.put({ id, file: blob });
        await loadFiles();
    }

    const deleteFileById = async (id: string) => {
        await db.files.delete({ id: id });
    }

    const getFileById = (id: string) => {
        return files.value.find(file => file.id == id);
    }

    const getFileURLById = (id: string) => {
        const file = getFileById(id);
        if (!file?.file) return '';
        return URL.createObjectURL(file.file);
    }

    return {
        loadFiles,
        files,
        addFile,
        deleteFileById,
        getFileById,
        isLoaded,
        getFileURLById
    }
})