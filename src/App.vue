<template>
  <nav>
    <router-link to="/">Home |</router-link>
    <router-link to="/about"> About |</router-link>
    <router-link v-if="!this.loggedIn" to="/login"> Se connecter |</router-link>
    <router-link v-if="!this.loggedIn" to="/register"> S'inscrire </router-link>
    <router-link v-if="this.loggedIn" to="/logout"> Se déconnecter |</router-link>
    <router-link v-if="this.loggedIn" to="/profile"> Mon profil</router-link>
    <label v-if="this.loggedIn" for="BONJOURNO">Bonjour {{this.currentUser.prenomUser}}</label>

  </nav>
  <router-view/>
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
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
