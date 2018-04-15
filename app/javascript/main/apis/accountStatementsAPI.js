import axios from 'axios';

const accountStatementsAPI = {
  getAll: function(ledger) {
    return axios.get(`/api/ledgers/${ledger.id}/account_statements.json`);
  },

  update: function(ledger, accountStatement) {
    return axios.put(`/api/ledgers/${ledger.id}/account_statements/${accountStatement.id}.json`, {
      account_statement: {
        current_balance: accountStatement.current_balance,
        minimum_payment: accountStatement.minimum_payment,
      }
    });
  },
}

export default accountStatementsAPI;
