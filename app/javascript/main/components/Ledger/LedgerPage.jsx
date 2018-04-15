import React from 'react';

import ledgersAPI from '../../apis/ledgersAPI';

class LedgerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ledger: null,
      accountStatements: []
    };
  }

  componentDidMount() {
    ledgersAPI.getOne(this.props.match.params.id)
    .then(response => {
      let ledger = response.data;
      this.setState({ledger: ledger})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1>Ledger for {this.state.ledger ? this.state.ledger.date.format('MMMM YYYY') : ''}</h1>
        <hr />

        <h4>Account Statements</h4>
        <p>TODO: Account statement table goes here</p>
      </div>
    )
  }
}

export default LedgerPage;
