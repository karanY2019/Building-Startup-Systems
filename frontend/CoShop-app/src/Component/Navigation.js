import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './login'


export default function Navigation() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      {/* <Route path="/invite" exact component={Invite} /> */}
      {/*<Route path="/register" component={Register} />  */}
    </Switch>
  )
}

