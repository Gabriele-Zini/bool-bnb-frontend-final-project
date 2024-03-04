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
    this.handleScroll();
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

    handleScroll() {
      document.addEventListener('scroll', (e) => {
        let myVideoHeight = document.getElementById('myVideo').offsetHeight;
        console.log(window.scrollY, this.store.headerTransparent, myVideoHeight);
        if (window.scrollY > myVideoHeight) {
          this.store.headerTransparent = false;
        } else {
          this.store.headerTransparent = true;
        }
      })
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
        duration: 1000
      });
    },

    startSearch() {
      this.$router.push({ path: '/search', query: { location: this.location } });
      window.scrollTo(0, 600);
    }
  },
};
</script>

<template>

  <div class="ms_separator">

  </div>

  <!-- video -->
  <div class="ms_container">
    <div class="row w-100">
      <div class="col-12 ms_video">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/video/homepage.mp4" type="video/mp4">
        </video>
        <h1>BoolBnB</h1>
        <p>Your Home Away From Home</p>
      </div>
    </div>
  </div>



  <!-- apartment--card -->
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="col-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3 g-5 p-3" v-for="apartment in apartments"
        :key="apartment.id">
        <div class="card position-relative border border-info ms_shadow-sponsored" style="height: 30rem">
          <i class="fa-regular fa-gem ms_icon-sponsored"></i>
          <img :src="`${store.baseUrl}/storage/image_path/${apartment.image_path}`" alt="" class="card-img-top" />
          <div class="card-body ms_card">
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
    <nav aria-label="Page navigation" class="my-4 container">

      <div class="text-center d-flex justify-content-center">
        <ul class="pagination d-flex">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link flex-grow-1" href="#" aria-label="Previous"
              @click.prevent="changePage(currentPage - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
            <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <a class="page-link flex-grow-1" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>

    </nav>

    <div class="row justify-content-center">
      <div class="col-4 box-search">
        <div class="d-flex justify-content-center">
          <input class="ms_searchbox" type="text" placeholder="Find your destination" v-model="location">
          <button class="my-btn-search" @click="startSearch" :disabled="location == ''">Search</button>
        </div>
      </div>
    </div>

  </div>

  <AppModal :slug="slug" />
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;
@import "@fortawesome/fontawesome-free/css/all.css";


.ms_headerbg {
  width: 100%;
  height: 73px;
  background-color: #f2f4f7;
}

// .ms_separator {
//   height: 1500px;
//   width: 100%;
// }

.ms_container {
  width: 100%;

  .ms_video {

    #myVideo {
      width: 102%;
      filter: brightness(0.65);
      position: relative;
    }

    h1 {
      // font-size: 4rem;
      // filter: drop-shadow(10px 10px 10px black);
    }

    p {

      // font-size: 2rem;
      // filter: drop-shadow(10px 10px 10px black);
    }
  }
}
</style>
