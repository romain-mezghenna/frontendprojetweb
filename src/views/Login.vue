<template>
  <div class="col-md-12">
    <div class="card card-container">
    <div class="loginForm">
        <label class="form-label" for="login">Addresse Email</label>
        <input type="text" class="form-control" v-model="this.user.mail" required/>
        <label class="form-label" for="password">Mot de passe </label>
        <input class="form-control" type="password" v-model="this.user.password" required/>
        <button type="submit" class=" form-control btn btn-primary" @click="handleLogin()" style="margin-top:10%;">Login</button>
        <p>{{this.message}}</p>
  </div>
    </div>
  </div>
</template>
<script>
import User from '../models/user';
export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    validEmail(){
      return this.user.mail.length > 0
    },
    validPassword(){
      return this.user.password.length > 0
    }
  },
  created() {
    if (this.loggedIn) {
        this.$router.push('/profile')
    }
    },
  methods: {
    handleLogin() {
      this.loading = true;
        if (this.validEmail && this.validPassword) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
                this.loading = false;
                this.message = "Logged In !"
                this.$router.push('/profile')
            }).catch(
            (error) => {
                this.loading = false;
                this.message = error.response.data.message || 'Email ou mot de passe erroné'
            })
          
        } else {
            this.loading = false;
            this.message = 'Email ou mot de passe manquant'
        }
    }
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