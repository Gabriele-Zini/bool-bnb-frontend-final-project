<script>
//tom tom imports
import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";
import { store } from "../store";
import axios from "axios";
import AppModal from "../components/AppModal.vue";

export default {
  data() {
    return {
      store,
      radius: 20,
      showRadius: false,
      latitude: "",
      longitude: "",
      num_beds: "",
      num_rooms: "",
      num_bathrooms: "",
      mt_square: "",
      services: [],
      selectedServices: [],
      apartmentInfo: {},
      filteredApartments: [],
      markers: [],
      slug: "",
      params: 0,
      results: true,
    };
  },

  components: {
    AppModal,
  },

  mounted() {
    this.fetchServices();
    this.mapInit();
  },

  methods: {
    message(slug) {
      this.slug = slug;
    },


    mapInit() {
      const successCallback = (position) => {
        let center = { lat: position.coords.latitude, lng: position.coords.longitude };

        // create map and assign to html element "map"
        let map = tt.map({
          key: "HAMFczyVGd30ClZCfYGP9To9Y18u6eq7",
          container: "map",
          center: center,
          zoom: 10,
        });

        // map.on("load", () => {
        //   let element = document.createElement("div");
        //   element.id = "marker";
        //   element.innerHTML = "125$";
        //   new tt.Marker({ element: element }).setLngLat(center).addTo(map);
        // });

        // add map options
        let options = {
          searchOptions: {
            key: "HAMFczyVGd30ClZCfYGP9To9Y18u6eq7",
            language: "en-GB",
            limit: 5,
            zoom: 10,
          },
          autocompleteOptions: {
            key: "HAMFczyVGd30ClZCfYGP9To9Y18u6eq7",
            language: "en-GB",
          },
        };

        // add map searchbox
        const ttSearchBox = new SearchBox(services, options);
        map.addControl(ttSearchBox, "top-left")

        // add placeholder
        ttSearchBox.updateOptions({
          showSearchButton: false,
          labels: {
            placeholder: "Start from a position",
          },
        });

        ttSearchBox.on("tomtom.searchbox.resultsfound", (e) => {

        });

        // action after selecting a result from suggested
        ttSearchBox.on("tomtom.searchbox.resultselected", (e) => {

          // assign coordinates to variables handling event results
          this.latitude = e.data.result.position.lat;
          this.longitude = e.data.result.position.lng;
          this.fetchData();

          // add marker for the current position
          let startPosition = new tt.Marker().setLngLat(e.data.result.position).addTo(map);
          map.flyTo({ center: e.data.result.position });

          const popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35],
          }

          const popup = new tt.Popup({ offset: popupOffsets }).setHTML(
            "start position"
          )
          startPosition.setPopup(popup).togglePopup()

          console.log(this.markers);
          if (this.results === true) {
            console.log(this.results);
            for (let i = 0; i < this.markers.length; i++) {
              const marker = this.markers[i].center;
              console.log(marker);
              new tt.Marker().setLngLat(marker).addTo(map).setPopup(new tt.Popup({ offset: popupOffsets }).setHTML(
            `${this.markers[i].name}`
          ));
            }

          }
        });

        ttSearchBox.on("tomtom.searchbox.resultfocused", (e) => {

        });

        ttSearchBox.on("tomtom.searchbox.resultscleared", (e) => {

        });
      };
      const errorCallback = (error) => {
        console.log(error);
      };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },


    fetchData() {
      if (!this.latitude && !this.longitude) {

        this.params = 1;

        return; // Se tutti i parametri sono vuoti, esci dalla funzione senza fare nulla

      } else {

        this.params = 2;
        const queryParams = {
          latitude: this.latitude,
          longitude: this.longitude,
          services: this.selectedServices,
          radius: this.radius,
        };

        if (this.num_rooms) {
          queryParams.num_rooms = this.num_rooms;
        }
        if (this.num_beds) {
          queryParams.num_beds = this.num_beds;
        }
        if (this.num_bathrooms) {
          queryParams.num_bathrooms = this.num_bathrooms;
        }
        if (this.mt_square) {
          queryParams.mt_square = this.mt_square;
        }

        axios
          .get(`${this.store.baseUrl}/api/get-apartments`, {
            params: queryParams,
          })
          .then((resp) => {
            this.params = 2;
            this.filteredApartments = resp.data.result;

            if (resp.data.success === false) {

              this.results = false;

            } else {

                this.filteredApartments.forEach(apartment => {
                let curApartment = {
                  'name': apartment.title,
                  'center': [apartment.longitude, apartment.latitude],
                }
                
                console.log(curApartment.center);
                
                this.markers.push(curApartment);
                console.log(this.markers);
                this.params = 0;

                this.results = true;
              });
            }
          })
      }
    },


    fetchServices() {
      axios.get(`${this.store.baseUrl}/api/services`).then((resp) => {
        this.services = resp.data.result;
      });
    },


    updateSelectedServices(serviceName) {
      if (this.selectedServices.includes(serviceName)) {
        this.selectedServices = this.selectedServices.filter((id) => id !== serviceName);
      } else {
        this.selectedServices.push(serviceName);
      }
    },


    toggleRadius() {
      this.showRadius = !this.showRadius;
    },


    resetPosition() {
      const searchBox = document.querySelector(".tt-search-box");
      searchBox.querySelector("input").value = "";
      (this.radius = 20), (this.latitude = "");
      this.longitude = "";
    },


    resetParameters() {
      const searchBox = document.querySelector(".tt-search-box");
      searchBox.querySelector("input").value = "";
      (this.radius = 20), (this.latitude = "");
      this.longitude = "";
      this.num_rooms = "";
      this.num_beds = "";
      this.num_bathrooms = "";
      this.mt_square = "";
    },


    getImage(imgPath) {
      return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
    },


    truncateString(stringa, lunghezzaMassima) {
      if (stringa.length <= lunghezzaMassima) {
        return stringa;
      } else {
        return stringa.substring(0, lunghezzaMassima) + "...";
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- form to request data -->
      <div class="col-xl-10 col-md-10 col-ms-12 border-bottom pb-4">
        <h4 class="p-4">Select a position:</h4>
        <form @submit.prevent="fetchData()" action="" method="GET">
          <div class="row">
            <div class="col-8">
              <div class="map form-control" id="map"></div>
              <!-- <button class="btnn" @click="resetPosition()">
                reset position
              </button> -->

              <div class="my-3 radius">
                <a class="cursor-pointer" v-on:click="toggleRadius">set radius &DownArrow;</a>
                <div class="mb-3 mt-4 radius-div w-50" :class="{ 'd-none': !showRadius }">
                  <label for="raiuds" class="form-label">Radius in km:</label>
                  <input type="number" class="form-control" id="raiuds" name="raiuds" v-model="radius" />
                </div>
              </div>
            </div>
            <!-- radius -->
            <div class="col-4 bro">
              <!-- latitude -->
              <div class="mb-3 d-none">
                <label for="latitude" class="form-label">Latitude:</label>
                <input type="text" class="form-control" id="latitude" name="latitude" v-model="latitude" />
              </div>
              <!-- longitude -->
              <div class="mb-3 d-none">
                <label for="longitude" class="form-label">Longitude:</label>
                <input type="text" class="form-control" id="longitude" name="longitude" v-model="longitude" />
              </div>

              <!-- APARTMENT INFOS -->

              <!-- num bed -->
              <div class="mb-3">
                <label for="num_beds" class="form-label">Beds Number:</label>
                <input type="number" class="form-control" id="num_beds" name="num_beds" v-model="num_beds" />
              </div>

              <!-- num room -->
              <div class="mb-3">
                <label for="num_rooms" class="form-label">Rooms Number:</label>
                <input type="number" class="form-control" id="num_rooms" name="num_rooms" v-model="num_rooms" />
              </div>

              <!-- num bathrooms -->
              <div class="mb-3">
                <label for="num_bathrooms" class="form-label">bathrooms Number:</label>
                <input type="number" class="form-control" id="num_bathrooms" name="num_bathrooms"
                  v-model="num_bathrooms" />
              </div>

              <div class="btn-sm my-3" role="group" aria-label="Basic checkbox toggle button group">
                <div class="row g-2">
                  <div class="" v-for="service in services">
                    <input type="checkbox" class="btn-check" :id="service.id" :name="service.name" value="1"
                      autocomplete="off" @change="updateSelectedServices(service.name)" />
                    <label class="btn btn-outline-dark" :for="service.id">
                      {{ service.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- services -->

          <div>
            <button type="submit" class="btnn me-2">Search</button>
            <button type="button" class="rem" @click="resetParameters()">
              Reset Params
            </button>
          </div>
        </form>
        <!-- requested data returns -->
        <div class="mt-5" v-if="params === 1">
          <h4>Error: Please insert geographic parameters.</h4>
        </div>
        <!-- requested data returns -->
        <div class="mt-5" v-if="!results && params !== 1">
          <h4>No apartments found</h4>
        </div>
      </div>
    </div>

    <!-- apartment--card -->
    <div class="row justify-content-center my-5" v-if="params !== 1">
      <div class="col-md-10">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-4" v-for="apartment in filteredApartments" :key="apartment.id">
            <div class="card" style="height: 30rem">
              <div v-for="image in apartment.images">
                <img v-if="image.cover_image === 1" :src="`${store.baseUrl}/storage/image_path/${image.image_path}`"
                  alt="" class="card-img-top" />
              </div>
              <!-- <div class="card-body"> -->
              <h5 class="card-title mt-2 fs-6">
                {{ truncateString(apartment.title, 15) }}
              </h5>
              <p class="m-0 p-0">
                {{ apartment.street_name }} {{ apartment.street_number }}
              </p>
              <p class="m-0 p-0">{{ apartment.city }}</p>

              <a href="#" class="btnn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="message(apartment.slug)">Send a message</a>
              <router-link :to="{ name: 'apartmentInfo', params: { slug: apartment.slug } }"
                class="rem">Mostra</router-link>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /apartment--card -->
  </div>
  <AppModal :slug="slug" />
</template>
<style lang="scss" scoped>
@use "../style/partials/mixin" as *;

.bro {
  background-color: #f2f4f7;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 20px;
}

.cursor-pointer {
  cursor: pointer;
  @include btnn();
}

.cursor-pointer:hover {
  @include hoverBtn();
}

.radius-div {
  transition: opacity 1s ease;
  opacity: 0;
}

.radius-div:not(.d-none) {
  opacity: 1;
  transition: opacity 1s ease;
}

#map {
  width: 100%;
  height: 400px;
}

img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 20px;
}
</style>
