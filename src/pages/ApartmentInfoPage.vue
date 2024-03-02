		
<script>
import axios from 'axios';
import { store } from '../store';
import AppModal from "../components/AppModal.vue";
export default {

    props: {
        slug: String,
    },

    data() {
        return {
            store,
            apartment: {},
            loading: false,
            ip: null,
            apartment_id: undefined,
            slug: "",
            error: "",
            checkError: false,
            messageSucces: false,
            checkCoverImage: false,
            imagesFlag: true,
            images: [],
        };
    },

    components: {
        AppModal,
    },
    methods: {
        message(slug) {
            this.slug = slug;
        }
    },


    created() {
        axios.get(`${this.store.baseUrl}/api/apartments/${this.$route.params.slug}`).then((resp) => {
            console.log(resp.data.result.images);
            this.loading = true;
            this.apartment = resp.data.result;
            this.apartment_id = resp.data.result.id

            axios.get('https://api.db-ip.com/v2/free/self').then(resp => {
                // console.log(resp.data.ipAddress)
                this.ip = resp.data.ipAddress;
                console.log(this.apartment_id)
                console.log(this.ip)
                const params = {
                    user_ip: this.ip,
                    apartment_id: this.apartment_id
                }
                axios.post(`${this.store.baseUrl}/api/get-view`, params)
            })
            let images = resp.data.result.images
            if (images.length === 0) {
                this.imagesFlag = false;
            }

            for (let i = 0; i < images.length; i++) {
                if (images[i].cover_image === 1) {
                    this.checkCoverImage = true;
                    console.log(this.checkCoverImage)
                }
            }
            console.log(this.apartment);
        })
    }

}
</script>
<template>
    <div class="container">
        <div class="row justify-content-center g-5" v-if="loading && checkCoverImage === true">
            <h4 class="mb-4 text-center text-center fs-2"> {{ apartment.title }} </h4>

            <!-- gallery -->
            <h4 v-if="images" class="fs-3 mt-5 text-center">Gallery</h4>

                <div class="col-12 col-sm-10 col-md-6 col-lg-4 mx-auto ms_image-details-page-box"
                    v-for="image in apartment.images">

                    <div>
                        <img :src="`${store.baseUrl}/storage/image_path/${image.image_path}`" class="border rounded"
                            :alt="apartment.title">
                    </div>

                </div>

        </div>

        <!-- apartment infos -->
        <div class="row justify-content-center mt-5">

            <div class="col-12 col-sm-10 col-md-9 col-lg-8 col-xl-6">
                <div class="cards text-center border-top border-bottom w-100 pb-4 pt-4">
                    <div class="my_column">
                        <h4 class="text-center mb-5 fs-3 pt-3 my_text">Caratterische</h4>
                        <ul class="">
    
                            <li><strong><i class="fa-solid fa-house"></i> Meters square:</strong> {{
                                apartment.apartment_info.mt_square }} </li>
                            <li><i class="fa-solid fa-bath"></i> <strong>Bathrooms:</strong> {{
                                apartment.apartment_info.num_bathrooms }}</li>
                            <li><i class="fa-solid fa-bed"></i> <strong>Beds:</strong> {{
                                apartment.apartment_info.num_beds
                            }} </li>
                            <li><i class="fa-solid fa-hotel"></i> <strong>Rooms:</strong> {{
                                apartment.apartment_info.num_rooms }}</li>
                            <li><i class="fa-solid fa-road"></i> <strong>Is located in:</strong> {{
                                apartment.street_name }}
                                n. {{ apartment.street_number }}, {{
                                    apartment.postal_code }}, {{ apartment.city }} ({{ apartment.country }})
                            </li>
                            <li><strong>Services: </strong>
                                <p class="d-inline" v-for="(service, index) in apartment.services" :key="service.index">
                                    {{ index > 0 ? ', ' : '' }}{{ service.name }}{{ index == apartment.services.length -
                                        1 ? '.' : '' }}
                                </p>
                            </li>
                        </ul>
    
    
                        <!-- button to send messages to apartment -->
                        <a href="#" class="my_btn_warning my_btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            @click="message(apartment.slug)">Send a
                            message
                        </a>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppModal :slug="slug" />
</template>
        
<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;


.my_column {
    background-color: #EAECF0;
    border: 1px solid #EAECF0;
    border-radius: 10px;
    padding: 3rem;

    .my_text {
        padding: 0 0 0 2rem;
    }

    ul li {
        margin: 0.5rem;
        list-style-type: none;
    }

    .my_btn {
        margin: 0 0 0 1.5rem;
    }

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