<script>
import AppBody from './components/AppBody.vue';
import AppCard from './components/AppCard.vue';
import AppHeader from './components/AppHeader.vue';

export default {
    data() {
        return {
        };
    },
    components: { AppHeader, AppBody, AppCard }
};
</script>
<template>
<AppHeader />
<AppBody />
<AppCard />
</template>

<style lang="scss">
@use"./style/general.scss";
@import "@fortawesome/fontawesome-free/css/all.css";

</style>