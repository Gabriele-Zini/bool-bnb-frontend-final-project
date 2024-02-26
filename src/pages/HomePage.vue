<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            store,
        }
        
    }
}
</script>
<template>
<div class="container-fluid">
    <div class="title m-5">
        <h1>BOOLBNB</h1>
    </div>
</div>

</template>
<style lang="scss" scoped>
.container-fluid {
    background-image: url(../assets/img/interior-home.jpg);
    background-size: cover;
    position: absolute;
    background-position: center;
    height: 500px;

    .title {
        display: flex;
        justify-content: center;
        h1 {
            font-size: 5rem;
            color: white;
        }
    }
}
</style>