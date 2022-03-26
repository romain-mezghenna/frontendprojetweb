<template>
    <div class="col-md-12">
    <div class="card card-container">
        <label for="">Check this if you want to update your account</label>
        <input type="checkbox" v-model="update">
        <div class="loginForm">
            <label for="nom">Nom </label>
            <input type="text" :disabled="!update" :placeholder="this.currentUser.nomUser" v-model="this.user.nomUser" />
            <label for="prenom">Prenom </label>
            <input type="text" :disabled="!update"  v-model="this.user.prenomUser" :placeholder="this.currentUser.prenomUser" />
            <label for="login">Addresse Email</label>
            <input type="text"  :disabled="!update" v-model="this.user.mail" :placeholder="this.currentUser.mail" />
            <label for="password">Mot de passe </label>
            <input type="password" :disabled="!update"  v-model="this.user.password" :placeholder="this.currentUser.password" />
            <label for="tel">Numéro de téléphone </label>
            <input type="text" :disabled="!update" v-model="this.user.tel" :placeholder="this.currentUser.tel"/>
            <label for="ville">Ville </label>
            <ville-select v-model="this.user.nomVille" v-bind:selectVille="this.currentUser.idVille" :disabled="!update"/>
            <label for="ville">Pays </label>
            <pays-select v-model="this.user.idPays" :disabled="!update" />
            <button v-if="update" @click="handleUpdate()">Update</button>
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
const axios = require('axios')
const API_URL = 'http://localhost:3000/';
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
            userUpdate.password = this.user.password
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

</style>