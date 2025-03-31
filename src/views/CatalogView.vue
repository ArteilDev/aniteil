<template>
    <section class="section container">
        <div class="section-header">
            <p class="section__title">Каталог</p>
        </div>
        <div class="catalog">
            <div class="catalog-list-wrapper">
                <div v-if="!catalogStore.isLoading || currentPage != 1" class="catalog-list">
                    <MainMediaCard
                        v-for="item in catalogStore.titles_list"
                        :key="item.id"
                        :item="item"
                        :loading="false"
                    />
                </div>
                <div v-if="!catalogStore.isLoading" class="catalog-list">
                    <MainMediaCard
                        v-for="n in 5"
                        :key="n"
                        :loading="true"
                    />
                </div>
                <div v-else class="catalog-list">
                    <MainMediaCard
                        v-for="n in 20"
                        :key="n"
                        :loading="true"
                    />
                </div>
            </div>
            <div class="catalog-sidebar-wrapper">
                <div class="catalog-sidebar">
                    <div class="catalog-sidebar-section">
                        <div class="catalog-sidebar-section-header">Статус</div>
                        <div class="catalog-sidebar-section-body">
                            <div
                                class="catalog-sidebar-section-body__item"
                                :class="item.active ? 'active' : ''"
                                v-for="item in filters['statuses']"
                                :key="item.id"
                                @click="filtersHander('statuses', item.id)"
                            >
                                {{ item.label }}
                            </div>
                        </div>
                    </div>
                    <div class="catalog-sidebar-section">
                        <div class="catalog-sidebar-section-header">Сортировка</div>
                        <div class="catalog-sidebar-section-body">
                            <div
                                class="catalog-sidebar-section-body__item"
                                :class="item.active ? 'active' : ''"
                                v-for="item in filters['sort_by']"
                                :key="item.id"
                                @click="filtersHander('sort_by', item.id)"
                            >
                                {{ item.label }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import MainMediaCard from "@/components/UI/MainMediaCard.vue";

import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCatalogStore } from "@/store/CatalogStore";

const catalogStore = useCatalogStore();
const route = useRoute();
const router = useRouter();

let currentPage = 1

const filters = ref({
    statuses: [
        {
            id: 0,
            label: "Сейчас выходит",
            value: "ongoing",
            active: false,
        },
        {
            id: 2,
            label: "Вышедшее",
            value: "released",
            active: false,
        },
        {
            id: 3,
            label: "Недавно вышедшее",
            value: "latest",
            active: false,
        },
    ],
    sort_by: [
        {
            id: 0,
            label: "По рейтингу",
            value: "rating",
            active: false,
        },
        {
            id: 2,
            label: "По популярности",
            value: "popularity",
            active: false,
        },
        {
            id: 3,
            label: "По алфавиту",
            value: "name",
            active: false,
        },
        {
            id: 4,
            label: "По дате выхода",
            value: "aired_on",
            active: false,
        },
    ],
});

const specs = ref({
    statuses: null,
    sort_by: null,
});

function filtersHander(filter, id) {
    const query = {};

    for (let i = 0; i < filters.value[filter].length; i++) {
        if (filters.value[filter][i].id === id) {
            if (filters.value[filter][i].active) {
                filters.value[filter][i].active = false;
                specs.value[filter] = null;
            } else {
                filters.value[filter][i].active = true;
                specs.value[filter] = filters.value[filter][i].value;
            }
        } else {
            filters.value[filter][i].active = false;
        }
    }

    for (let spec in specs.value) {
        if (specs.value[spec]) {
            query[spec] = specs.value[spec];
        }
    }
    router.push({ path: route.fullPath, query: query });
}

function initFilter() {
    const query = router.currentRoute.value.query;

    if (query.sort_by) {
        specs.value["sort_by"] = query.sort_by;
        filters.value["sort_by"].find(
            (x) => x.value === query.sort_by
        ).active = true;
    }

    if (query.statuses) {
        specs.value["statuses"] = query.statuses;
        filters.value["statuses"].find(
            (x) => x.value === query.statuses
        ).active = true;
    }
}

watch(route, () => {
    catalogStore.fetchCatalog();
});

onMounted(() => {
    initFilter();
    catalogStore.fetchCatalog();
});

window.addEventListener('scroll', () => {
    const documentRect = document.documentElement.getBoundingClientRect()
    if(documentRect.bottom < document.documentElement.clientHeight + 150) {
        if(!catalogStore.isLoading) {
            currentPage++
            catalogStore.fetchCatalog(currentPage);
        }
    }
})
</script>
<style scoped lang="sass">
.section
    position: relative
    top: 80px
    &__title
        border-bottom: 5px solid var(--color-primary)

.catalog
    margin-top: 28px
    display: grid
    grid-template-columns: 1fr 250px
    gap: 24px
    @media only screen and (max-width: 1200px)
        grid-template-columns: 1fr
    &-list
        display: grid
        grid-template-columns: repeat(5, 1fr)
        grid-gap: 24px
        @media only screen and (max-width: 1200px)
            grid-template-columns: repeat(4, 1fr)
        @media only screen and (max-width: 768px)
            grid-template-columns: repeat(3, 1fr)
        @media only screen and (max-width: 425px)
            grid-template-columns: repeat(2, 1fr)
            grid-gap: 8px
    &-sedebar-wrapper
        position: relative
    &-sidebar
        position: fixed
        display: flex
        flex-direction: column
        gap: 12px
        width: 250px
        @media only screen and (max-width: 1200px)
            display: none
        &-section
            &-header
                padding: 12px 24px
                font-size: 16px
                font-weight: 600
                color: var(--color-white)
                background: var(--color-black-700)
                border-radius: var(--border-radius)
            &-body
                padding: 12px 0
                display: flex
                flex-direction: column
                gap: 8px
                &__item
                    display: flex
                    align-items: center
                    padding: 0 24px
                    height: 40px
                    font-weight: 600
                    cursor: pointer
                    border-radius: var(--border-radius)
                    &:not(.active):hover
                        color: var(--color-primary)
                    &.active
                        background: var(--color-primary)
</style>
