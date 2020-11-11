import React from 'react'
import { Router } from 'react-router-dom'
import Routes from './Routes'
import AuthRoutes from './AuthRoutes'
import history from '../history'
import { connect } from 'react-redux'

import Overlay from './Overlay'

class App extends React.Component {
  render() {
    let token = localStorage.getItem('token')
    if (this.props.isLoading) {
      return <Overlay />
    }

    return (
      <div className="ui container">
        <Router history={history}>{token ? <Routes /> : <AuthRoutes />}</Router>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoading: store.breaks.isLoading,
    loginUser: store.breaks.loginUser,
  }
}

export default connect(mapStateToProps)(App)
