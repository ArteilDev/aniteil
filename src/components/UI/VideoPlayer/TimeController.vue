<template>
    <div class="time-controller" v-bind="$attrs">
        <span>{{ currentTime }}</span>
        <input
            type="range"
            class="time-controller-track"
            :min="0"
            :max="timeDuration"
            :value="currentVideoPosition"
            @change="updateTimeBar($event)"
            :style="{ backgroundSize: range }"
        />
        <span>{{ timeTotal }}</span>
    </div>
</template>
<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: true
        },
        timeDuration: {
            type: Number,
            default: 0,
        },
        currentVideoPosition: {
            type: Number,
            default: 0
        }
    },

    computed: {
        currentTime() {
            return this.calculateTime(this.currentVideoPosition)
        },

        timeTotal() {
            return this.calculateTime(this.timeDuration)
        },

        range() {
            const percent = ((this.currentVideoPosition / this.timeDuration) * 100).toFixed(2)
            return `${percent}% 100%`
        }
    },

    methods: {
        calculateTime(duration) {
            const seconds = Math.floor(duration % 60)
            const minutes = Math.floor(duration / 60)

            const computedSeconds = seconds >= 10 ? seconds : `0${seconds}`
            const computedMinutes = minutes >= 10 ? minutes : `0${minutes}`
            
            return `${computedMinutes}:${computedSeconds}`
        },

        updateTimeBar(event) {
            const target = event.target

            this.$emit('on-time-change', target.value)
        },
    },
}
</script>
<style scoped lang="sass">
.time-controller
    display: grid
    grid-template-columns: 80px 1fr 80px
    align-items: center
    justify-items: center
    gap: 12px
    width: 100%
    @media only screen and (max-width: 425px)
        grid-template-columns: 40px 1fr 40px
        gap: 8px
    & span
        font-size: 14px
        font-weight: 600
        @media only screen and (max-width: 425px)
            font-size: 10px
    &-track
        width: 100%
        height: 7.5px
        background-color: var(--color-grey)
        background-image: linear-gradient(var(--color-primary), var(--color-primary))
        background-repeat: no-repeat
        border-radius: var(--border-radius-lg)
        -webkit-appearance: none
        cursor: pointer
        outline: none
        @media only screen and (max-width: 425px)
            height: 6px
        &::-webkit-slider-thumb
            -webkit-appearance: none
            width: 16px
            height: 16px
            background: var(--color-white)
            border-radius: 1000px
            transition: var(--transition)
            @media only screen and (max-width: 425px)
                width: 14px
                height: 14px
            &:hover
                background: var(--color-primary)

</style>