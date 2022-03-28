<template>
<div class="card mb-3 rounded" style="width: 18rem;">
    <img :src="require('../assets/images/' + this.image)" alt="" srcset="" class="card-img-top">
    <div class="card-body d-flex flex-column">
        <h4 for="" class="card-title">{{this.nomAstre}}</h4>
        <p style="font-family:Helvetica, sans-serif;" class="card-text">{{this.description}}</p>
    </div> 
</div>
    
</template>

<script>
export default {
    props : {
        idAstre: {
            type : Number
        },
        nomAstre : {
            type : String
        },
        description : {
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
</style>