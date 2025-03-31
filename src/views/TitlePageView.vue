<template>
    <div class="title-page">
        <media-cover
            :loading="titlePageStore.title_data ? false : true"
            :item="titlePageStore.title_data"
        />
        <div v-if="titlePageStore.title_data" class="title-page-body container">
            <section
                class="section title-page-body-description d-flex-column gap-4"
            >
                <p class="section__title">Описание</p>
                <p class="title-page-body-description__subtitle">
                    {{
                        titlePageStore.title_data.material_data
                            .anime_description
                    }}
                </p>
            </section>
            <section class="section d-flex-column gap-4">
                <p class="section__title">Информация</p>
                <div class="title-page-body-info">
                    <div
                        class="title-page-body-info__item title-page-body-info__item_type"
                    >
                        <p>Тип:</p>
                        <span>{{
                            titlePageStore.title_data.material_data.anime_kind
                        }}</span>
                    </div>
                    <div class="title-page-body-info__item">
                        <p>Эпизоды:</p>
                        <span>{{
                            titlePageStore.title_data.material_data
                                .episodes_total
                        }}</span>
                    </div>
                    <div class="title-page-body-info__item">
                        <p>Длительность эпизода:</p>
                        <span
                            >{{
                                titlePageStore.title_data.material_data
                                    .episodes_aired
                            }}
                            мин.</span
                        >
                    </div>
                    <div class="title-page-body-info__item">
                        <p>Дата выхода:</p>
                        <span>{{
                            new Date(
                                titlePageStore.title_data.material_data.aired_at
                            ).toLocaleDateString()
                        }}</span>
                    </div>
                    <div
                        class="title-page-body-info__item title-page-body-info__item_categories"
                    >
                        <p>Жанры:</p>
                        <span class="title-page-body-info__item_list">
                            <span
                                v-for="genre in titlePageStore.title_data
                                    .material_data.genres"
                                :key="genre"
                            >
                                <p>{{ genre }}<span>,</span></p>
                            </span>
                        </span>
                    </div>
                    <div class="title-page-body-info__item">
                        <p>Страна:</p>
                        <span class="title-page-body-info__item_list">
                            <span
                                v-for="country in titlePageStore.title_data
                                    .material_data.countries"
                                :key="country"
                            >
                                {{ country }}
                            </span>
                        </span>
                    </div>
                    <div class="title-page-body-info__item">
                        <p>Студия:</p>
                        <span class="title-page-body-info__item_list">
                            <span
                                v-for="studio in titlePageStore.title_data
                                    .material_data.anime_studios"
                                :key="studio"
                            >
                                {{ studio }}
                            </span>
                        </span>
                    </div>
                </div>
            </section>
            <div class="section title-page-body-view d-flex-column gap-4">
                <p class="section__title">Просмотр</p>
                <div
                    class="title-page-body-view-header d-flex align-center gap-4"
                >
                    <CustomSelect
                        ref="select"
                        v-if="titlePageStore.title_series"
                        v-model="titlePageStore.series_selected"
                        :options="titlePageStore.getSeriesList"
                        @update:modelValue="setSeries"
                    />
                    <CustomSelect
                        v-if="titlePageStore.title_series"
                        v-model="titlePageStore.translations_selected"
                        :options="titlePageStore.title_series.translations"
                        @update:modelValue="setTranslations"
                    />
                </div>
                <VideoPlayer />
            </div>
        </div>
    </div>
</template>
<script setup>
import MediaCover from "@/components/MediaCover.vue";
import CustomSelect from "@/components/UI/BaseSelect.vue";
import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer.vue";

import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useTitlePageStore } from "@/store/TitlePageStore";

const titlePageStore = useTitlePageStore();
const titleId = useRouter().currentRoute.value.params.id;

function setSeries(value) {
    titlePageStore.updatePlayer(titleId, "series", value);
}

function setTranslations(value) {
    titlePageStore.updatePlayer(titleId, "translations", value);
}

onMounted(() => {
    titlePageStore.fetchTitleData(titleId);
    titlePageStore.fetchTitleInfo(titleId);
});
</script>
<style scoped lang="sass">
.title-page
    & .section
        @media only screen and (max-width: 425px)
            padding-top: 28px
            padding-bottom: 0
        &__title
            @media only screen and (max-width: 425px)
                font-weight: 600
                font-size: 18px
                line-height: 100%
    &-body
        &-description
            &__subtitle
                font-size: 16px
                font-weight: 500
                color: var(--color-grey)
                @media only screen and (max-width: 425px)
                    font-size: 12px
        &-info
            display: grid
            grid-template-columns: repeat(4, 1fr)
            align-items: end
            font-size: 16px
            grid-column-gap: 18px
            grid-row-gap: 8px
            @media only screen and (max-width: 425px)
                grid-template-columns: 1fr
            &__item
                display: flex
                align-items: flex-start
                gap: 8px
                @media only screen and (max-width: 425px)
                    font-size: 12px
                & p
                    color: var(--color-grey)
                &_type span
                    text-transform: uppercase
                &_list
                    display: flex
                    align-items: center
                    flex-wrap: wrap
                    gap: 4px
                    & span
                        & p
                            color: var(--color-white)
                        &:last-child span
                            display: none
        &-view
            display: flex
            flex-direction: column
</style>
