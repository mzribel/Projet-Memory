import {computed, ref} from 'vue';
import {useCardStore} from '@/stores/cardStore.ts';

export function cardMultimediaComposable() {
    const cardStore = useCardStore();

    const file = ref<Blob | null>(null);
    const fileUrl = ref<string | null>(null);
    const newFrontFile = ref<File | null>(null);
    const newBackFile = ref<File | null>(null);

    const handleFileUpload = (event: Event, isFront: boolean) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            if (isFront) {
                newFrontFile.value = file;
            } else {
                newBackFile.value = file;
            }
        }
    };
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
        newFrontFile,
        newBackFile,
        loadFile,
        handleFileUpload,
    };
}