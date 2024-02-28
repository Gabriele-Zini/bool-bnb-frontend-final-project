		
<script>
import axios from 'axios';
import { store } from '../store'
export default {
    data() {
        return {
            store,
            apartment: {},
            loading: false,

        };
    },
    created() {
        axios.get(`${this.store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((resp) => {
            console.log(resp.data.result);
            this.loading = true;
            this.apartment = resp.data.result;
        })
        axios.get('https://api.db-ip.com/v2/free/self').then(resp=> {
           console.log(resp.data.ipAddress)
        })
        axios.get('https://api.ipify.org?format=json').then(resp=> {
           console.log(resp)
        })
    }

}
</script>
<template>
    <div class="container-fluid mt-5">
        <div class="row p-5">
            <div class="mx-auto" v-if="loading">
                <h2 class="mb-5 text-center"> {{ apartment.title }} </h2>
                <div class="cardss d-flex flex-wrap justify-content-center gap-2 border-bottom pb-5 rounded">
                    <div  v-for="image in apartment.images">
                        <img class="rounded" v-if="apartment.images.length === 0" :src="getImage('no_Image_Available.jpg')"
                            :alt="apartment.title">
                        <div v-else class="">
                            <div class="">
                                <img  :src="`${store.baseUrl}/storage/image_path/${image.image_path}`" class="border rounded"
                                    :alt="apartment.title">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cards text-center border-bottom w-50  pb-4 ">
                    <div class="bro">
                        <h4 class="text-center pt-3">Caratterische</h4>
                        <ul class="list">
                            <li><strong><i class="fa-solid fa-house"></i> Meters square:</strong> {{ apartment.apartment_info.mt_square }} </li>
                            <li><i class="fa-solid fa-bath"></i> <strong>Bathrooms:</strong> {{ apartment.apartment_info.num_bathrooms }}</li>
                            <li><i class="fa-solid fa-bed"></i> <strong>Beds:</strong> {{ apartment.apartment_info.num_beds }} </li>
                            <li><i class="fa-solid fa-hotel"></i> <strong>Rooms:</strong> {{ apartment.apartment_info.num_rooms }}</li>
                            <li><i class="fa-solid fa-road"></i> <strong>Is located in:</strong> {{ apartment.street_name }} n. {{ apartment.street_number }}, {{
                        apartment.postal_code }}, {{ apartment.city }} ({{ apartment.country }})</li>
                            <li><strong>Services: </strong>
                    <p class="d-inline" v-for="(service, index) in apartment.services" :key="service.index">{{ index > 0 ? ', ' : '' }}{{ service.name }}{{ index == apartment.services.length - 1 ? '.' : '' }}</p></li>
                        </ul>
                    <!-- <strong>Meters square:</strong> {{ apartment.apartment_info.mt_square }} <br>
                    <strong>Bathrooms:</strong> {{ apartment.apartment_info.num_bathrooms }} <br>
                    <strong>Beds:</strong> {{ apartment.apartment_info.num_beds }} <br>
                    <strong>Rooms:</strong> {{ apartment.apartment_info.num_rooms }} <br> -->

                    <!-- <strong>Is located in:</strong> {{ apartment.street_name }} n. {{ apartment.street_number }}, {{
                        apartment.postal_code }}, {{ apartment.city }} ({{ apartment.country }}) <br>
                    <strong>Services: </strong>
                    <p class="d-inline" v-for="(service, index) in apartment.services" :key="service.index">{{ index > 0 ? ', ' : '' }}{{ service.name }}{{ index == apartment.services.length - 1 ? '.' : '' }}</p> -->
                </div>

                <div>
                </div>
            </div>
            
            </div>

            <!-- <div v-else class="col-6 mx-auto spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> -->
        </div>
    </div>
</template>
        
<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;

.bro {
  background-color: #F2F4F7;
  border: 1px solid #EAECF0;
  border-radius: 10px
}
.list {
    list-style-type: none;
}

img {
    height: 350px;
    aspect-ratio: 1/1;
}
.cards {
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    line-height: 3rem;
}

</style>