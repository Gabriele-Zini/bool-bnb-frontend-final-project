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
    <div class="buttons">
        <div class="btn">
            <a href="">accedi</a>
        </div>
        <div class="btn">
            <a href="">registrati</a>
        </div>
    </div>
</div>

</template>
<style lang="scss" scoped>
.container-fluid {
    background-image: url(../assets/img/interior-home.jpg);
    background-size: cover;
    position: absolute;
    background-position: center;

    .buttons {
        display: flex;
        justify-content: center;
        .btn {
            a {
                text-decoration: none;
                color: white;
                border-bottom: 1px solid white;
            }
        }
    }

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