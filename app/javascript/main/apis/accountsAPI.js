import axios from 'axios';

const accountsAPI = {
  getAll: function() {
    return axios.get('api/accounts.json')
  },

  getOne: function(accountId) {
      return axios.get(`api/accounts/${accountId}.json`);
  },

  create: function(account) {
    return axios.post('api/accounts.json', {
      account: {
        name: account.name,
        description: account.description,
        interest_rate: account.interest_rate,
      }
    })
  },

  update: function(account) {
    return axios.put(`api/accounts/${account.id}.json`, {
      account: {
        name: account.name,
        description: account.description,
        interest_rate: account.interest_rate,
      }
    });
  },

  destroy: function(account) {
    return axios.delete(`api/accounts/${account.id}.json`);
  }
}

export default accountsAPI;
