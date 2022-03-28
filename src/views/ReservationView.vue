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
    v-bind:alreadyReserve="true"
    v-bind:homePage="false"/> 
    <h3 v-if="this.vols.length == 0" class="text-dark" for="">Vous n'avez aucune réservation</h3>
    </div>
    
  </div>
</template>

<script>
import authHeader from '../services/auth-header'
import VolCard from '../components/VolCard.vue'
const axios = require('axios')
const API_URL = 'http://localhost:3000/';
export default {
    name: 'ReservationView',
    components: {
        VolCard,
    },
    data(){
        return {
            vols : [], 
            astres : [],
            pasdetir : [],
            empty : true,
        }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentUser() {
          if(this.loggedIn){
              return this.$store.state.auth.user.user;
          } else {
              return null
          }
        }
    },
    created(){
        const config = {
            headers: authHeader()
        };
        axios.get(API_URL + 'reserver/user/' + this.currentUser.idUser,config).then((response) => {
            if(response.data.length > 0){
                this.empty = false
                response.data.forEach(element => {
                axios.get(API_URL + 'vols/' + element.idVol,config).then((response) => {
                    this.vols.push(response.data)
                })
                });
            } 
        })
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
    }
}
</script>

<style>

</style>