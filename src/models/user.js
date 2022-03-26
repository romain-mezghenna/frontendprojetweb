export default class User {
    constructor(mail, password,id,nom,prenom,tel,isAdmin,nomVille,idPays) {
        this.idUser = id
        this.nomUser = nom
        this.prenomUser = prenom
        this.mail = mail,
        this.password = password
        this.tel = tel
        this.isAdmin = isAdmin
        this.nomVille = nomVille
        this.idPays = idPays
    }
}