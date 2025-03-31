<template>
    <div v-if="items" class="media-wrapper">
        <div
            class="top-media-card"
            v-for="(item, key) in items"
            :key="item.id"
        >
            <p class="top-media-card__number">{{ key+1 }}</p>
            <div class="top-media-card-body">
                <router-link
                    :to="`/animes/${item.id}`"
                    class="top-media-card-body__img"
                    :style="{ backgroundImage:'url(' +item.image +')' }"
                ></router-link>
                <div class="top-media-card-body-info">
                    <router-link :to="`/animes/${item.id}`" class="top-media-card-body-info__title">{{ item.title }}</router-link>
                    <div class="top-media-card-body-info-categories">
                        <span
                            class="category"
                            v-for="category in item.categories"
                            :key="category"
                        >
                            {{ category }}
                            <span>&#8226;</span>
                        </span>
                    </div>
                    <div class="top-media-card-body-info-footer">
                        <span
                            v-for="misc in item.miscs"
                            :key="misc"
                        >
                            {{ misc }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Object,
            default: null
        }
    },
}
</script>
<style scoped lang="sass">
.top-media-card
    margin: 0 auto
    display: grid
    grid-template-columns: auto 1fr
    align-items: center
    grid-column-gap: 24px
    min-width: 315px
    height: 160px
    overflow: hidden
    @media only screen and  (max-width: 768px)
        grid-column-gap: 16px
        min-width: 280px
    @media only screen and (max-width: 425px)
        height: 110px
        min-width: 200px
    &__number 
        font-size: 48px
        font-weight: 900
        @media only screen and  (max-width: 768px)
            font-size: 36px
        @media only screen and (max-width: 425px)
            display: none
    &-body
        display: flex
        gap: 12px
        height: 100%
        &__img
            min-width: 120px
            max-width: 120px
            height: 100%
            background-repeat: no-repeat
            background-position: center
            background-size: cover
            border-radius: var(--border-radius)
            @media only screen and (max-width: 425px)
                min-width: 80px
                max-width: 80px
        &-info
            display: flex
            flex-direction: column
            justify-content: space-between
            height: 100%
            &__title
                font-weight: 700
                color: var(--color-white)
                @media only screen and (max-width: 425px)
                    font-size: 12px
            &-categories
                display: grid
                grid-template-columns: repeat(2, auto)
                justify-content: flex-start
                grid-column-gap: 4px
                grid-row-gap: 8px
                color: var(--color-grey)
                & .category
                    display: flex
                    align-items: center
                    gap: 4px
                    font-size: 12px
                    &:last-child span
                        display: none
            &-footer
                display: flex
                flex-direction: column
                gap: 4px
                color: var(--color-grey)
                @media only screen and (max-width: 425px)
                    font-size: 10px
        &__star 
            width: 15px
            height: 15px
</style>
