import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, ErrorPage } from './pages'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/error" component={ErrorPage} />
    </Switch>
  </Router>
)
