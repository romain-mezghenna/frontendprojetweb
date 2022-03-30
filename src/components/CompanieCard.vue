<template>
<div class="card mb-3 rounded" style="width: 18rem;">
    <div class="card-body d-flex flex-column">
        <h4 for="" class="mt-auto card-title">{{this.nomCompanie}}</h4>
    </div> 
</div>
    
</template>

<script>
export default {
    props : {
        idCompanie: {
            type : Number
        },
        nomCompanie : {
            type : String
        }
    }
}
</script>

<style>
</style>