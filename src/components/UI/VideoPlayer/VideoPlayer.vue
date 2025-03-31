<template>
    <div
        v-if="!titlePageStore.is_loading"
        class="player"
        ref="player"
    >
        <video
            class="player-video"
            :src="titlePageStore.getPlayerSource"
            controls
            preload="auto"
            ref="video"
            type="video/mp4"
            @pause="active = false"
            @play="active = true"
            @loadedmetadata="setVideoData()"
            @timeupdate="progress()"
            @click="videoHandler()"
            @canplay="canPlay = true"
            @seeking="canPlay = false"
        ></video>
        <div v-if="!active && canPlay" class="player-play" @click="videoHandler()">
            <svg width="128px" height="128px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#00925D"></path>
                <path d="M15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868V9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059Z" fill="#fff"></path> </g>
            </svg>
        </div>
        <span v-if="!canPlay" class="spinner-loader"></span>
        <div class="player-controllbar">
            <TimeController
                :timeDuration="videoDuration"
                :currentVideoPosition="videoCurrentTime"
                @on-time-change="onTimeChange"
            />
            <!-- <VolumeController /> -->
            <QualityController @quality="qualityChange"/>
            <span class="fullscreen" @click="fullScreen()" style="cursor: pointer;">
                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z" fill="#fff"></path>
                    <path d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z" fill="#fff"></path>
                    <path d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z" fill="#fff"></path>
                    <path d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z" fill="#fff"></path></g>
                </svg>        
            </span>
        </div>
    </div>
    <div v-else class="player player_empty">
        <div class="loader"></div>
    </div>
</template>
<script setup>
import TimeController from '@/components/UI/VideoPlayer/TimeController.vue';
import QualityController from '@/components/UI/VideoPlayer/QualityController.vue';
// import VolumeController from '@/components/UI/VideoPlayer/VolumeController.vue';
import { ref } from 'vue'
import { useTitlePageStore } from '@/store/TitlePageStore';

const titlePageStore = useTitlePageStore()
const video = ref(null)
const videoDuration = ref(0)
const videoCurrentTime = ref(0)
const active = ref(false)
const canPlay = ref(false)

function setVideoData() {
    videoCurrentTime.value = 0
    if(video.value && video.value.readyState) {
        videoDuration.value = video.value.duration
    }
}

function videoHandler() {
    if(video.value.paused) {
        video.value.play()
        active.value = true
    } else {
        video.value.pause()
        active.value = false
    }
}

function progress() {
    if(video.value) {
        videoCurrentTime.value = video.value.currentTime
    }
}

function onTimeChange(value) {
    video.value.currentTime = value
}

function qualityChange(value) {
    titlePageStore.quality = value
    video.value.pause()
    active.value = false
}

function fullScreen() {
    if (video.value.requestFullscreen) {
        video.value.requestFullscreen();
    } else if (video.value.mozRequestFullScreen) { /* Firefox */
        video.value.mozRequestFullScreen();
    } else if (video.value.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        video.value.webkitRequestFullscreen();
    } else if (video.value.msRequestFullscreen) { /* IE/Edge */
        video.value.msRequestFullscreen();
    }
}
</script>
<style scoped lang="sass">
.player
    position: relative
    margin: 0 auto
    width: 100%
    max-height: 80vh
    border-radius: var(--border-radius-lg)
    @media only screen and (max-width: 425px)
        border-radius: 8px
    &:hover .player-controllbar
        opacity: 1
    &_empty
        aspect-ratio: 16 / 9
        max-height: 80vh
        & .loader
            border-radius: var(--border-radius-lg)
    & .spinner-loader
        @media only screen and (max-width: 425px)
            display: none
    &-video
        width: 100%
        max-height: 80vh
        border-radius: var(--border-radius-lg)
        cursor: pointer
        outline: none
        @media only screen and (max-width: 425px)
            border-radius: 8px
        &::-webkit-media-controls
            display: none !important
    &-play
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        cursor: pointer
        & svg
            @media only screen and (max-width: 425px)
                width: 64px
                height: 64px
    &-controllbar
        padding: 0 24px
        position: absolute
        bottom: 0
        left: 0
        display: grid
        grid-template-columns: 1fr 80px auto
        align-items: center
        width: 100%
        height: 50px
        background: rgba( 0, 0, 0, .5)
        transition: var(--transition)
        border-bottom-left-radius: var(--border-radius-lg)
        border-bottom-right-radius: var(--border-radius-lg)
        opacity: 0
        @media only screen and (max-width: 425px)
            padding: 0 8px
            grid-template-columns: 1fr 34px
            gap: 12px
            height: 40px
            background: #000
            border-bottom-left-radius: 8px
            border-bottom-right-radius: 8px
            opacity: 1 !important
        & .fullscreen
            display: flex
            align-items: center
            justify-content: center
            opacity: .7
            cursor: pointer
            transition: var(--transition)
            &:hover
                opacity: 1
            @media only screen and (max-width: 425px)
                display: none
</style>