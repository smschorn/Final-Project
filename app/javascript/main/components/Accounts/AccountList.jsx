import React from 'react';
import { Table, Button } from 'reactstrap';

import accountsAPI from '../../apis/accountsAPI';

class AccountList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    accountsAPI.getAll()
    .then(response => this.setState({accounts: response.data}))
    .catch(error => console.log(error))
  }

  renderAccountRow(account) {
    return (
      <tr key={account.id}>
        <td>{account.name}</td>
        <td>{account.description}</td>
        <td>{account.interest_rate}</td>
        <td></td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h1>Account</h1>
        <Table className='border-top border-bottom'>
          <thead className='thead-light'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Interest Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.accounts.map(this.renderAccountRow)}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default AccountList;
