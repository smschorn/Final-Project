import React from 'react';
import { Button, Input } from 'reactstrap';
import moment from 'moment';

class AccountStatementRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      id: this.props.accountStatement.id,
      current_balance: this.props.accountStatement.current_balance,
      minimum_payment: this.props.accountStatement.minimum_payment,
      payoff_date: null
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
  }

  componentDidMount() {
    this.handleAccountStatementUpdate()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.accountStatement.current_balance != this.props.accountStatement.current_balance ||
      prevProps.accountStatement.minimum_payment != this.props.accountStatement.minimum_payment
    ) {
      this.handleAccountStatementUpdate()
    }
  }

  handleAccountStatementUpdate() {
    let payoffPeriod = this.calculatePayoffPeriod(
      (this.props.accountStatement.account.interest_rate / 12 / 100),
      this.state.current_balance,
      this.state.minimum_payment
    )

    this.setState({
      payoff_date: moment(this.props.ledger.date).add(payoffPeriod, 'months')
    })
  }

  calculatePayoffPeriod(interestRate, principal, payment) {
    let currentBalance = principal
    let numberOfMonths = 0

    while (currentBalance>0) {
      currentBalance = currentBalance - payment
      currentBalance = currentBalance + (currentBalance * interestRate)
      numberOfMonths += 1
    }

    return numberOfMonths
  }

  handleEditClick() {
    this.setState({isEditing: true})
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSaveClick() {
    this.props.onUpdate({
      id: this.state.id,
      current_balance: this.state.current_balance,
      minimum_payment: this.state.minimum_payment
    });

    this.setState({isEditing: false})
  }

  handleUndoClick() {
    this.setState({
      isEditing: false,
      current_balance: this.props.accountStatement.current_balance,
      minimum_payment: this.props.accountStatement.minimum_payment
    })
  }

  renderEditableField(name, value) {
    if (this.state.isEditing) {
      return (
        <Input type='text' defaultValue={value} name={name} bsSize='sm'
          onChange={this.handleInputChange} />
      );
    } else {
      return value;
    }
  }

  renderButtons() {
    if (this.state.isEditing) {
      return (
        <div>
          <Button color='success' size='sm' onClick={this.handleSaveClick}>
            Save
          </Button>
          {' '}
          <Button color='secondary' size='sm' onClick={this.handleUndoClick}>
            Undo
          </Button>
        </div>
      );
    } else {
      return (
        <Button color='primary' size='sm' onClick={this.handleEditClick}>
          Edit
        </Button>
      )
    }
  }

  render() {
    return (
      <tr className='editable'>
        <td>{this.props.accountStatement.account.name}</td>
        <td>{this.props.accountStatement.account.interest_rate}</td>
        <td>{this.renderEditableField('current_balance', this.state.current_balance)}</td>
        <td>{this.renderEditableField('minimum_payment', this.state.minimum_payment)}</td>
        <td>{this.state.payoff_date ? this.state.payoff_date.format("MMMM YYYY") : ''}</td>
        <td>{this.renderButtons()}</td>
      </tr>
    );
  }
}

export default AccountStatementRow;
