<script>
import axios from "axios";
import { store } from "../store";
import AppModal from "../components/AppModal.vue";

export default {
  data() {
    return {
      store,
      apartments: [],
      slug: "",
      location: ''
    };
  },

  created() {
    this.fetchData();
  },
  components: {
    AppModal,
  },
  methods: {
    fetchData() {
      axios.get(`${this.store.baseUrl}/api/apartments`).then((resp) => {
        console.log(resp.data);
        this.apartments = resp.data.result.data;
      });
    },
    truncateString(stringa, lunghezzaMassima) {
      if (stringa.length <= lunghezzaMassima) {
        return stringa;
      } else {
        return stringa.substring(0, lunghezzaMassima) + "...";
      }
    },
    message(slug) {
      this.slug = slug;
    },
    search() {
      console.log(this.location);
      this.store.location = this.location;

      this.$router.push({ path: '/search', query: { location: this.location } });
      // this.$router.push('/search');
    }
  },
};
</script>
<template>
  <div class="container-fluid mt-5">
    <div class="row h-100">
      <div class="col-auto mx-auto title">
        <h1>BOOLBNB</h1>
      </div>
    </div>
  </div>

  <!-- apartment--card -->
  <div class="ms_container">
    <div class="row justify-content-center my-5">
      <div class="col-md-10">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-4" v-for="apartment in apartments" :key="apartment.id">
            <div class="card position-relative border border-info ms_shadow-sponsored" style="height: 30rem">
              <i class="fa-regular fa-gem ms_icon-sponsored"></i>
              <img :src="`${store.baseUrl}/storage/image_path/${apartment.image_path}`" alt="" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title mt-2 fs-6">
                  {{ truncateString(apartment.title, 15) }}
                </h5>
                <p class="m-0 p-0">
                  {{ apartment.street_name }} {{ apartment.street_number }}
                </p>
                <p class="mb-3 p-0">{{ apartment.city }}</p>


                <router-link :to="{ name: 'apartmentInfo', params: { slug: apartment.slug } }" class="my_btn_primary"
                  target="_blank">Details</router-link>
              </div>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /apartment--card -->
  <AppModal :slug="slug" />
  <div class="col-10 d-flex mx-auto">
    <input type="search" v-model="location" class="form-control w-25 me-1 h-100" id="search"
      placeholder="Search your destination">
    <button type="submit" :disabled="location === ''" @click="search" class="btn btn-success mb-3">Search</button>
  </div>
</template>
<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;
@import "@fortawesome/fontawesome-free/css/all.css";


.container-fluid {
  background-image: url(../assets/img/interior-home.jpg);
  background-size: cover;
  background-position: center;
  height: 500px;

  .title {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;

    h1 {
      font-size: 6.5rem;
      color: white;
      text-shadow: 4px 4px 6px black;
    }
  }


}

img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 5px;
}
</style>
