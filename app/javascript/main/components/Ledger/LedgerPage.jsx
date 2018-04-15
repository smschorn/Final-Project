import React from 'react';
import update from 'immutability-helper';

import AccountStatementTable from './AccountStatementTable';
import ledgersAPI from '../../apis/ledgersAPI';
import accountStatementsAPI from '../../apis/accountStatementsAPI';

class LedgerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ledger: null,
      accountStatements: []
    };

    this.handleUpdateAccountStatement = this.handleUpdateAccountStatement.bind(this);
  }

  componentDidMount() {
    ledgersAPI.getOne(this.props.match.params.id)
    .then(response => {
      let ledger = response.data;
      this.setState({ledger: ledger})

      accountStatementsAPI.getAll(ledger)
      .then(response => this.setState({accountStatements: response.data}))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  handleUpdateAccountStatement(accountStatement) {
    accountStatementsAPI.update(this.state.ledger, accountStatement)
    .then(response => {
      let index = this.state.accountStatements.findIndex((item) => item.id === response.data.id);
      let accountStatements = update(this.state.accountStatements, { [index]: { $set: response.data }});
      this.setState({accountStatements: accountStatements});
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1>Ledger for {this.state.ledger ? this.state.ledger.date.format('MMMM YYYY') : ''}</h1>
        <hr />

        <h4>Account Statements</h4>
        <AccountStatementTable ledger={this.state.ledger}
          accountStatements={this.state.accountStatements}
          onUpdateRow={this.handleUpdateAccountStatement} />
      </div>
    )
  }
}

export default LedgerPage;
