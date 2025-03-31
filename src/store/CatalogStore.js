import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/api';
import router from '@/router';

export const useCatalogStore = defineStore('catalogStore', {
    state: () => ({
        isLoading: true,
        titles_list: [],
    }),

    actions: {
        async fetchCatalog(currentPage = 1) {
            this.isLoading = true;

            const queryParams = router.currentRoute.value.fullPath.split('?')[1] || '';
            const url = `${api}/catalog?${queryParams}&page=${currentPage}`;

            try {
                const response = await axios.get(url);

                // Если это первая страница, очищаем список
                if (currentPage === 1) {
                    this.titles_list = [];
                }

                // Добавляем новые данные в список
                this.titles_list.push(...response.data);

            } catch (error) {
                console.error('Error fetching catalog:', error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});