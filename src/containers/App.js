import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister'
import OwnerRegister from './OwnerRegister'
import OwnerLogin from './OwnerLogin'
import UserProfile from './UserProfile'
import UserProfileEdit from './UserProfileEdit'
import OwnerProfile from './OwnerProfile'
import OwnerProfileEdit from './OwnerProfileEdit'
import Dashboard from './Dashboard'
import Policy from '../constants/Policy'

export default class App extends Component {

    render = () => (
        <Router>
            <Switch className="container-fluid">
                <Route exact path="/" component={Test}/>
                <Route path="/home" component={Home}/>
                <Route path="/login/user" component={UserLogin}/>
                <Route path="/register/user" component={UserRegister}/>
                <Route path="/register/owner" component={OwnerRegister}/>
                <Route path="/login/owner" component={OwnerLogin}/>
                <Route exact path="/profile/user" component={UserProfile}/>
                <Route path="/profile/user/edit" component={UserProfileEdit}/>
                <Route exact path="/profile/owner" component={OwnerProfile}/>
                <Route path="/profile/owner/edit" component={OwnerProfileEdit}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/policy" component={Policy}/>
                {/*

                <Route exact path="/admin" component={AdminPage}/>
                <Route path="/truck/:truckId/edit" component={TruckEditor}/>
                <Route exact path="/truck/:truckId/preview" component={TruckPreview}/>
                <Route path="/truck/:truckId" component={TruckPage}/>
                <Route path="/admin/profile/user/:userId" component={UserProfile}/>
                <Route path="/admin/profile/owner/:ownerId" component={OwnerProfile}/>
                <Route path="/admin/truck/:truckId" component={TruckEditor}/>
                */}
            </Switch>
        </Router>
    )
}