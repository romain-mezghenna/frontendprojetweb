<template>
<div class="card mb-3 rounded" style="width: 18rem;">
    <img :src="this.image" alt="" srcset="" class="card-img-top imgLanceur">
    <div class="card-body d-flex flex-column">
        <h4 for="" class="mt-auto card-title">{{this.nomLanceur}}</h4>
        <p class="card-text mt-auto">Exploité par : <strong>{{this.companie}}</strong></p>
    </div> 
</div>
    
</template>

<script>
export default {
    props : {
        idLanceur: {
            type : Number
        },
        nomLanceur : {
            type : String
        },
        companie : {
            type : String
        },
        image : {
            type : String
        }
    },
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>

<style>
.imgLanceur {
    width: 95%;
    height: 70%;
}
</style>