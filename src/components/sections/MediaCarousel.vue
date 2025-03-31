<template>
    <carousel
        v-if="items"
        :items-to-show="1"
        :wrap-around="true"
        :transition="800"
    >   
        <slide v-for="(item, key) in items" :key>
            <media-cover :loading="false" :item="item" :main="true"/>
        </slide>

        <template #addons>
            <pagination class="container" />
        </template>
    </carousel>
    <div v-else>
        <media-cover :loading="true" :main="true"/>
    </div>
</template>
<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import MediaCover from "@/components/MediaCover.vue";

export default {
    props: {
        items: {
            type: Array,
            default: null
        }
    },

    components: {
        Carousel, Slide, Pagination, MediaCover
    }
};
</script>
<style scoped lang="sass">
.carousel
    height: 70vh
    @media only screen and (max-width: 425px)
        height: 60vh
.carousel__prev, .carousel__next
    background: red

</style>
