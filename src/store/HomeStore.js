import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/api';

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        titles_main: null,
        titles_top: null,
        titles_ongoing: null,
        titles_by_genre: {
            '1-Action': [],
            '2-Adventure': [],
            '4-Comedy': [],
            '9-Ecchi': [],
            '10-Fantasy': [],
            '22-Romance': [],
        },
    }),

    actions: {
        async fetchMainTitles() {
            try {
                const getPoster = (array) => array[Math.floor(Math.random() * array.length)];

                const response1 = await axios.get(`${api}/main_slider/1`);
                const mainPoster = getPoster(response1.data[0].screenshots);
                response1.data[0].poster = mainPoster;
                this.titles_main = response1.data;

                const response2 = await axios.get(`${api}/main_slider/5`);
                const additionalTitles = response2.data.map((title, index) => {
                    if (index !== 0) {
                        title.poster = getPoster(title.screenshots);
                    }
                    return title;
                });

                this.titles_main.push(...additionalTitles);
            } catch (error) {
                console.error('Error fetching main titles:', error);
            }
        },

        async fetchTopTitles() {
            try {
                const response = await axios.get(`${api}/top`);
                this.titles_top = response.data;
            } catch (error) {
                console.error('Error fetching top titles:', error);
            }
        },

        async fetchOngoingTitles() {
            try {
                const response = await axios.get(`${api}/ongoing`);
                this.titles_ongoing = response.data;
            } catch (error) {
                console.error('Error fetching ongoing titles:', error);
            }
        },

        async fetchTitlesByGenre(genre) {
            if (this.titles_by_genre[genre].length === 0) {
                try {
                    const response = await axios.get(`${api}/titles/genre/${genre}`);
                    this.titles_by_genre[genre] = response.data;
                } catch (error) {
                    console.error(`Error fetching titles by genre (${genre}):`, error);
                }
            }
        },
    },
});