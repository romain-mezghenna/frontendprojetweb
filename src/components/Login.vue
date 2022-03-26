<template>
  <div class="loginForm">
    <label for="login">Addresse Email</label>
    <input type="text" v-model="this.mail" />
    <label for="password">Mot de passe </label>
    <input type="password" v-model="this.password" />
    <button @click="sendData()"></button>
    <p>{{status}}</p>
  </div>
</template>

<script>
const axios = require("axios")
const apiUrl = "https://localhost:3000"
export default {
  name: "LoginForm",
  props: {},
  data: function () {
    return {
      mail: "",
      password: "",
      status: "Not Connected",
    };
  },
  methods: {
    sendData() {
      axios.post(apiUrl + '/login', {
        mail: this.mail,
        password: this.password
      }).then((request) => {
        this.status = request.data
      }).catch((err) => {
        this.status = err
      }) 
    },
  },
};
</script>
