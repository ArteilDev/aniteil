import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/api';

export const useTitlePageStore = defineStore('titlePageStore', {
    state: () => ({
        is_loading: true,
        title_data: null,
        title_series: null,
        series_selected: null,
        translations_selected: null,
        quality: '720',
        player_source: null,
    }),

    getters: {
        getSeriesList() {
            return Array.from({ length: this.title_series?.series_count || 0 }, (_, i) => ({
                id: i + 1,
                name: `Серия ${i + 1}`,
            }));
        },

        getPlayerSource() {
            if (!this.player_source) return null;
            return `https:${this.player_source[0]}${this.quality}.mp4`;
        },
    },

    actions: {
        async fetchTitleInfo(id) {
            try {
                const { data } = await axios.get(`${api}/title/info/${id}`);
                this.translations_selected = this.selectTranslation(data.translations);
                this.series_selected = 1;
                this.title_series = data;

                await this.fetchPlayerSource({
                    id,
                    series: this.series_selected,
                    translations: this.translations_selected,
                });
            } catch (error) {
                console.error('Error fetching title info:', error);
            }
        },

        async fetchTitleData(id) {
            try {
                const { data } = await axios.get(`${api}/title/${id}`);
                this.title_data = data[0];
                document.title += ` ${data[0].title}`;
            } catch (error) {
                console.error('Error fetching title data:', error);
            }
        },

        async fetchPlayerSource({ id, series, translations }) {
            this.is_loading = true;
            try {
                const { data } = await axios.get(`${api}/title/video/${id}/${series}/${translations}`);
                this.player_source = data;
            } catch (error) {
                console.error('Error fetching player source:', error);
            } finally {
                this.is_loading = false;
            }
        },

        updatePlayer(id, type, value) {
            if (type === 'series') {
                this.series_selected = value;
            } else if (type === 'translations') {
                this.translations_selected = value;
            }

            this.fetchPlayerSource({
                id,
                series: this.series_selected,
                translations: this.translations_selected,
            });
        },

        selectTranslation(translations) {
            const preferredTranslations = ['anilibria', 'studio band', 'anibud', 'shiza project'];
            const lowerCaseTranslations = translations.map(t => ({
                ...t,
                name: t.name.toLowerCase(),
            }));

            for (const preferred of preferredTranslations) {
                const match = lowerCaseTranslations.find(t => t.name.includes(preferred));
                if (match) return match.id;
            }

            return translations[0]?.id || null;
        },
    },
});