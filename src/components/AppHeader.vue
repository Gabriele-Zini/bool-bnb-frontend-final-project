<script>
export default {
    data() {
        return {
            links: [
                {
                    name: 'home',
                    title: 'Home'
                },
                {
                    name: 'search',
                    title: 'Search'
                },
            ]
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg  border-bottom border danger p-3">
        <div class="container-fluid">
            <a class="logo" href="#"><img src="../assets/img/b.png" alt=""></a>
            <!-- <a class="navbar-brand" href="#">BoolBnB</a> -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="ms-auto navbar-nav">
                    <li class="nav-item" v-for="link in links" :key="link.title">
                        <router-link :to="{ name: link.name }" class="nav-link">{{ link.title }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<style lang="scss" scoped>
.logo {
    img {
        max-height: 40px;
        border-radius: 10px;
    }
}
.navbar {
    display: flex;
    justify-content: center;
    a {
        margin-left: 5px;
    }

    a:hover {
        color: #36BFFA;
        border-radius: 10px;
        background: none;
    }
}
h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    color: white;
}
</style>