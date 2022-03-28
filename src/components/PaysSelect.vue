<template>
    <select class="form-select" v-model="this.internalValue">
        <option disabled value="">Veuillez choisir</option>
        <option v-for="option in options" :key="option.idPays" v-bind:value="option.idPays">{{option.nomPays}}</option>
    </select>
</template>

<script>
const axios = require('axios')
const API_URL = 'http://localhost:3000/';
export default {
    name:'PaysSelect',
    props : {},
    data(){
        return {
            options : [],
            internalValue : '',
        }
    },
    mounted(){
        axios.get(API_URL + 'pays').then((response) => {
            this.options = response.data
        });
    },
    
}
</script>

<style>

</style>