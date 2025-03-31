<template>
    <div class="base-select" v-if="options" v-click-outside="handleFocusOut">
        <div class="base-select-header" @click="handleVisible()">
            {{ options.find( x => x.id == modelValue).name }}
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6667 1L6.00001 5.66667L1.33334 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="base-select-body" :class="active ? 'active' : ''">
            <div
                v-for="option in options"
                :key="option.id"
                class="base-select-body-item"
                :class="option.id === modelValue ? 'selected' : ''"
                @click="handleValue(option.id)"
            >
                {{ option.name }}
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            active: false,
        }
    },

    props: {
        options: {
            type: Array,
            default: null
        },

        modelValue: {
            default: null
        }
    },

    methods: {
        handleVisible() {
            this.active ? this.active = false : this.active = true
        },

        handleValue(id) {
            this.$emit('update:modelValue', id)
            this.handleVisible()
        },

        handleFocusOut() {
            if(this.active) {
                this.active = false
            }
        }
    },
}
</script>
<style scoped lang="sass">
.base-select
    position: relative
    display: flex
    z-index: 100
    &-header
        padding: 4px 16px
        display: flex
        align-items: center
        justify-content: flex-start
        gap: 10px
        font-size: 14px
        line-height: 22px
        font-weight: 700
        border: 2px solid var(--color-black-700)
        border-radius: 8px
        cursor: pointer
        transition: var(--transition)
        &:hover
            border-color: var(--color-primary)
    &-body
        padding: 8px 0
        position: absolute
        top: 40px
        display: none
        flex-direction: column
        gap: 8px
        width: 100%
        max-height: 300px
        overflow-y: auto
        background: var(--color-black-800)
        border: 2px solid var(--color-black-700)
        border-radius: var(--border-radius-sm)
        &.active
            display: flex
        &-item
            padding: 4px 16px
            cursor: pointer
            transition: var(--transition)
            &.selected
                color: var(--color-primary)
            &:hover
                color: var(--color-white)
                background: var(--color-primary)

</style>