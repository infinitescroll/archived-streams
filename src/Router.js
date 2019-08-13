import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GitHubActivity, ErrorPage, SelectRepo } from './pages'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SelectRepo} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/github" component={GitHubActivity} />

      {/* <Route path="/start" component={SignUp} />
      <Route path="/auth/magic-link" component={Auth} />
      <Route path="/authorize/app/:app" component={AuthApp} /> */}
    </Switch>
  </Router>
)
