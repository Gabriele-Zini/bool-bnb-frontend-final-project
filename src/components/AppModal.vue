<script>
import axios from "axios";
import { store } from "../store";
export default {
  props: {
    slug: String,
  },
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      text: "",
      loading: false,
      store,
    };
  },
  methods: {
    sendForm() {
      this.loading = true;
      const data = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        message_content: this.text,
        slug: this.slug,
      };

      axios
        .post(`${this.store.baseUrl}/api/apartments/${slug}/messages`, data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Contact the owner</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- Form that once sended activates the axios call -->
        <form @submit.prevent="sendForm">
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Enter your information to be contacted</label
              >
              <div class="d-flex">
                <input
                  v-model="name"
                  type="text"
                  class="form-control me-1"
                  id="exampleFormControlInput1"
                  placeholder="Name"
                />
                <input
                  v-model="lastname"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Lastname"
                />
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Email address</label
              >
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Message</label>
              <textarea
                v-model="text"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your message here..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button :disabled="loading" type="submit" class="btn btn-success">
              {{ loading ? "We're sending the message..." : "Send" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
