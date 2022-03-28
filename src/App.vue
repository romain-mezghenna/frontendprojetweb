<template>
<header>
  <nav class="navbar justify-content-center navbar-static-top">
    <a href="" class="logoHeader"><img src="./assets/logo.png" alt="logo" id="logo" class="img-fluid"></a>
    <router-link class="nav-item nav-link link-light" to="/">Vols</router-link>
    <router-link class="nav-item nav-link link-light" to="/astres">Astres</router-link>
    <router-link class="nav-item nav-link link-light" to="/ships">Lanceurs</router-link>
    <router-link class="nav-item nav-link link-light" v-if="!this.loggedIn" to="/login">Se connecter</router-link>
    <router-link class="nav-item nav-link link-light" v-if="!this.loggedIn" to="/register">S'inscrire</router-link>
    <router-link class="nav-item nav-link link-light" v-if="this.loggedIn" to="/reservations">Mes réservations</router-link>
    <router-link class="nav-item nav-link link-light" v-if="this.loggedIn" to="/profile">Mon profil</router-link>
    <router-link class="nav-item nav-link link-light" v-if="this.loggedIn" to="/logout">Se déconnecter</router-link>
  </nav>
 <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler ms-auto" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarToggleExternalContent3" aria-controls="navbarToggleExternalContent3"
      aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</nav>
<div class="collapse" id="navbarToggleExternalContent3">
  <div class="bg-light shadow-3 p-4">
    <button class="btn btn-link btn-block border-bottom m-0">Link 1</button>
    <button class="btn btn-link btn-block border-bottom m-0">Link 2</button>
    <button class="btn btn-link btn-block m-0">Link 3</button>
  </div>
</div>
</header>
  
  <label id="bonjour" v-if="this.loggedIn" for="BONJOURNO">Bonjour {{this.currentUser.prenomUser}}</label>
  <router-view style="color:#2c3e50;"/>
  <footer class="d-flex mt-auto justify-content-center align-items-center p-4 border-bottom" style="background-color: rgb(0,0,0); color:whitesmoke;">
    <div class="text-center p-4">
      © 2022 Copyright : Romain Mezghenna
    </div>
    <div class="text-center p-4">
      <img src="./assets/logo_polytech.png" alt="" srcset="">
    </div>
  </footer>
</template>

<script>
export default {
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
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: whitesmoke;

  #bonjour {
    margin: 1rem;
  }
}
.logoHeader {
  width: 30%;
}
header {
  background-color: rgb(0, 0, 0);
}

nav {

  padding: 30px;
  backdrop-filter: blur(5px);
  background: transparent;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    

    &.router-link-exact-active {
      color: rgb(209,46,38) !important;
    }
  }
}
</style>
