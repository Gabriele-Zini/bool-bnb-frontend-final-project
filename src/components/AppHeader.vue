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
    <!-- <div class="containers">
        <div class="box">
            <div class="logo text-center">
                <img src="../assets/img/b.png" alt="">
                <h1>BOOLBNB</h1>
            </div>
            <div class="title">
                <h1>OOLBNB</h1>
            </div>
        </div>
        <div class="navbar">
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a href="http://127.0.0.1:8000/login" class="nav-link">Accedi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Registrati</a>
                    <router-link :to="{ name: link.search }" class="nav-link">{{ link.title }}</router-link>
                </li>
            </ul>
        </div>
    </div> -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="logo" href="#"><img src="../assets/img/b.png" alt=""></a>
            <a class="navbar-brand" href="#">BoolBnB</a>
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
// .containers {
//     background-image: url(../assets/img/bg.jpg);
//     background-size: cover;
//     background-position: 0px;
//     border-radius: 20px;
//     padding: 70px;
//     margin: .5rem;

//     .box {
//         padding-top: 50px;
//         display: flex;
//         justify-content: center;
//         flex-wrap: wrap;
//     }

.logo {
    img {
        max-height: 40px;
        border-radius: 10px;
    }
}

.navbar {
    display: flex;
    justify-content: center;
    // padding: 40px;

    a {
        color: white;
        // border: .5px solid white;
        // border-radius: 5px;
        margin-left: 5px;

    }

    a:hover {
        color: #ffffff;
        border-bottom: .1px solid #ffffff;
    }
}

// .title {
//     // top: 20px;
//     // left: 50%;
//     // transform: translateX(-50%);

// }
// }

h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    color: white;
}
</style>