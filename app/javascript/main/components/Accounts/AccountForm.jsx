import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import ModalForm from '../ModalForm';

class AccountForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      account: this.props.account
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    let account = this.state.account;
    account[e.target.name] = e.target.value;
    this.setState(account)
  }

  handleSubmit() {
    this.props.onSubmit({
      id: this.state.account.id,
      name: this.state.account.name,
      description: this.state.account.description,
      interest_rate: this.state.account.interest_rate,
    })
  }

  renderForm() {
    return (
      <Form>
        <FormGroup>
          <Label for="account_name">Account Name</Label>
          <Input type="text" name="name" id="account_name"
            defaultValue={this.state.account.name}
            onChange={this.handleInputChange}
            placeholder="Enter account name" />
        </FormGroup>
        <FormGroup>
          <Label for="account_description">Account Description</Label>
          <Input type="textarea" name="description" id="account_description"
            defaultValue={this.state.account.description}
            onChange={this.handleInputChange}
            placeholder="Enter account description" />
        </FormGroup>
        <FormGroup>
          <Label for="account_interest_rate">Monthly Interest Rate</Label>
          <Input type="text" name="interest_rate" id="account_interest_rate"
            defaultValue={this.state.account.interest_rate}
            onChange={this.handleInputChange}
            placeholder="Enter monthly interest rate for this account" />
        </FormGroup>
      </Form>
    );
  }

  render() {
    return (
      <ModalForm form={this.renderForm()}
        title="Add Account"
        submitText="Create Account"
        onSubmit={this.handleSubmit}
        onClose={this.props.onClose} />
    )
  }
}

export default AccountForm;
