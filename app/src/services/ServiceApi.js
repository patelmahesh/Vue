
import axios from 'axios'

const API_URL = 'http://localhost:9090/notification';

export default {

  fetchServiceCollection() {
    const url = API_URL+'/getAllService/';
    return axios.get(url).then(response => response.data)
  },

  deleteService(id) {
    const url = API_URL+'/deleteService/'+id;
    return axios.get(url)
  },

  async saveService(service) {
    const url = API_URL+'/service/';
    return axios.post(url, service).then(response => response.data);
  },
}