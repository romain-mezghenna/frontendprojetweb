<template>
  <div class="home">
    <div class="vols container card-container">
    <companie-card v-for="companie in companies" :key="companie.idCompanie" 
    v-bind:idCompanie="companie.idCompanie"
    v-bind:nomCompanie="companie.nomCompanie"/> 
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import authHeader from '../services/auth-header'
import CompanieCard from '@/components/CompanieCard.vue';
const axios = require("axios")
const API_URL = 'https://astroworld-api.herokuapp.com/';
export default {
  name: 'CompanieView',
  components: {
    CompanieCard,
  },
  data(){
    return {
        companies : [],
    }
  },
  mounted(){
    const config = {
        headers: authHeader()
    };
      axios.get(API_URL + 'companies',config).then((response) => {
            this.companies = response.data
      })
    
  }
}
</script>
<style>
</style>