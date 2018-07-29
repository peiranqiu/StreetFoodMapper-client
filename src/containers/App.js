import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./Home";
import Test from "./Test";

export default class App extends Component {
    render = () => (
        <Router>
            <Switch className="container-fluid">
                <Route exact path="/" component={Test}/>
                <Route exact path="/home" component={Home}/>
                {/*
                <Route path="/login/user" component={UserLogin}/>
                <Route path="/login/vendor" component={VendorLogin}/>
                <Route path="/register/user" component={UserRegister}/>
                <Route path="/register/vendor" component={VendorRegister}/>
                <Route path="/profile/user/:userId" component={UserProfile}/>
                <Route path="/profile/vendor/:userId" component={VendorProfile}/>
                <Route exact path="/admin" component={AdminPage}/>
                <Route exact path="/:userId" component={Dashboard}/>
                <Route path="/:userId/truck/:truckId/edit" component={TruckEditor}/>
                <Route exact path="/:userId/truck/:truckId" component={TruckPreview}/>
                <Route path="/truck/:truckId" component={TruckPage}/>
                <Route path="/admin/profile/user/:userId" component={UserProfile}/>
                <Route path="/admin/profile/vendor/:userId" component={VendorProfile}/>
                <Route path="/admin/truck/:truckId" component={TruckEditor}/>
                */}
            </Switch>
        </Router>
    )
}