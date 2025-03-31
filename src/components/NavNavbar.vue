<template>
    <nav
        class="nav container"
        :class="nav_shade ? 'shade' : ''"
    >
        <router-link to="/" class="nav-logo">
            <img src="/favicon-32x32.png" alt="">
            <h2>ANITEIL</h2>
        </router-link>
        <div class="nav-navbar">
            <router-link to="/" class="nav-navbar-item">Главная</router-link>
            <router-link to="/animes/all" class="nav-navbar-item"
                >Каталог</router-link
            >
        </div>
        <div class="nav-panel">
            <!-- <button @click="searchHandler()">
                <img src="/src/assets/icons/icon-search.svg" alt="Поиск" />
            </button>
            <input
                v-model="search_query"
                type="text"
                class="input nav-search"
                placeholder="Поиск..."
                :class="search_active ? 'active' : ''"
            /> -->
            <!-- <button>
                <img src="/src/assets/icons/icon-notification.svg" alt="Уведомления">
            </button> -->

            <SearchPanel
                v-if="search_panel_active && search_items"
                :items="search_items"
                @link-to="routeTo"
            />
        </div>
    </nav>
</template>
<script setup>
import SearchPanel from '@/components/UI/SearchPanel.vue';

import { ref, watch } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import api from '@/api'

const router = useRouter();

const nav_shade = ref(false)

const search_panel_active = ref(true)
const search_query = ref('')
const search_items = ref(null)

function searchTitle() {
    search_items.value = null

    axios
    .get(api + `/search/${search_query.value}`)
    .then((response) => {
        if(response.data !== 'Ничего не найдено') {
            search_panel_active.value = true
            search_items.value = response.data
        } else {
            search_panel_active.value = false
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

function routeTo(id) {
    search_panel_active.value = false
    router.push({ name: 'animes', params: { id: id } })
}

watch(search_query, () => {
    if(search_query.value.length >= 3) {
        searchTitle(search_query.value)
    } else [
        search_panel_active.value = false
    ]
});


window.addEventListener('scroll', () => {
    const documentRect = document.documentElement.getBoundingClientRect()
    if(documentRect.top < 0) {
        nav_shade.value = true
    } else {
        nav_shade.value = false
    }
})
</script>
<style scoped lang="sass">
.nav
    position: fixed
    top: 0
    left: 50%
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    height: 80px
    transform: translateX(-50%)
    z-index: 100
    transition: .5s ease
    &.shade
        background: rgba(13, 12, 15, .9)
        backdrop-filter: blur(5px)
        box-shadow: 0px 5px 17px -1px rgba(0, 0, 0, 0.6)
    &-logo
        display: flex
        align-items: center
        gap: 8px
        color: var(--color-white)
    &-navbar
        display: flex
        align-items: center
        gap: 32px
        &-item
            font-size: 16px
            color: var(--color-white)
            transition: var(--transition)
            &:hover
                color: var(--color-primary)
    &-panel
        position: relative
        display: flex
        align-items: center
        justify-content: flex-end
        & button
            background: none
            border: none
    &-search
        width: 0
        transform: scaleX(0)
        &.active
            margin-left: 24px
            width: 100%
            transform: scaleX(1)
</style>
