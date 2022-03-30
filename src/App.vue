<template>
<header>
  <nav class="navbar justify-content-center navbar-static-top">
    <a href="" class="logoHeader"><img src="./assets/logo.png" alt="logo" id="logo" class="img-fluid"></a>
    <router-link class="nav-item nav-link link-light" to="/">Vols</router-link>
    <router-link class="nav-item nav-link link-light" to="/astres">Astres</router-link>
    <router-link class="nav-item nav-link link-light" to="/ships">Lanceurs</router-link>
    <router-link class="nav-item nav-link link-light" to="/companies">Companies</router-link>
    <router-link class="nav-item nav-link link-light" v-if="!this.loggedIn" to="/login">Se connecter</router-link>
    <router-link class="nav-item nav-link link-light" v-if="!this.loggedIn" to="/register">S'inscrire</router-link>
    <router-link class="nav-item nav-link link-light" v-if="this.loggedIn" to="/reservations">Mes réservations</router-link>
    <router-link class="nav-item nav-link link-light" v-if="this.loggedIn" to="/profile">Mon profil</router-link>
    <router-link class="nav-item nav-link link-light" v-if="this.loggedIn" to="/logout">Se déconnecter</router-link>
    <div class="dropdown nav-item  link-light"  v-if="this.loggedIn && this.currentUser.isAdmin">
      <a class="nav-link dropdown-toggle hover" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Administration
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <router-link class="dropdown-item nav-link" to="/newvol">Ajouter un vol</router-link>
        <router-link class="dropdown-item nav-link" to="/newastre">Ajouter un astre</router-link>
        <router-link class="dropdown-item nav-link" to="/newlanceur">Ajouter un lanceur</router-link>
      </div> 
    </div>
  </nav>

</header>
  
  <label class="text-light" id="bonjour" v-if="this.loggedIn" for="BONJOURNO">Bonjour {{this.currentUser.prenomUser}}</label>
  <router-view/>
  <footer class="d-flex mt-auto justify-content-center align-items-center p-4 border-bottom" style="background-color: rgb(0,0,0); color:whitesmoke;">
    <div class="text-center p-4">
      © 2022 Copyright : Romain Mezghenna
    </div>
    <div class="text-center p-4">
      <img class="img-fluid" style="height:60px;" src="./assets/logo_polytech.png" alt="" srcset="">
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


header{
  z-index:1000000 !important;
}
.dropdown-menu.show{
  background-color: black;
  z-index:1000000 !important;
}

.hover:hover {
  border: 1px solid red;
  z-index:1000000 !important;
}
.hover {
  border: 1px solid black;
  border-radius: 5px;
}
.dropdown-menu a{
  background-color: black;
  color: #f8f9fa;
}
.dropdown-item:hover {
  background-color: rgba(53, 53, 53, 0.1) !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(9, 23, 48);

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
.navbar {
  z-index:1000000 !important;
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

  a:hover {
    color: red !important;
  }
}
</style>
