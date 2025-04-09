import { ref, computed } from 'vue';
import { useCardStore } from '@/stores/cardStore.ts';

export function fileMultimediaComposable() {
    const cardStore = useCardStore();

    const file = ref<Blob | null>(null);
    const fileUrl = ref<string | null>(null);

    const loadFile = async (fileId: string | undefined) => {
        if (fileId) {
            const fetchedFile = await cardStore.getFileById(fileId);
            if (fetchedFile) {
                file.value = fetchedFile;
                fileUrl.value = URL.createObjectURL(fetchedFile);
            }
        }
    };

    const fileType = computed(() => file.value?.type || '');

    return {
        file,
        fileUrl,
        fileType,
        loadFile,
    };
}