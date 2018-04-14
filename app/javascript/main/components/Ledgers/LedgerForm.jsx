import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import ModalForm from '../ModalForm';

class LedgerForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ledger: this.props.ledger
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    let ledger = this.state.ledger;
    ledger[e.target.name] = e.target.value;
    this.setState(ledger)
  }

  handleSubmit() {
    this.props.onSubmit({
      id: this.state.ledger.id,
      year: this.state.ledger.year,
      month: this.state.ledger.month,
      budget: this.state.ledger.budget,
    })
  }

  renderForm() {
    return (
      <Form>
        <FormGroup>
          <Label for="ledger_year">Year</Label>
          <Input type="text" name="year" id="ledger_year"
            defaultValue={this.state.ledger.year}
            onChange={this.handleInputChange}
            placeholder="Enter ledger year" />
        </FormGroup>
        <FormGroup>
          <Label for="ledger_month">Month</Label>
          <Input type="textarea" name="month" id="ledger_month"
            defaultValue={this.state.ledger.month}
            onChange={this.handleInputChange}
            placeholder="Enter ledger month" />
        </FormGroup>
        <FormGroup>
          <Label for="ledger_budget">Budget</Label>
          <Input type="text" name="budget" id="ledger_budget"
            defaultValue={this.state.ledger.budget}
            onChange={this.handleInputChange}
            placeholder="Enter your monthly budget" />
        </FormGroup>
      </Form>
    );
  }

  render() {
    return (
      <ModalForm form={this.renderForm()}
        title={this.state.ledger.id ? 'Edit Ledger' : "Add Ledger"}
        submitText={this.state.ledger.id ? 'Update Ledger' : "Create Ledger"}
        onSubmit={this.handleSubmit}
        onClose={this.props.onClose} />
    )
  }
}

export default LedgerForm;
