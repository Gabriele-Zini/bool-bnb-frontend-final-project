<script>
import axios from 'axios';
import { store } from '../store'
export default {
    data() {
        return {
            store,
            apartments:[],
        };
    },

    created() {
        this.fetchData()

    },
    methods: {
        fetchData() {
            axios.get(`${this.store.baseUrl}/api/apartments`).then((resp) => {
                console.log(resp.data.result.data)
                this.apartments=resp.data.result.data;
            })
        },
        getImage(imgPath) {
            return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
        }
    }
}
</script>
<template>
    <!-- <div class="box-search">
        <input class="form-control" type="text" placeholder="Search">
    </div> -->
<div class="containers">
    <!-- <div class="box-total">
        <div class="boxs r col-4">
            <h2>Cerca</h2>

        </div>
        <div class="box l col-8">
                <div v-for="index in 20" :key="index" class="card" style="width: 18rem;">
                    <img src="../assets/img/pexels-pixabay-271624.jpg" class="" alt="...">
                    <div class="card-body">
                        <p class="card-text"><i class="fa-solid fa-location-dot"></i> Bari, Italy</p>
                        <p><i class="fa-solid fa-street-view"></i> Via roma 41</p>
                        <p><strong><i class="fa-solid fa-dollar-sign"></i> 335$</strong></p>
                    </div>
                </div>
        </div>
    </div> -->
    <h2>Evidenza</h2>
    <div class="scrollable-cards-container">
  <div class="box-center">
    <div v-for="(apartment, index) in apartments" :key="apartment.id" class="card">
      <div :id="'carouselExampleIndicators_' + index" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" :data-bs-target="'#carouselExampleIndicators_' + index" :data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" :data-bs-target="'#carouselExampleIndicators_' + index" :data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" :data-bs-target="'#carouselExampleIndicators_' + index" :data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" v-for="image in apartment.images">
          <div class="carousel-item active">
            <img :src="!image.image_path ? getImage('no_Image_Available.jpg') : `${store.baseUrl}/storage/image_path/${apartment.slug}/${image.image_path}`"
            class="card-img-top" :alt="apartment.title">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExampleIndicators_' + index" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExampleIndicators_' + index" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="card pt-2">
        <div class="box-intern">
            <h5>{{ apartment.title }}</h5>
            <p>{{ apartment.city }}</p>
            <p>Number of room: {{ apartment.apartment_info.num_rooms }}</p>
            <p>Number of beds: {{ apartment.apartment_info.num_beds }}</p>
            <p><strong>240$</strong> notte</p>
        </div>
        <div class="box-ixona">
            <i class="fa-regular fa-heart"></i>
        </div>    
        </div>
    </div>

    </div>
  </div>
  <div class="moster pt-4">
    <button class="btns"><a href="">Mostra altri</a></button>
  </div>
</div>
</template>
<style lang="scss" scoped>
.containers {
    h2 {
        text-align: center;
        padding: 30px;
    }
}

.box-center {
    display: flex;
    gap: 2rem;
    overflow-x: auto; 
    padding-left: 30px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    width: 90%;
    margin: 0 auto;
    border-radius:20px ;

    &::-webkit-scrollbar {
        width: 8px; 
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent; 
    }

    .card {
        flex: 0 0 auto;
        width: 300px;
    }

    .carousel-inner {
        width: 100%;
    }
}

.box-total {
    display: flex;
    margin-top: 50px;

    .box {
        display: flex;
        justify-content: center;
        flex-wrap: nowrap; 
        gap: 2rem;
        height: 700px;
        overflow-y: auto; 
        white-space: nowrap; 
    }

    .boxs {
        padding-left: 60px;
        display: flex;
        border-bottom: 2px solid #36BFFA;
        button {
            background-color: #36BFFA;
            border: none;

            
        }
    }
}

.card {
    border: none;
    vertical-align: baseline;
    line-height: 0.8rem;
    border: none;
    background: none;
    display: flex;
    justify-content: space-between;
    flex: 0 0 auto;

    img {
        border-radius: 20px;
        width: 100%;
        height: auto;
    }
}
.moster {
display: flex;
justify-content: center;

.btns {
    
    text-decoration: none;
    border: none;
    background:none;
        a {
            border: .5px solid #36BFFA;
            text-decoration: none;
            padding: 10px;
            border-radius: 10px;
            color: #36BFFA;
        }
        a:hover {
            background-color: #36BFFA;
            color: white;
            border: none;
        }
}
}
</style>
