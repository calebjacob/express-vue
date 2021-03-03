import axios from 'axios';



const http = axios.create({
  timeout: 15000
});



export default http;
