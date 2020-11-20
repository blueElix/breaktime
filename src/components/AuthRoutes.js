import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={Login} />
      <Route path={'/login'} exact component={Login} />
      <Route path={'/register'} exact component={Register} />
      <Route component={Login} />
    </Switch>
  )
}

export default AuthRoutes
