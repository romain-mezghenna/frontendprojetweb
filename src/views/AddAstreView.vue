<template>
  <div class="col-md-12">
    <div class="card card-container">
        <div class="loginForm">
            <label class="form-label" for="nom">Nom</label>
            <input class="form-control" type="text" v-model="this.astre.nomAstre" required/>
            <label class="form-label" for="text">Description </label>
            <textarea class="form-control" type="text" v-model="this.astre.description" required/>
            <label class="form-label" for="ville">Url de l'image </label>
            <input class="form-control" type="url" v-model="this.astre.image" required/>
            <button id="registerButton" class="form-control btn btn-success" style="margin-top:10%;" @click="handleSave()">Enregister l'astre</button>
            <p class="form-label text-danger"> {{this.message}}</p>
        </div>
    </div>
  </div>
</template>
<script>
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
import authHeader from "../services/auth-header"
export default {
  name: 'AddAstre',
  data() {
    return {
      astre: {
        nomAstre : '',
        description : '',
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
        return this.astre.nomAstre.length > 0 && this.astre.image.length > 0  && this.astre.description.length > 0 
    },
  },
  methods: {
    handleSave() {
      if(this.validForm){
        this.loading = true;
        const config = {
            headers: authHeader()
        };
        axios.post(API_URL + 'astres',this.astre,config).then((response) => {
            window.alert("Astre crée avec succès")
            this.$router.push('/astres')
        }).catch((error) => {
              console.log(error);
        })
      } else {
            this.message = 'Vous n\'avez pas rempli les informations correctement'
      }
    }
  }
};
</script>
<style>
</style>