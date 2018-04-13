import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import ModalForm from '../ModalForm';

class AccountForm extends React.Component {
  constructor(props) {
    super(props)
  }

  renderForm() {
    return (
      <Form>
        <FormGroup>
          <Label for="account_name">Account Name</Label>
          <Input type="text" name="name" id="account_name"
            placeholder="Enter account name" />
        </FormGroup>
        <FormGroup>
          <Label for="account_description">Account Description</Label>
          <Input type="textarea" name="description" id="account_description"
            placeholder="Enter account description" />
        </FormGroup>
        <FormGroup>
          <Label for="account_interest_rate">Monthly Interest Rate</Label>
          <Input type="text" name="interest_rate" id="account_interest_rate"
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
        onClose={this.props.onClose} />
    )
  }
}

export default AccountForm;
