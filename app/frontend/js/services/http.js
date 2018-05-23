import axios from 'axios';



const http = axios.create({
  timeout: 10000
});



export default http;
