<template>
  <div class="home">
    <div class="vols container card-container">
    <astre-card v-for="astre in astres" :key="astre.idAstre" 
    v-bind:idAstre="astre.idAstre"
    v-bind:nomAstre="astre.nomAstre"
    v-bind:description="astre.description"
    v-bind:image="astre.image"/> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AstreCard from '@/components/AstreCard.vue'
import authHeader from '../services/auth-header'
const axios = require("axios")
const API_URL = 'https://astroworld-api.herokuapp.com/';
export default {
  name: 'AstreView',
  components: {
    AstreCard,
  },
  data(){
    return {
      astres : [],

    }
  },
  mounted(){
    const config = {
        headers: authHeader()
    };
    axios.get(API_URL + 'astres',config).then((response) => {
      this.astres = response.data
    })
  }
}
</script>
<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

.vols {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.home {
  background-color: rgb(249, 249, 255);
  color:#2c3e50;
}
body {
  background-color: rgb(249, 249, 255);;

}
.navbar{
  height: 20%;
}
</style>