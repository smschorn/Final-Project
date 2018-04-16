import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import Navigation from './Navigation';
import Home from './Home';
import AccountList from './Accounts/AccountList';
import LedgerList from './Ledgers/LedgerList';
import LedgerPage from './Ledger/LedgerPage';

const App = (props) => (
  <Router>
    <div>
      <Navigation />
      <Container fluid>
        <Switch>
          <Route path='/' exact component={AccountList}/>
          <Route path='/accounts' component={AccountList}/>
          <Route path='/ledgers' exact component={LedgerList}/>
          <Route path='/ledgers/:id' exact component={LedgerPage}/>
        </Switch>
      </Container>
    </div>
  </Router>
)

export default App;
