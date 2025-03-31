<template>
    <media-carousel :items="homeStore.titles_main" />
    <section class="section container">
        <div class="section-header">
            <p class="section__title">Сейчас выходят</p>
            <router-link to="/animes/all?statuses=ongoing" class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel :items="homeStore.titles_ongoing" />
    </section>
    <section class="section container">
        <div class="section-header">
            <p class="section__title">Лучшее</p>
            <router-link to="/animes/all?sort_by=rating" class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <top-media-carousel :items="homeStore.titles_top" />
    </section>
    <section
        class="section genre container"
        id="1-Action"
    >
        <div class="section-header">
            <p class="section__title">Экшен</p>
            <router-link
                :to="'/animes/all?genre=1-Action'"
                class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel :items="homeStore.titles_by_genre['1-Action']" />
    </section>
    <section
        class="section genre container"
        id="2-Adventure"
    >
        <div class="section-header">
            <p class="section__title">Приключения</p>
            <router-link
                :to="'/animes/all?genre=2-Adventure'"
                class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel
            :items="homeStore.titles_by_genre['2-Adventure']"
        />
    </section>
    <section
        class="section genre container"
        id="4-Comedy"
    >
        <div class="section-header">
            <p class="section__title">Комедия</p>
            <router-link
                :to="'/animes/all?genre=4-Comedy'"
                class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel
            :items="homeStore.titles_by_genre['4-Comedy']"
        />
    </section>
    <section
        class="section genre container"
        id="9-Ecchi"
    >
        <div class="section-header">
            <p class="section__title">Этти</p>
            <router-link
                :to="'/animes/all?genre=9-Ecchi'"
                class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel
            :items="homeStore.titles_by_genre['9-Ecchi']"
        />
    </section>
    <section
        class="section genre container"
        id="10-Fantasy"
    >
        <div class="section-header">
            <p class="section__title">Фэнтези</p>
            <router-link
                :to="'/animes/all?genre=10-Fantasy'"
                class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel
            :items="homeStore.titles_by_genre['10-Fantasy']"
        />
    </section>
    <section
        class="section genre container"
        id="22-Romance"
    >
        <div class="section-header">
            <p class="section__title">Романтика</p>
            <router-link
                :to="'/animes/all?genre=22-Romance'"
                class="section__link"
                >Посмотреть все</router-link
            >
        </div>
        <media-card-carousel
            :items="homeStore.titles_by_genre['22-Romance']"
        />
    </section>
</template>
<script setup>
import MediaCarousel from "@/components/sections/MediaCarousel.vue";
import MediaCardCarousel from "@/components/sections/MediaCardCarousel.vue";
import TopMediaCarousel from "@/components/sections/TopMediaCarousel.vue";

import { onMounted } from "vue";
import { useHomeStore } from "@/store/HomeStore";

const homeStore = useHomeStore();

onMounted(() => {
    homeStore.fetchMainTitles();
    homeStore.fetchTopTitles();
    homeStore.fetchOngoingTitles();
});

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    // верхний край элемента виден?
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    // нижний край элемента виден?
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
}

function showVisible() {
  for (let section of document.querySelectorAll('.genre')) {
    if(section.classList.contains('show')) continue

    if (isVisible(section)) {
        section.classList.add('show')
        homeStore.fetchTitlesByGenre(section.id)
    }
  }
}

showVisible();
window.onscroll = showVisible;
</script>
