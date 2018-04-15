import axios from 'axios';
import moment from 'moment';

const transformLedger = function(data) {
  data.date = moment({year: data.year, month: data.month - 1})
  return data;
}

const transformLedgers = function(data) {
  return data.map(transformLedger)
}

const ledgersAPI = {
  getAll: function() {
    return axios({
      url: '/api/ledgers.json',
      transformResponse: [].concat(axios.defaults.transformResponse, transformLedgers)
    });
  },

  getOne: function(id) {
    return axios({
      url: `/api/ledgers/${id}.json`,
      transformResponse: [].concat(axios.defaults.transformResponse, transformLedger)
    });
  },

  create: function(ledger) {
    return axios({
      url: '/api/ledgers.json',
      method: 'post',
      data: {
        ledger: {
          month: ledger.month,
          year: ledger.year,
          budget: ledger.budget,
        }
      },
      transformResponse: [].concat(axios.defaults.transformResponse, transformLedger)
    });
  },

  update: function(ledger) {
    return axios({
      url: `/api/ledgers/${ledger.id}.json`,
      method: 'patch',
      data: {
        ledger: {
          month: ledger.month,
          year: ledger.year,
          budget: ledger.budget,
        }
      },
      transformResponse: [].concat(axios.defaults.transformResponse, transformLedger)
    });
  },

  destroy: function(ledger) {
    return axios.delete(`api/ledgers/${ledger.id}.json`);
  }
}

export default ledgersAPI;
