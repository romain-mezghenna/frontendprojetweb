<template>
    <select class="form-select" v-model="this.internalValue">
        <option disabled value="">Please Select</option>
        <option v-for="option in options" :key="option.idVille" :value="option.idVille" :selected="option.idVille == this.selectVille">{{option.nomVille}}</option>
    </select>
</template>

<script>
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
export default {
    name:'VilleSelect',
    props : {
        selectVille : {
            type: Number
        }
    },
    data(){
        return {
            options : [],
            internalValue : 0
        }
    },
    mounted(){
        axios.get(API_URL + 'villes').then((response) => {
            this.options = response.data
        });
    },
    watch:{
         internalValue(v){
            this.$emit('input', v);
         }
    },
    methods : {
        emitValue(v){
            this.$emit('input', v);
        }
    }
}
</script>

<style>

</style>