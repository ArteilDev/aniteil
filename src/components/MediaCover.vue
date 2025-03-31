<template>
    <div
        v-if="!loading"
        class="media-cover"
        :style="{ backgroundImage: 
                    main ? 
                    `linear-gradient( 358.93deg, #0d0c0f 0.83%, rgba(13, 12, 15, 0.85) 28.55%, rgba(13, 12, 15, 0) 48.81%, rgba(13, 12, 15, 0.284314) 70.66%, #0d0c0f 103.18%),
                    url(${item.poster})` :
                    `linear-gradient( 358.93deg, #0d0c0f 0.83%, rgba(13, 12, 15, 0.85) 28.55%, rgba(13, 12, 15, 0) 48.81%, rgba(13, 12, 15, 0.284314) 70.66%, #0d0c0f 103.18%),
                    url(${item.screenshots[Math.floor(Math.random() * item.screenshots.length)]})` 
                }"
    >
        <div
            class="container"
        >
            <div class="media-cover-badge-list d-flex align-center gap-2">
                <span class="media-cover-badge-list__type" v-if="main">
                    <span v-if="item.type === 'anime-serial'">Сериал</span>
                    <span v-else>{{ item.type }}</span>
                </span>
                <span class="media-cover-badge-list__type" v-else>
                    {{ item.material_data.rating_mpaa }}
                </span>

                <span
                    class="media-cover-badge-list__status"
                    :class="item.material_data.all_status"
                >
                    {{ item.material_data.all_status === 'released' ? 'Релиз' : 'Онгоинг' }}
                </span>
            </div>
            <div class="media-cover-info">
                <h1 class="media-cover-info-title">
                    {{ item.title }}
                </h1>
                <div class="media-cover-info__subtitle">
                    <span>{{ item.material_data.all_status === 'released' ? item.material_data.episodes_total : item.material_data.episodes_aired }} серий</span>
                    <span>&#8226;</span>
                    <span>{{ item.year }}</span>
                </div>
                <div class="media-cover-info__subtitle media-cover-info__subtitle_category">
                    <span class="category" v-for="category in item.material_data.genres" :key="category"> {{ category }} <span>&#8226;</span></span>
                </div>
                <div v-if="main" class="media-cover-info__desc">
                    <p>{{ item.material_data.description }}</p>
                </div>
            </div>
            <div class="media-cover-info-ratings d-flex align-center gap-3">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#ffffff"></path> </g></svg>
                <div class="media-cover-info-ratings-list d-flex align-center gap-3">
                    <div class="media-cover-info-ratings-list__item d-flex align-center gap-2">
                        <span>Shikimori</span>
                        <p>{{ item.material_data.shikimori_rating }}</p>
                    </div>
                    <span>&#8226;</span>
                    <div class="media-cover-info-ratings-list__item d-flex align-center gap-2">
                        <span>IMDb</span>
                        <p>{{ item.material_data.imdb_rating }}</p>
                    </div>
                    <span>&#8226;</span>
                    <div class="media-cover-info-ratings-list__item d-flex align-center gap-2">
                        <span>Kinopoisk</span>
                        <p>{{ item.material_data.kinopoisk_rating }}</p>
                    </div>
                </div>
            </div>
            <div class="media-cover-buttons">
                <button class="btn btn_primary">
                    <img src="/src/assets/icons/icon-play.svg" alt="Play" />
                    Смотреть трейлер
                </button>
                <button class="btn btn_trans">
                    <img
                        src="/src/assets/icons/icon-favorite.svg"
                        alt="Add Watchlist"
                    />
                    В избранное
                </button>
            </div>
        </div>
    </div>

    <div v-else class="media-cover empty">
        <div class="container">
            <div class="media-cover-badge-list d-flex align-center gap-2">
                <span class="media-cover-badge-list__type">
                    <div class="loader loader_rounded"></div>
                </span>
                <span class="media-cover-badge-list__status">
                    <div class="loader loader_rounded"></div>
                </span>
            </div>
            <div class="media-cover-info">
                <span class="media-cover-info-title">
                    <div class="loader loader_rounded"></div>
                </span>
                <div class="media-cover-info__subtitle">
                    <span>
                        <div class="loader loader_rounded"></div>
                    </span>
                    <span>
                        <div class="loader loader_rounded"></div>
                    </span>
                </div>
                <div class="media-cover-info__subtitle media-cover-info__subtitle_category">
                    <span class="category" v-for="n in 4" :key="n"> <div class="loader loader_rounded"></div></span>
                </div>
                <div v-if="main" class="media-cover-info__desc">
                    <div class="loader loader_rounded"></div>
                </div>
            </div>
            <div class="media-cover-info-ratings d-flex align-center gap-3">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#ffffff"></path> </g></svg>
                <div class="media-cover-info-ratings-list d-flex align-center gap-3">
                    <div class="media-cover-info-ratings-list__item d-flex align-center gap-2">
                        <span>
                            <div class="loader loader_rounded"></div>
                        </span>
                        <span class="rating">
                            <div class="loader loader_rounded"></div>
                        </span>
                    </div>
                    <div class="media-cover-info-ratings-list__item d-flex align-center gap-2">
                        <span>
                            <div class="loader loader_rounded"></div>
                        </span>
                        <span class="rating">
                            <div class="loader loader_rounded"></div>
                        </span>
                    </div>
                    <div class="media-cover-info-ratings-list__item d-flex align-center gap-2">
                        <span>
                            <div class="loader loader_rounded"></div>
                        </span>
                        <span class="rating">
                            <div class="loader loader_rounded"></div>
                        </span>
                    </div>
                </div>
            </div>
            <div class="media-cover-buttons">
                <div class="btn btn_loader"></div>
                <div class="btn btn_loader"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: null
        },
        main: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: true
        }
    },
}
</script>
<style scoped lang="sass">
.media-cover 
    padding: 65px 0
    position: relative
    display: flex
    width: 100%
    height: 70vh
    background-position: center
    background-size: cover
    background-repeat: no-repeat
    @media only screen and (max-width: 1024px)
        padding: 36px 0
    @media only screen and (max-width: 425px)
        padding: 0
        height: 60vh
    &-badge-list
        & span
            padding: 4px 16px
            font-size: 12px
            font-weight: 500
            line-height: 20px
            border-radius: var(--border-radius-lg)
            @media only screen and (max-width: 1024px)
                padding: 2px 12px
                font-size: 10px
        &__type
            background: var(--color-black-800)
        &__status
            &.released
                background: var(--color-primary)
            &.ongoing
                color: var(--color-black-800)
                background: var(--color-white)
    &-status
        padding: 4px 12px
        font-size: 12px
        font-weight: 500
        border-radius: var(--border-radius)
        @media only screen and (max-width: 1024px)
            padding: 2px 12px
            font-size: 10px
        &.released
            background: var(--color-primary)
    & .container 
        margin-top: auto
        position: relative
        display: flex
        flex-direction: column
        gap: 24px
        align-items: flex-start
        z-index: 2
        @media only screen and (max-width: 425px)
            gap: 12px
    &-info
        display: flex
        flex-direction: column
        align-items: flex-start
        gap: 12px
        width: 50%
        @media only screen and (max-width: 1024px)
            width: 100%
        @media only screen and (max-width: 425px)
            gap: 8px
        &-title
            font-size: 32px
            font-weight: 700
            text-align: start
            @media only screen and (max-width: 1024px)
                font-size: 28px
            @media only screen and (max-width: 425px)
                font-size: 22px
        &__subtitle
            display: flex
            align-items: center
            gap: 4px
            color: var(--color-ligth-grey)
            @media only screen and (max-width: 1024px)
                font-size: 12px
            @media only screen and (max-width: 425px)
                font-size: 10px
            & .category
                @media only screen and (max-width: 425px)
                    display: flex
                    gap: 4px
                    flex-wrap: nowrap
                &:last-child span
                    display: none

        &__desc
            text-align: start
            font-size: 16px
            line-height: 24px
            @media only screen and (max-width: 1024px)
                font-size: 14px
                line-height: 120%
            @media only screen and (max-width: 425px)
                font-size: 12px
            & p
                display: -webkit-box
                line-clamp: 3
                -webkit-line-clamp: 3
                -webkit-box-orient: vertical
                overflow: hidden
                @media only screen and (max-width: 1024px)
                    line-clamp: 2
                    -webkit-line-clamp: 2
                @media only screen and (max-width: 425px)
                    line-clamp: 3
                    -webkit-line-clamp: 3
        &-ratings
            @media only screen and (max-width: 1024px)
                gap: 4px
                font-size: 12px
            & svg
                @media only screen and (max-width: 1024px)
                    width: 18px
                    height: 18px
            &-list
                @media only screen and (max-width: 1024px)
                    gap: 4px
                & span
                    color: var(--color-ligth-grey)
                &__item
                    & p
                        font-weight: 600
                    & span
                        color: var(--color-grey)

    &-buttons
        display: flex
        align-items: center
        gap: 24px
        @media only screen and (max-width: 425px)
            gap: 8px
            justify-content: space-between
            width: 100%
            & .btn
                padding: 8px 8px
                width: 100%
    &.empty
        background: linear-gradient( 358.93deg, #0d0c0f 0.83%, rgba(13, 12, 15, 0.85) 28.55%, rgba(13, 12, 15, 0) 48.81%, rgba(13, 12, 15, 0.284314) 70.66%, #0d0c0f 103.18%), var(--color-black-700)
        & .media-cover-badge-list span
            padding: 0
            width: 80px
            height: 28px
            @media only screen and (max-width: 1024px)
                height: 24px
        & .media-cover-info-title
            width: 400px
            height: 40px
            @media only screen and (max-width: 1024px)
                width: 300px
                height: 34px
            @media only screen and (max-width: 425px)
                width: 200px
                height: 24px
        & .media-cover-info__desc
            width: 100%
            height: 72px
            @media only screen and (max-width: 1024px)
                height: 34px
            @media only screen and (max-width: 425px)
                height: 43px
        & .media-cover-info__subtitle span, .media-cover-info-ratings-list__item span
            width: 100px
            height: 18px
            @media only screen and (max-width: 425px)
                width: 40px
                height: 15px
            &.rating
                width: 18px 
                @media only screen and (max-width: 425px)
                    width: 18px
            
</style>
