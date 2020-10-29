import Axios from 'axios'
const Api = Axios.create({
    baseURL:'https://chatveloster-backend.herokuapp.com/',
    headers: {}
    
});
export default Api