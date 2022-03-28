import axios from 'axios';
import SHA256 from '../security/hash'
const API_URL = 'http://localhost:3000/';
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                mail: user.mail,
                password: SHA256(user.password)
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'users', {
            mail: user.mail,
            password: SHA256(user.password),
            nomUser: user.nomUser,
            prenomUser: user.prenomUser,
            tel: user.tel,
            nomVille: user.nomVille,
            idPays: user.idPays
        });
    }
}
export default new AuthService();