<template>
    <NavNavbar />
    <RouterView/>
    <footer>
    </footer>
</template>

<script setup>
import NavNavbar from "@/components/NavNavbar.vue";
</script>
<style scoped lang="sass">
footer
    height: 50px
</style>