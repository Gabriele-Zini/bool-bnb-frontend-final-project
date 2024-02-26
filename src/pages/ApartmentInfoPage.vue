		
<script>
import axios from 'axios';
import { store } from '../store'
export default {
    data() {
        return {
            store,
            apartment: {},
            loading: false
        };
    },
    created() {
        axios.get(`${this.store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((resp) => {
            console.log(resp.data.result);
            this.loading = true;
            this.apartment = resp.data.result;
        })
    }

}
</script>
<template>
    <div class="container-fluid">
        <div class="row text-center mt-4">
            <div class="col-6 mx-auto" v-if="loading">

                <h2 class="my-3"> {{ apartment.title }} </h2>

                <div v-for="image in apartment.images">
                    <img v-if="apartment.images.length === 0" :src="getImage('no_Image_Available.jpg')"
                        :alt="apartment.title">
                    <div v-else class="">
                        <div class="">
                            <img :src="`${store.baseUrl}/storage/image_path/${image.image_path}`" class=""
                                :alt="apartment.title">
                        </div>
                    </div>
                </div>


                <div class="my-3">
                    <strong>Meters square:</strong> {{ apartment.apartment_info.mt_square }} <br>
                    <strong>Bathrooms:</strong> {{ apartment.apartment_info.num_bathrooms }} <br>
                    <strong>Beds:</strong> {{ apartment.apartment_info.num_beds }} <br>
                    <strong>Rooms:</strong> {{ apartment.apartment_info.num_rooms }} <br>

                    <strong>Is located in:</strong> {{ apartment.street_name }} n. {{ apartment.street_number }}, {{
                        apartment.postal_code }}, {{ apartment.city }} ({{ apartment.country }})
                </div>

                <strong>Services:</strong>
                <div>
                    <p class="d-inline" v-for="(service, index) in apartment.services" :key="service.index">{{ index > 0 ? ', ' : '' }}{{ service.name }}{{ index == apartment.services.length - 1 ? '.' : '' }}</p>
                </div>


            </div>

            <div v-else class="col-6 mx-auto spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>
        
<style lang="scss" scoped>
img {
    width: 200px;
    height: 200px;
}
</style>