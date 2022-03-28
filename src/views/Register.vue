<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form class="loginForm">
            <label class="form-label" for="nom">Nom </label>
            <input class="form-control" type="text" v-model="this.user.nomUser" required/>
            <label class="form-label" for="prenom">Prenom </label>
            <input class="form-control" type="text" v-model="this.user.prenomUser" required/>
            <label class="form-label" for="login">Addresse Email</label>
            <input class="form-control" type="text" v-model="this.user.mail" required/>
            <label class="form-label" for="password">Mot de passe </label>
            <input class="form-control" type="password" v-model="this.user.password" required/>
            <label class="form-label" for="tel">Numéro de téléphone </label>
            <input class="form-control" type="text" v-model="this.user.tel" required/>
            <label class="form-label" for="ville">Ville </label>
            <input class="form-control" type="text" v-model="this.user.nomVille" required/>
            <label class="form-label" for="ville">Pays </label>
            <pays-select v-model="this.user.idPays"/>
            <button type="submit" class="form-control btn btn-primary" style="margin-top:10%;" @click="handleRegister()">Register</button>
            <p class="form-label"> {{this.message}}</p>
        </form>
    </div>
  </div>
</template>
<script>
import User from '../models/user';
import PaysSelect from '../components/PaysSelect.vue'
export default {
  name: 'Register',
  data() {
    return {
      user: new User('','','','','','','','',''),
      loading: false,
      message: ''
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;
      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = "Succefully register !"
          this.loading = false;
          // If succefully register then login and go to profile
          this.$store.dispatch("auth/login",this.user).then(
            (data) => {
                this.$router.push("/profile");
            }
          )
          this.$router.push('/login')
        },
        (error) => {
          console.log("oui");
          this.message = error.response.data.message
          this.loading = false;
        }
      );
    }
  },
  components: {
    PaysSelect,
  }
};
</script>
<style>
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>