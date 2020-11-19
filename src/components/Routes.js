import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import CreateBreak from './admin/CreateBreak'
import EditBreak from './admin/EditBreak'
import DeleteBreak from './admin/DeleteBreak'
import ViewAllUser from './admin/ViewAllUser'
import ViewSingleUser from './admin/ViewSingleUser'
import ViewAllBreak from './admin/ViewAllBreak'
import Statistics from './admin/Statistics'
import ViewAllBreaktime from './breaktime/ViewAllBreaktime'
// import CreateBreaktime from './breaktime/CreateBreaktime';
import Create from './breaktime/Create'
import EditProfile from './user/EditProfile'
import Home from './Home'
import PageNotFound from './PageNotFound'
import Header from './Header'
import history from '../history'

import ViewProfile from './user/ViewProfile'

const AdminRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/home" exact component={Home} />
      <Redirect exact from="/" to="/home" />
      <Route path="/create-break" exact component={CreateBreak} />
      <Route path="/breaks/edit/:id" exact component={EditBreak} />
      <Route path="/breaks/delete/:id" exact component={DeleteBreak} />
      <Route path="/view-all-users" exact component={ViewAllUser} />
      <Route path="/view/user/:id" exact component={ViewSingleUser} />
      <Route path="/view-all-break" exact component={ViewAllBreak} />
      <Route path="/view-all-breaktime" exact component={ViewAllBreaktime} />
      <Route path="/statistics" exact component={Statistics} />
      <Route path="/view-profile" exact component={ViewProfile} />
      <Route path="/edit-profile" exact component={EditProfile} />
    </React.Fragment>
  )
}

const UserRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/home" exact component={Home} />
      <Redirect exact from="/" to="/home" />
      <Route path="/breaktime" exact component={Create} />
      <Route path="/view-profile" exact component={ViewProfile} />
      <Route path="/edit-profile" exact component={EditProfile} />
    </React.Fragment>
  )
}

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      role: false,
    }
  }

  componentDidMount() {
    this.importUserData()
  }

  importUserData = async () => {
    await this.props.fetchUserData()
    let { userData } = this.props
    let storeUser = localStorage.getItem('userData')
    let user = JSON.parse(storeUser)

    this.setState({ role: user.role })
    if (userData) {
      this.setState({ role: userData.role })
    }

    if (!userData || !user) {
      history.push('/')
      localStorage.clear()
      window.location.reload(false)
    }
  }

  render() {
    return (
      <div className="ui container">
        <Header />
        <Switch>
          {this.state.role === 'user' ? <UserRoutes /> : <AdminRoutes />}
          <Route component={PageNotFound} />
          {/* <Route path="/view-profile" exact component={ViewProfile} /> */}
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userData: store.breaks.userData,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUserData: dispatch.breaks.fetchUserData,
  }
}

export default connect(mapStateToProps, mapDispatch)(Routes)
