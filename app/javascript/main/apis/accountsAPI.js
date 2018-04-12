import axios from 'axios';

const accountsAPI = {
  getAll: function() {
    return axios.get('api/accounts.json')
  }
}

export default accountsAPI;
