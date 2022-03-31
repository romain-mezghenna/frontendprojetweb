<template>
  <div class="col-md-12">
    <div class="card card-container">
        <div class="loginForm">
            <label class="form-label" for="nom">Nom</label>
            <input class="form-control" type="text" v-model="this.lanceur.nomLanceur" required/>
            <label class="form-label" for="text">Companie exploitante </label>
            <companie-select v-model="this.lanceur.idCompanie" required/>
            <label class="form-label" for="ville">Url de l'image </label>
            <input class="form-control" type="url" v-model="this.lanceur.image" required/>
            <button id="registerButton" class="form-control btn btn-success" style="margin-top:10%;" @click="handleSave()">Enregister le lanceur</button>
            <p class="form-label text-danger"> {{this.message}}</p>
        </div>
    </div>
  </div>
</template>
<script>
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
import authHeader from "../services/auth-header"
import CompanieSelect from '@/components/CompanieSelect.vue';
export default {
  name: 'AddLanceur',
  data() {
    return {
      lanceur: {
        nomLanceur : '',
        idCompanie : '',
        image : '',
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
        return this.lanceur.nomLanceur.length > 0 && this.lanceur.idCompanie > 0 && this.lanceur.image.length > 0 
    },
  },
  methods: {
    handleSave() {
      if(this.validForm){
        this.loading = true;
        const config = {
            headers: authHeader()
        }
        axios.post(API_URL + 'lanceurs',this.lanceur,config).then((response) => {
            window.alert("Lanceur crée avec succès")
            this.$router.push('/ships')
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
    CompanieSelect,
  }
};
</script>
<style></style>