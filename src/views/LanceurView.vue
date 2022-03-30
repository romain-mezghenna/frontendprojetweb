<template>
  <div class="home">
    <div class="vols container card-container">
    <lanceur-card v-for="lanceur in lanceurs" :key="lanceur.idLanceur" 
    v-bind:idLanceur="lanceur.idLanceur"
    v-bind:nomLanceur="lanceur.nomLanceur"
    v-bind:companie="companies[lanceur.idCompanie].nomCompanie"
    v-bind:image="lanceur.image"/> 
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import LanceurCard from '@/components/LanceurCard.vue'
import authHeader from '../services/auth-header'
const axios = require("axios")
const API_URL = 'https://astroworld-api.herokuapp.com/';
export default {
  name: 'HomeView',
  components: {
    LanceurCard,
  },
  data(){
    return {
        lanceurs : [],
        companies : {},
    }
  },
  mounted(){
    const config = {
        headers: authHeader()
    };
    axios.get(API_URL + 'lanceurs',config).then((response) => {
      this.lanceurs = response.data
      axios.get(API_URL + 'companies',config).then((response) => {
        response.data.forEach((element) => {
            this.companies[element.idCompanie] = element
        })
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