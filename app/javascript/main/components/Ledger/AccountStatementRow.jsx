import React from 'react';
import { Button, Input } from 'reactstrap';

class AccountStatementRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      id: this.props.accountStatement.id,
      current_balance: this.props.accountStatement.current_balance,
      minimum_payment: this.props.accountStatement.minimum_payment
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
  }

  handleEditClick() {
    this.setState({isEditing: true})
  }

  handleInputChange(e) {
    this.setState({[e.targe.name]: e.target.value})
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
        <td>{this.renderButtons()}</td>
      </tr>
    );
  }
}

export default AccountStatementRow;
