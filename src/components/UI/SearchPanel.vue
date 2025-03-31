<template>
    <div class="search-panel">
        <router-link
            :to="{ name: 'animes', params: {id: item.shikimori_id} }"
            class="search-panel-item"
            v-for="item in items.filter(x => x.shikimori_id)"
            :key="item.shikimori_id"
        >
            <div class="search-panel-item__image" :style="{ backgroundImage:'url(' + item.material_data.anime_poster_url +')' }"></div>
            {{ item.title }}
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            default: null
        }
    }
}
</script>
<style scoped lang="sass">
.search-panel
    padding: 8px 0
    position: absolute
    top: 38px
    right: 0
    width: 100%
    max-height: 80vh
    overflow-y: auto 
    background: var(--color-black-800)
    border: 2px solid var(--color-black-700)
    border-radius: var(--border-radius-sm)
    @media only screen and (max-width: 425px)
        max-height: 60vh
    &-item
        padding: 4px 16px
        display: flex
        align-items: center
        gap: 8px
        color: var(--color-white)
        cursor: pointer
        transition: var(--transition)
        &:hover
            color: var(--color-white)
            background: var(--color-primary)
        &__image
            width: 50px
            height: 70px
            background-repeat: no-repeat
            background-size: cover
            background-position: center
            border-radius: 4px
</style>