<template>
    <div class="media-card-wrapper" v-if="!loading">
        <router-link
            :to="`/animes/${item.id}`"
            class="media-card"
            :style="{
                backgroundImage:
                    'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%), url(' +
                    item.image +
                    ')',
            }"
        >
            <div class="media-card-info">
                <p class="media-card-info__title">{{ item.title }}</p>
                <div class="media-card-info-footer">
                    <span v-for="misc in item.miscs" :key="misc">
                        {{ misc }}
                    </span>
                </div>
            </div>
            <div class="media-card-gradient"></div>
        </router-link>
    </div>
    <div class="media-card-wrapper" v-else>
        <div class="media-card empty">
            <div class="media-card-info">
                <span class="media-card-info__title">
                    <div class="loader"></div>
                </span>
                <div class="media-card-info-footer">
                    <span v-for="n in 2" :key="n">
                        <div class="loader"></div>
                    </span>
                </div>
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

        loading: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style scoped lang="sass">
.media-card-wrapper
    & .media-card
        @media only screen and (max-width: 425px)
            width: 100%
            height: 260px
    &.slider .media-card
        width: 250px
        height: 370px
        @media only screen and (max-width: 1024px)
            width: 200px
            height: 280px
        @media only screen and (max-width: 425px)
            width: 130px
            height: 180px
.media-card
    position: relative
    padding: 20px 12px
    display: flex
    width: 100%
    color: var(--color-white)
    aspect-ratio: 9 / 14
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    border-radius: var(--border-radius-lg)
    overflow: hidden
    &-info
        margin-top: auto
        display: flex
        flex-direction: column
        gap: 12px
        width: 100%
        z-index: 1
        @media only screen and (max-width: 425px)
            gap: 8px
        &__title
            font-size: 16px
            @media only screen and (max-width: 1024px)
                font-size: 14px
            @media only screen and (max-width: 425px)
                font-size: 12px
        &-footer
            display: flex
            align-items: center
            gap: 8px
            justify-content: space-between
            color: var(--color-black-300)
            @media only screen and (max-width: 1024px)
                font-size: 12px
            @media only screen and (max-width: 425px)
                font-size: 10px
    &.empty
        background: var(--color-black-700)
        background: linear-gradient(110deg, #28262D 8%, #3c3c3d 18%, #28262D 33%)
        background-size: 200% 700%
        animation: 1.5s shine linear infinite
</style>
