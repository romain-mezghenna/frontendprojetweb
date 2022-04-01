<template>
<div class="volCard card mb-3 rounded" style="width: 18rem;">
    <img :src="this.imageAstre" alt="" srcset="" class="card-img-top">
    <div class="card-body d-flex flex-column">
        <h4 for="" class="card-title">Vol pour {{this.astre}}</h4>
        <label class="card-text" for="">le {{this.date}} à {{this.heureDepart.substring(0, this.heureDepart.length - 3)}}</label>
        <label class="card-text" for="">Depuis {{this.pas}}</label> <br>
        <strong class="card-text">{{this.duree}} jours</strong>
        <p class="card-text">{{this.description}}</p>
        <button v-if="this.homePage && this.alreadyReserve" @click="this.$router.push('/register')" type="button" class="btn mt-auto btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#detailVol' + idVol">
           Créer un compte pour pouvoir réserver
        </button>
        <h5 v-if="!this.alreadyReserve">{{this.prix}} €</h5>
        <button v-if="!this.alreadyReserve" type="button" class="btn mt-auto btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#detailVol' + idVol">
           Je réserve
        </button>
        <button v-if="this.loggedIn ? this.currentUser.isAdmin : false" type="button" class="btn mt-auto btn-danger" @click="handleDelete()">
           Supprimer
        </button>
    </div> 
    <div v-if="!this.alreadyReserve" class="modal fade" v-bind:id="'detailVol' + this.idVol" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header d-flex flex-column">
                <img :src="this.imageAstre" alt="" srcset="" class="card-img-top" style="width:40%;">
                <h5 class="modal-title someMargin " id="exampleModalLabel">Vol numéro {{this.idVol}} pour {{this.astre}}</h5>
                <strong class="card-text someMargin" for="">le {{this.date}} à {{this.heureDepart.substring(0, this.heureDepart.length - 3)}}</strong> <br>
                <strong class="card-text" for="">Depuis {{this.pas}}</strong> <br>
                <strong class="card-text">{{this.duree}} jours</strong>
                <p class="card-text someMargin">{{this.description}}</p>
                <h5 v-if="!this.alreadyReserve">{{this.prix}} €</h5>
            </div>
            <div class="modal-body">
                

                <h5>Afin de reserver ce vol :</h5>
                <p class="card-text">Veuillez saisir dans le champ ci dessous la phrase</p>
                <strong class="card-text" style="margin-bottom :3%;">
                    Je certifie posséder les moyens financiers afin de pouvoir procéder au paiement du vol
                </strong>
                <input class="someMargin form-control" type="text" v-model="this.passphrase"/>
                <p>La réservation de ce vol est nominative</p>
                <p class="card-text someMargin text-danger">{{this.errorMessage}}</p>
            </div>
            <div class="modal-footer">
                <button type="button" @click="handleReservation()" class="btn btn-success btn-lg"  :disabled="!this.isPassPhrase">Réserver</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
            </div>
            </div>
        </div>
        </div>
</div>
    
</template>

<script>
const axios = require('axios')
const API_URL = 'https://astroworld-api.herokuapp.com/';
import authHeader from '../services/auth-header'
export default {
    props : {
        idVol : {
            type : Number
        },
        date : {
            type : String
        },
        heureDepart : {
            type : String
        },
        duree : {
            type : Number
        },
        description : {
            type: String
        },
        astre : {
            type : String
        },
        imageAstre : {
            type : String
        },
        prix : {
            type : Number
        },
        pas : {
            type : String
        },
        alreadyReserve : {
            type:Boolean
        },
        homePage: {
            type:Boolean
        }
    },
    data(){
        return {
            passphrase : '',
            errorMessage : '',
        }
    },
    methods: {
       async handleReservation(){
            if(this.isPassPhrase){
                const config = {
                headers: authHeader()
                };
                try {
                    await axios.post(API_URL + 'reserver',{idUser : this.currentUser.idUser,idVol:this.idVol},config)
                    window.alert("Réservation éffectué avec succès !")
                    this.$router.go()
                } catch (error) {
                    if (error.response.status == 500){
                        this.errorMessage = 'Vous avez déjà réservé ce vol'
                    }
                }
            } else {
                this.errorMessage='Vous n\'avait pas inscrit la bonne phrase'
            }
        },
        async handleDelete(){
                const config = {
                headers: authHeader()
                };
                try {
                    console.log(API_URL+'vols/'+this.idVol);
                    await axios.delete(API_URL + 'vols/' + this.idVol,config)
                    window.alert("Vol supprimé avec succès !")
                    this.$router.go()
                } catch (error) {
                    if (error.response.status == 401){
                        window.alert("Vous n'êtes pas autorisé à effectuer cette opération")
                    }
                }
        },
        
    },
    computed: {
        isPassPhrase(){
            return this.passphrase == 'Je certifie posséder les moyens financiers afin de pouvoir procéder au paiement du vol'
        },
        currentUser(){
            if(this.loggedIn){
                return this.$store.state.auth.user.user;
            } else {
                return null
            }
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    }
}
</script>

<style>
.reservationBtn {
    justify-self: flex-end;
}
.someMargin {
    margin-top:5%;
}

.modal-content {
    background-color:black !important;
    color: #f8f9fa;
}
</style>