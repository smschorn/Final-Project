import React from 'react';
import { Table, Button } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import update from 'immutability-helper';

import LedgerForm from './LedgerForm';
import ledgersAPI from '../../apis/ledgersAPI';

class LedgerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ledgers: []
    }
    this.handleCloseForm = this.handleCloseForm.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)

    this.renderLedgerRow = this.renderLedgerRow.bind(this)
  }

  componentDidMount() {
    ledgersAPI.getAll()
    .then(response => this.setState({ledgers: response.data}))
    .catch(error => console.log(error))
  }

  handleOpenForm(ledger) {
    const form = (
      <LedgerForm ledger={ledger}
        onSubmit={this.handleSubmitForm}
        onClose={this.handleCloseForm} />
    );

    this.setState({form: form})
  }

  handleCloseForm() {
    this.setState({form: null});
  }

  handleSubmitForm(ledger) {
    if (ledger.id) {
      ledgersAPI.update(ledger)
      .then(response => this.updateLedgerInTable(response.data))
      .catch(error => console.log(error))
    } else {
      ledgersAPI.create(ledger)
      .then(response => this.addLedgerToTable(response.data))
      .catch(error => console.log(error))
    }

    this.handleCloseForm();
  }

  handleDeleteButtonClick(ledger) {
    if (confirm("Are you sure you want to delete this ledger?")) {
      ledgersAPI.destroy(ledger)
      .then(response => this.removeLedgerFromTable(ledger))
      .catch(error => console.log(error))
    }
  }

  addLedgerToTable(ledger) {
    let ledgers = update(this.state.ledgers, { $push: [ledger] });
    this.setState({ledgers: ledgers});
  }

  updateLedgerInTable(ledger) {
    let index = this.state.ledgers.findIndex((item) => item && ledger && item.id === ledger.id)
    let ledgers = update(this.state.ledgers, { [index]: { $set: ledger}});
    this.setState({ledgers: ledgers});
  }

  removeLedgerFromTable(ledger) {
    let index = this.state.ledgers.findIndex((item) => item && ledger && item.id === ledger.id)
    let ledgers = update(this.state.ledgers, { $unset: [index] });
    this.setState({ledgers: ledgers});
  }

  renderLedgerRow(ledger) {
    return (
      <tr key={ledger.id}>
        <td>
          <RouterNavLink to={`/ledger/${ledger.id}`}>
            {ledger.date.format('MMMM YYYY')}
          </RouterNavLink>
        </td>
        <td>{ledger.budget}</td>
        <td>
          <Button color='primary' size='sm' onClick={() => this.handleOpenForm(ledger)}>
            Edit
          </Button>
          {' '}
          <Button color='danger' size='sm' onClick={() => this.handleDeleteButtonClick(ledger)}>
            Delete
          </Button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h1>Ledger</h1>
        <Table className='border-top border-bottom'>
          <thead className='thead-light'>
            <tr>
              <th>Year/Month</th>
              <th>Budget</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.ledgers.map(this.renderLedgerRow)}
          </tbody>
        </Table>

        <Button color='primary' onClick={() => this.handleOpenForm({})}>
          Add New Ledger
        </Button>

        {this.state.form}
      </div>
    )
  }
}

export default LedgerList;
