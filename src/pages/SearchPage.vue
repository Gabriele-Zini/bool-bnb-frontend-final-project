<script>
//tom tom imports
import TomTom from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      country_code: "",
      postal_code: "",
      street_name: "",
      street_number: "",
      latitude: "",
      longitude: "",
      city: "",
      country: "",
    };
  },
  mounted() {
    this.mapInit();
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
        map.addControl(ttSearchBox, "top-left");
      };
      const errorCallback = (error) => {
        console.log(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },
    fetchData() {
      axios
        .get(`${this.store.baseUrl}/api/apartments`, {
          params: {
            latitude: this.latitude,
            longitude: this.longitude,
          },
        })
        .then((resp) => {
          console.log(resp);
        });
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

          <!-- country code -->
          <div class="mb-3">
            <label for="country_code" class="form-label">Country code:</label>
            <input
              type="text"
              class="form-control"
              id="country_code"
              name="country_code"
              v-model="country_code"
            />
          </div>
          <!-- country -->
          <div class="mb-3">
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
          <div class="mb-3">
            <label for="postal_code" class="form-label">Postal code:</label>

            <input
              type="text"
              class="form-control"
              id="postal_code"
              name="postal_code"
              v-model="postal_code"
            />
          </div>

          <!-- city -->
          <div class="mb-3">
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
          <div class="mb-3">
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
          <div class="mb-3">
            <label for="street_number" class="form-label">Street Number:</label>
            <input
              type="text"
              class="form-control"
              id="street_number"
              name="street_number"
              v-model="street_number"
            />
          </div>

          <!-- latitude -->
          <div class="mb-3">
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
          <div class="mb-3">
            <label for="longitude" class="form-label">Longitude:</label>
            <input
              type="text"
              class="form-control"
              id="longitude"
              name="longitude"
              v-model="longitude"
            />
          </div>

          <button type="submit" class="btn btn-success">Search</button>
        </form>
      </div>

      <!-- requested data returns -->
      <div class="col-4 text-center border border-2 p-3">
        <h2>Search results</h2>
        <ul>
          <li>Apartment tizio</li>
          <li>Apartment caio</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 300px;
}
</style>
