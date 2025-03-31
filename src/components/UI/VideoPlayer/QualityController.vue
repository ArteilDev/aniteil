<template>
    <div class="quality-controller">
        <div
            class="quality-controller-header"
            @click="active = !active"
        >
            {{ quality }}p
        </div>
        <div
            class="quality-controller-body"
            :class="active ? 'active' : ''"
        >
            <span
                class="quality-controller-body__item"
                v-for="item in options"
                :key="item.value"
                :class="item.active ? 'active' : ''"
                @click="qualityHandler(item)"
            >
                {{ item.value }}p
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, defineEmits } from 'vue'

const emit = defineEmits(['quality'])

const active = ref(false)
const quality = ref('720')
const options = ref([
    {
        value: '360',
        active: false,
    },
    {
        value: '480',
        active: false,
    },
    {
        value: '720',
        active: true,
    },
])

function qualityHandler(item) {
    for(let i = 0; i < options.value.length; i++) {
        if(item.value == options.value[i].value) {
            options.value[i].active = true
            quality.value = options.value[i].value
        } else {
            options.value[i].active = false
        }
    }
    active.value = false
}

watch(quality, (newValue, oldValue) => {
    if(newValue != oldValue) {
        emit('quality', newValue)
    }
});
</script>
<style scoped lang="sass">
.quality-controller
    position: relative
    width: 100%
    font-weight: 600
    &-header
        display: flex
        align-items: center
        justify-content: center
        cursor: pointer
        opacity: .8
        @media only screen and (max-width: 425px)
            font-size: 10px
        &:hover
            opacity: 1
    &-body
        position: absolute
        bottom: 34px
        left: 50%
        display: none
        flex-direction: column
        background: rgba( 0, 0, 0, .5)
        transform: translateX(-50%)
        @media only screen and (max-width: 425px)
            bottom: 26px
        &.active
            display: flex
        &__item
            padding: 4px 12px
            display: flex
            align-items: center
            justify-content: center
            font-weight: 400
            cursor: pointer
            @media only screen and (max-width: 425px)
                font-size: 10px
            &:hover
                color: var(--color-white) !important
                background: var(--color-primary)
            &.active
                color: var(--color-primary)

</style>