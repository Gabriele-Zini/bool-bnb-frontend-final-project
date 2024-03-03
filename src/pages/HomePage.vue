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
      currentPage: 1,
      totalPages: 1,
      location: '',
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
      axios.get(`${this.store.baseUrl}/api/apartments?page=${this.currentPage}`).then((resp) => {
        console.log(resp.data);
        this.apartments = resp.data.result.data;
        this.totalPages = resp.data.result.last_page;
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

    changePage(page) {
      this.currentPage = page;
      this.fetchData();
      window.scrollTo({
      top: 400,
      behavior: "smooth",
      duration:1000
    });
    },

    startSearch() {
      this.$router.push({ path: '/search', query: { location: this.location } });
    }
  },
};
</script>
<template>
  <div class="ms_container mt-5">
    <div class="row h-100">
      <div class="col-auto mx-auto title">
        <h1>BOOLBNB</h1>
      </div>
    </div>
  </div>

  <!-- apartment--card -->
  <div class="container-fluid">
    <div class="row justify-content-center my-5">
      <div class="col-12 col-md-6 col-lg-4 col-xl-4 g-5" v-for="apartment in apartments" :key="apartment.id">
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
        </div>
      </div>

    </div>
    <nav aria-label="Page navigation d-flex justify-content-between" class="my-4 container">

      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
            Previous<span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
            Next <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>

      <div class="ms_searchbox">
        <input type="text" placeholder="Find your destination" v-model="location">
        <button @click="startSearch" :disabled="location == ''">Search</button>
      </div>
    </nav>
  </div>

  <AppModal :slug="slug" />
</template>
<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;
@import "@fortawesome/fontawesome-free/css/all.css";

.ms_container {
  background-image: url(../assets/img/interior-home.jpg);
  background-size: cover;
  background-position: bottom;
  height: 500px;
  width: 100%;

  .title {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;

    h1 {
      font-size: 8vw;
      color: white;
      text-shadow: 4px 4px 6px black;
    }
  }
}
</style>
