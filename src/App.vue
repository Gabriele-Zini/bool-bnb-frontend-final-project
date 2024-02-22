<script>
import AppBody from './components/AppBody.vue';
import AppCard from './components/AppCard.vue';
import AppHeader from './components/AppHeader.vue';
import axios from 'axios';
import { store } from '../src/store'

export default {
    data() {
        return {
            store,
        };
    },

    created() {
        this.fetchData()

    },
    components: { AppHeader, AppBody, AppCard },

    methods: {
        fetchData() {
            axios.get(`${this.store.baseUrl}/api/apartments`).then((resp) => {
                console.log(resp.data.result)
            })
        },
    }
}
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