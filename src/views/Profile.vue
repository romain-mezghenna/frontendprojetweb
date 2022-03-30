<template>
    <div class="col-md-12">
    <div class="card card-container">
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" v-model="update" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault"> Modifier votre profil</label>
        </div>
        <div class="loginForm">
            <label class="form-label" for="nom">Nom </label>
            <input class="form-control" type="text" :disabled="!update" :placeholder="this.currentUser.nomUser" v-model="this.user.nomUser" />
            <label class="form-label" for="prenom">Prenom </label>
            <input class="form-control" type="text" :disabled="!update"  v-model="this.user.prenomUser" :placeholder="this.currentUser.prenomUser" />
            <label class="form-label" for="login">Addresse Email</label>
            <input class="form-control" type="text"  :disabled="!update" v-model="this.user.mail" :placeholder="this.currentUser.mail" />
            <label class="form-label" for="password">Mot de passe </label>
            <input class="form-control" type="password" :disabled="!update"  v-model="this.user.password" :placeholder="this.currentUser.password" />
            <label class="form-label" for="tel">Numéro de téléphone </label>
            <input class="form-control" type="text" :disabled="!update" v-model="this.user.tel" :placeholder="this.currentUser.tel"/>
            <label class="form-label" for="ville">Ville </label>
            <ville-select v-model="this.user.nomVille" v-bind:selectVille="this.currentUser.idVille" :disabled="!update"/>
            <label class="form-label" for="ville">Pays </label>
            <pays-select v-model="this.user.idPays" :disabled="!update" />
            <button class="form-control btn btn-success" style="margin-top:1em;" v-if="update" @click="handleUpdate()">Confirmer</button>
            <p></p>
        </div>
    </div>
  </div>
</template>

<script>
import PaysSelect from "../components/PaysSelect.vue"
import VilleSelect from "../components/VilleSelect.vue"
import User from "../models/user.js"
import authHeader from "../services/auth-header"
import SHA256 from '../security/hash'
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
export default {
    data(){
        return {
            user: new User('','',this.$store.state.auth.user.user.idUser,'','','','','',''),
            loading: false,
            update : false,
        }
    },
    name: 'Profile',
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
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  components: {
      PaysSelect,
      VilleSelect,
  },
  methods : {
      handleUpdate() {
        const config = {
        headers: authHeader()
        };
        const userUpdate = this.buildUser()
        this.loading = true;
         // Validate form
          axios.patch(API_URL + 'users/' + this.currentUser.idUser,userUpdate,config).then((response) => {
              window.alert("Veuillez vous reconnecter")
              this.$store.dispatch('auth/logout')
              this.$router.push('/login')
          }).catch((error) => {
              console.log(error);
          })
    },
    buildUser(){
        let userUpdate = {}
        userUpdate.idUser = this.user.idUser
        if(this.user.nomUser.length > 0){
            userUpdate.nomUser = this.user.nomUser
        }
        if(this.user.prenomUser.length > 0){
            userUpdate.prenomUser = this.user.prenomUser
        }
        if(this.user.mail.length > 0){
            userUpdate.mail = this.user.mail
        }
        if(this.user.password.length > 0){
            userUpdate.password = SHA256(this.user.password) 
        }
        if(this.user.tel.length > 0){
            userUpdate.tel = this.user.tel
        }
        if(this.user.nomVille.length > 0){
            userUpdate.idVille = this.user.nomVille
        }
        return userUpdate
    }
  }
};
</script>

<style>
.form-control {
    margin-bottom: 5%;
}
</style>