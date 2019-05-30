
import axios from 'axios'

const API_URL = 'http://localhost:9090/notification';

export default {

  fetchSubServiceCollection(id) {
    const url = API_URL+'/getAllSubService/'+id;
    return axios.get(url)
      .then(response => {
        return response.data
      })
  },



}