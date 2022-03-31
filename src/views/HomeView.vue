<template>
  <div class="home">
    <div class="vols container card-container">
    <vol-card v-for="vol in vols" :key="vol.idVol" 
    v-bind:idVol="vol.idVol"
    v-bind:date="vol.date.substring(0,10)"
    v-bind:heureDepart="vol.heureDepart"
    v-bind:duree="vol.duree"
    v-bind:description="vol.description"
    v-bind:astre="astres[vol.idAstre].nomAstre"
    v-bind:imageAstre="astres[vol.idAstre].image"
    v-bind:prix="vol.prix"
    v-bind:pas="pasdetir[vol.idPas].nomPas"
    v-bind:alreadyReserve="!this.loggedIn"
    v-bind:homePage="true"/> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VolCard from '@/components/VolCard.vue'
import authHeader from '../services/auth-header'
const axios = require("axios")
const API_URL = 'http://localhost:3000/';
export default {
  name: 'HomeView',
  components: {
    VolCard,
  },
  data(){
    return {
      vols : [],
      astres : {},
      pasdetir : {},

    }
  },
  computed : {
    loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
  },
  beforeCreate(){
    const config = {
        headers: authHeader()
    };
    axios.get(API_URL + 'vols',config).then((response) => {
      this.vols = response.data
      axios.get(API_URL + 'astres',config).then((response) => {
      response.data.forEach(element => {
        this.astres[element.idAstre] = element
      });
    })
    axios.get(API_URL + 'pasdetir',config).then((response) => {
      response.data.forEach(element => {
        this.pasdetir[element.idPas] = element
      });
    })
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
  background-color: rgb(9, 23, 48) !important;
  color:#f8f9fa !important;
}
body {
  background-color: rgb(249, 249, 255);;

}
.navbar{
  height: 20%;
}
#logo {
  width: 40%;
  height: 40%;
  margin:2%;
}
</style>