import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Navigation from './Navigation';

const App = (props) => (
  <Router>
    <div>
      <Navigation />
      <Container fluid>
        <h1>Hello</h1>
      </Container>
    </div>
  </Router>
)

export default App;
