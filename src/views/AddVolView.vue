<template>
  <div class="col-md-12">
    <div class="card card-container">
        <div class="loginForm">
            <label class="form-label" for="nom">Date</label>
            <input class="form-control" type="date" v-model="this.vol.date" required/>
            <label class="form-label" for="prenom">Heure de départ (HH:MM:SS)</label>
            <input class="form-control" type="time" v-model="this.vol.heureDepart" required/>
            <label class="form-label" for="login">Durée en jours</label>
            <input class="form-control" type="text" v-model="this.vol.duree" required/>
            <label class="form-label" for="password">Description </label>
            <textarea class="form-control" type="password" v-model="this.vol.description" required/>
            <label class="form-label" for="ville">Astre Cible </label>
            <astre-select v-model="this.vol.idAstre" required/>
            <label class="form-label" for="ville">Prix en euros </label>
            <input class="form-control" type="text" v-model="this.vol.prix" required/>
            <label class="form-label" for="ville">Pas de tir </label>
            <pas-select v-model="this.vol.idPas" required/>
            <button id="registerButton" class="form-control btn btn-success" style="margin-top:10%;" @click="handleSave()">Enregister le vol</button>
            <p class="form-label text-danger"> {{this.message}}</p>
        </div>
    </div>
  </div>
</template>
<script>
import PasSelect from '@/components/PasSelect.vue';
import AstreSelect from '../components/AstreSelect.vue'
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
import authHeader from "../services/auth-header"
export default {
  name: 'AddVol',
  data() {
    return {
      vol: {
        date : '',
        heureDepart : '',
        duree : '',
        description : '',
        idAstre : '',
        prix : '',
        idPas : '',
        },
      loading: false,
      message: ''
    };
  },
  mounted() {
    if (!this.isAdmin) {
      this.$router.push('/')
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin(){
        return this.$store.state.auth.user.user.isAdmin
    },
    validForm(){
        return this.vol.date.length > 0 && this.vol.heureDepart.length > 0 && this.vol.duree > 0 && this.vol.description.length > 0 && this.vol.idAstre > 0 && this.vol.prix > 0 &&  this.vol.idPas > 0
    },
  },
  methods: {
    handleSave() {
      if(this.validForm){
        this.loading = true;
        const config = {
            headers: authHeader()
        };
        this.vol.heureDepart += ':00'
        axios.post(API_URL + 'vols',this.vol,config).then((response) => {
            window.alert("Vol crée avec succès")
            this.$router.push('/')
        }).catch((error) => {
            window.alert("Une erreur s'est produite veuillez réessayer")
            this.$router.go()
        })
      } else {
            this.message = 'Vous n\'avez pas rempli les informations correctement'
      }
    }
  },
  components: {
    AstreSelect,
    PasSelect,
  }
};
</script>
<style>
</style>