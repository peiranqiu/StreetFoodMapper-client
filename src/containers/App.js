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
import TruckPage from './TruckPage'
import CreateTruck from './CreateTruck'
import TruckPreview from './TruckPreview'
import TruckEditor from './TruckEditor'
import NotFound from './NotFound'
import AdminPage from './AdminPage'

export default class App extends Component {
    componentDidMount() {
        document.title = "StreetFoodMapper";
    }


    render = () => (

        <Router>

            <Switch className="container-fluid">
                <Route exact path="/" component={Test}/>
                <Route exact path="/home" component={Home}/>
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
                <Route exact path="/truck/:truckId" component={TruckPage}/>
                <Route exact path="/:ownerId/create" component={CreateTruck}/>
                <Route exact path="/truck/:truckId/preview" component={TruckPreview}/>
                <Route exact path="/truck/:truckId/edit" component={TruckEditor}/>
                <Route exact path="/admin" component={AdminPage}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    )
}