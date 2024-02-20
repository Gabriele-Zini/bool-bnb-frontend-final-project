<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<template>
<div class="containers">
    <div class="box">
        <div class="logo text-center">
            <img src="../assets/img/b.png" alt="">
            <h1>BOOLBNB</h1>
        </div>
    <div class="title">
        <!-- <h1>OOLBNB</h1> -->
    </div>
    </div>
    <div class="navbar">
        <ul class="nav justify-content-end">
            <li class="nav-item">
                <a href="http://127.0.0.1:8000/login" class="nav-link">Accedi</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Registrati</a>
            </li>
        </ul>
    </div>
</div>

</template>
<style lang="scss" scoped>
.containers {
    background-image: url(../assets/img/bg.jpg);
    background-size: cover;
    background-position: 0px;
    border-radius: 20px;
    padding: 70px;
    margin: .5rem;

    .box {
        padding-top:50px ;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .logo {
        img {
            max-width: 80px;
            border-radius: 10px;
        }
    
    }
    .navbar {
        display: flex;
        justify-content: center;
        padding: 40px;
         
        a {
            color: white;
            border: .5px solid white;
            border-radius: 5px;
            margin-left: 5px;

        }
      
        a:hover {
            color: #36BFFA;
            border: .5px solid #36BFFA;
        }
    }

    .title {
        // top: 20px;
        // left: 50%;
        // transform: translateX(-50%);
        
    }
}
h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    color: white;
}

</style>