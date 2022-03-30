<template>
    <select class="form-select" v-model="this.internalValue">
        <option disabled value="">Veuillez choisir</option>
        <option v-for="option in options" :key="option.idPas" v-bind:value="option.idPas">{{option.nomPas}}</option>
    </select>
</template>

<script>
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
export default {
    name:'PasSelect',
    props : {},
    data(){
        return {
            options : [],
            internalValue : '',
        }
    },
    mounted(){
        axios.get(API_URL + 'pasdetir').then((response) => {
            this.options = response.data
        });
    },
    
}
</script>

<style>

</style>