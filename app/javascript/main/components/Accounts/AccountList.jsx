import React from 'react';
import { Table, Button } from 'reactstrap';
import update from 'immutability-helper';

import AccountForm from './AccountForm';
import accountsAPI from '../../apis/accountsAPI';

class AccountList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
    this.handleCloseForm = this.handleCloseForm.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)

    this.renderAccountRow = this.renderAccountRow.bind(this)
  }

  componentDidMount() {
    accountsAPI.getAll()
    .then(response => this.setState({accounts: response.data}))
    .catch(error => console.log(error))
  }

  handleOpenForm(account) {
    const form = (
      <AccountForm account={account}
        onSubmit={this.handleSubmitForm}
        onClose={this.handleCloseForm} />
    );

    this.setState({form: form})
  }

  handleCloseForm() {
    this.setState({form: null});
  }

  handleSubmitForm(account) {
    if (account.id) {
      accountsAPI.update(account)
      .then(response => this.updateAccountInTable(response.data))
      .catch(error => console.log(error))
    } else {
      accountsAPI.create(account)
      .then(response => this.addAccountToTable(response.data))
      .catch(error => console.log(error))
    }

    this.handleCloseForm();
  }

  addAccountToTable(account) {
    let accounts = update(this.state.accounts, { $push: [account] });
    this.setState({accounts: accounts});
  }

  updateAccountInTable(account) {
    let index = this.state.accounts.findIndex((item) => item && account && item.id)
    let accounts = update(this.state.accounts, { [index]: { $set: account}});
    this.setState({accounts: accounts});
  }

  renderAccountRow(account) {
    return (
      <tr key={account.id}>
        <td>{account.name}</td>
        <td>{account.description}</td>
        <td>{account.interest_rate}</td>
        <td>
          <Button color='primary' size='sm' onClick={() => this.handleOpenForm(account)}>
            Edit
          </Button>
        </td>
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

        <Button color='primary' onClick={() => this.handleOpenForm({})}>
          Add New Account
        </Button>

        {this.state.form}
      </div>
    )
  }
}

export default AccountList;
