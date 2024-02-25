<script>
//tom tom imports
import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      radius: 20,
      showRadius: false,
      country_code: "",
      postal_code: "",
      street_name: "",
      street_number: "",
      latitude: "",
      longitude: "",
      city: "",
      country: "",
      num_beds: "",
      num_rooms: "",
      num_bathrooms: "",
      mt_square: "",
      services: [],
      selectedServices: [],
      apartmentInfo: {},
      filteredApartments: [],
    };
  },
  mounted() {
    this.mapInit();
    this.fetchServices();
  },
  methods: {
    mapInit() {
      const successCallback = (position) => {
        let center = { lat: position.coords.latitude, lng: position.coords.longitude };

        let map = tt.map({
          key: "HAMFczyVGd30ClZCfYGP9To9Y18u6eq7",
          container: "map",
          center: center,
          zoom: 10,
        });

        map.on("load", () => {
          let element = document.createElement("div");
          element.id = "marker";
          element.innerHTML = "125$";
          new tt.Marker({ element: element }).setLngLat(center).addTo(map);
        });

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

        const ttSearchBox = new SearchBox(services, options);

        ttSearchBox.on("tomtom.searchbox.resultselected", (e) => {
          map.flyTo({ center: e.data.result.position });
          console.log(e.data.result.position);
          this.street_name = e.data.result.address.streetName;
          this.street_number = e.data.result.address.streetNumber;
          this.postal_code = e.data.result.address.postalCode;
          this.country_code = e.data.result.address.countryCode;
          this.country = e.data.result.address.country;
          this.city = e.data.result.address.municipality;
          this.latitude = e.data.result.position.lat;
          this.longitude = e.data.result.position.lng;
        });
        ttSearchBox.on("tomtom.searchbox.resultcleared", function () {
          console.log("prova");
        });
        map.addControl(ttSearchBox, "top-left");
      };
      const errorCallback = (error) => {
        console.log(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },
    fetchData() {
      if (
        !this.city &&
        !this.street_number &&
        !this.street_name &&
        !this.postal_code &&
        !this.country_code &&
        !this.country &&
        !this.latitude &&
        !this.longitude &&
        !this.num_rooms &&
        !this.num_beds &&
        !this.num_bathrooms &&
        !this.mt_square &&
        this.selectedServices.length === 0
      ) {
        // Se tutti i parametri sono vuoti, esci dalla funzione senza fare nulla
        return;
      }
      const queryParams = {
        city: this.city,
        street_number: this.street_number,
        street_name: this.street_name,
        postal_code: this.postal_code,
        country_code: this.country_code,
        country: this.country,
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
        .get(`${this.store.baseUrl}/api/apartments`, {
          params: queryParams,
        })
        .then((resp) => {
          this.filteredApartments = resp.data.result;
          console.log(resp);
          const searchBox = document.querySelector(".tt-search-box");
          searchBox.querySelector("input").value = ""; // Cancella il valore dalla casella di ricerca
          this.resetParameters();
        });
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
    resetParameters() {
      (this.radius = 20), (this.city = "");
      this.street_number = "";
      this.street_name = "";
      this.postal_code = "";
      this.country_code = "";
      this.country = "";
      this.latitude = "";
      this.longitude = "";
    },
    getImage(imgPath) {
      return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <!-- form to request data -->
      <div class="col-4 text-center border border-2 p-3">
        <form @submit.prevent="fetchData()" action="" method="GET">
          <h4 class="mt-2">Select a position:</h4>
          <div class="map form-control" id="map"></div>

          <!-- radius -->
          <div class="my-3">
            <a class="cursor-pointer" v-on:click="toggleRadius">set radius</a>
            <div class="mb-3 mt-4 radius-div" :class="{ 'd-none': !showRadius }">
              <label for="raiuds" class="form-label">Radius in km:</label>
              <input
                type="number"
                class="form-control"
                id="raiuds"
                name="raiuds"
                v-model="radius"
              />
            </div>
          </div>

          <!-- country code -->
          <div class="mb-3 d-none">
            <label for="country_code" class="form-label">Country code:</label>
            <input
              type="number"
              class="form-control"
              id="country_code"
              name="country_code"
              v-model="country_code"
            />
          </div>

          <!-- country -->
          <div class="mb-3 d-none">
            <label for="country" class="form-label">Country:</label>
            <input
              type="text"
              class="form-control"
              id="country"
              name="country"
              v-model="country"
            />
          </div>

          <!-- postal code -->
          <div class="mb-3 d-none">
            <label for="postal_code" class="form-label">Postal code:</label>

            <input
              type="number"
              class="form-control"
              id="postal_code"
              name="postal_code"
              v-model="postal_code"
            />
          </div>

          <!-- city -->
          <div class="mb-3 d-none">
            <label for="city" class="form-label">City:</label>
            <input
              type="text"
              class="form-control"
              id="city"
              name="city"
              v-model="city"
            />
          </div>

          <!-- street name -->
          <div class="mb-3 d-none">
            <label for="street_name" class="form-label">Street Name:</label>
            <input
              type="text"
              class="form-control"
              id="street_name"
              name="street_name"
              v-model="street_name"
            />
          </div>

          <!-- street number -->
          <div class="mb-3 d-none">
            <label for="street_number" class="form-label">Street Number:</label>
            <input
              type="number"
              class="form-control"
              id="street_number"
              name="street_number"
              v-model="street_number"
            />
          </div>

          <!-- latitude -->
          <div class="mb-3 d-none">
            <label for="latitude" class="form-label">Latitude:</label>
            <input
              type="text"
              class="form-control"
              id="latitude"
              name="latitude"
              v-model="latitude"
            />
          </div>
          <!-- longitude -->
          <div class="mb-3 d-none">
            <label for="longitude" class="form-label">Longitude:</label>
            <input
              type="text"
              class="form-control"
              id="longitude"
              name="longitude"
              v-model="longitude"
            />
          </div>

          <!-- APARTMENT INFOS -->

          <!-- num bed -->
          <div class="mb-3">
            <label for="num_beds" class="form-label">Beds Number:</label>
            <input
              type="text"
              class="form-control"
              id="num_beds"
              name="num_beds"
              v-model="num_beds"
            />
          </div>

          <!-- num room -->
          <div class="mb-3">
            <label for="num_rooms" class="form-label">Rooms Number:</label>
            <input
              type="text"
              class="form-control"
              id="num_rooms"
              name="num_rooms"
              v-model="num_rooms"
            />
          </div>

          <!-- num bathrooms -->
          <div class="mb-3">
            <label for="num_bathrooms" class="form-label">bathrooms Number:</label>
            <input
              type="text"
              class="form-control"
              id="num_bathrooms"
              name="num_bathrooms"
              v-model="num_bathrooms"
            />
          </div>

          <!-- mt_square -->
          <div class="mb-3">
            <label for="mt_square" class="form-label">Mt. square:</label>
            <input
              type="text"
              class="form-control"
              id="mt_square"
              name="mt_square"
              v-model="mt_square"
            />
          </div>

          <!-- services -->
          <div
            class="btn-group btn-group-sm my-3"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <div class="row g-2 justify-content-start align-items-center">
              <div class="col" v-for="service in services">
                <input
                  type="checkbox"
                  class="btn-check"
                  :id="service.id"
                  :name="service.name"
                  value="1"
                  autocomplete="off"
                  @change="updateSelectedServices(service.name)"
                />
                <label class="btn btn-outline-primary ms_whitespace" :for="service.id">
                  {{ service.name }}
                </label>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" class="btn btn-success me-3">Search</button>
          </div>
        </form>
      </div>

      <!-- requested data returns -->
    </div>

    <!-- apartment--card -->
    <div class="row justify-content-center my-5">
      <div class="col-md-10">
        <div class="row">
          <div
            class="col-12 col-md-6 col-lg-3 mb-4"
            v-for="apartment in filteredApartments"
            :key="apartment.id"
          >
            <div class="card" style="height: 30rem">
              <div v-for="image in apartment.images">
                <img
                  v-if="image.cover_image === 1"
                  :src="`${store.baseUrl}/storage/image_path/${image.image_path}`"
                  alt=""
                  class="card-img-top"
                />
              </div>
              <!-- <div class="card-body"> -->
              <h5 class="card-title mt-2 fs-6">{{ apartment.title }}</h5>
              <p class="m-0 p-0">
                {{ apartment.street_name }} {{ apartment.street_number }}
              </p>
              <p class="m-0 p-0">{{ apartment.city }}</p>

              <a href="#" class="me-3">Send a message</a>
              <a href="#" class="">Details</a>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /apartment--card -->
  </div>
</template>
<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
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
  height: 300px;
}

img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 20px;
}

.card {
  border: none;
}
</style>
