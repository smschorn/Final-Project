import React from 'react';
import { Table } from 'reactstrap';

import AccountStatementRow from './AccountStatementRow';

class AccountStatementTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderAccountStatementRow = this.renderAccountStatementRow.bind(this);
  }

  renderAccountStatementRow(accountStatement) {
    if (accountStatement) {
      return (
        <AccountStatementRow key={accountStatement.id}
          accountStatement={accountStatement}
          onUpdate={this.props.onUpdateRow} />
      );
    }
  }

  render() {
    return (
      <Table className="border-top border-bottom">
        <thead className="thead-light">
          <tr>
            <th>Account Name</th>
            <th style={{width: '200px'}}>Interest Rate</th>
            <th style={{width: '200px'}}>Current Balance</th>
            <th style={{width: '200px'}}>Minimum Payment</th>
            <th style={{width: '150px'}}></th>
          </tr>
        </thead>
        <tbody>
          {this.props.accountStatements.map(this.renderAccountStatementRow)}
        </tbody>
      </Table>
    );
  }
}

export default AccountStatementTable;
