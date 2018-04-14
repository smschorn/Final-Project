import axios from 'axios';

const ledgersAPI = {
  getAll: function() {
    return axios.get('api/ledgers.json')
  },

  getOne: function(ledgerId) {
      return axios.get(`api/ledgers/${ledgerId}.json`);
  },

  create: function(ledger) {
    return axios.post('api/ledgers.json', {
      ledger: {
        year: ledger.year,
        month: ledger.month,
        budget: ledger.budget,
      }
    })
  },

  update: function(ledger) {
    return axios.put(`api/ledgers/${ledger.id}.json`, {
      ledger: {
        year: ledger.year,
        month: ledger.month,
        budget: ledger.budget,
      }
    });
  },

  destroy: function(ledger) {
    return axios.delete(`api/ledgers/${ledger.id}.json`);
  }
}

export default ledgersAPI;
