<template>
    <div class="media-wrapper" v-if="items">
        <MainMediaCard
            class="slider"
            v-for="item in items"
            :key="item.id"
            :item="item"
            :loading="false"
        />
    </div>
    <div class="media-wrapper" v-else>
        <MainMediaCard
            class="slider"
            v-for="n in 10"
            :key="n"
            :loading="true"
        />
    </div>
</template>
<script>
import MainMediaCard from '@/components/UI/MainMediaCard.vue';

export default {
    props: {
        items: {
            type: Object,
            default: null,
        },
    },

    components: {
        MainMediaCard
    }
};
</script>
<style scoped lang="sass">

</style>
