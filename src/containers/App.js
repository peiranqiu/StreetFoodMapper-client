import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./Home";
import Test from "./Test";

export default class App extends Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8Gpn93BQCNz2U-hi_6XYGY8gAbcHkSaU&callback=initMap";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
    }

    render = () => (
        <Router>
            <Switch className="container-fluid">
                <Route exact path="/" component={Test}/>
                <Route path="/home" component={Home}/>
                {/*
                <Route path="/login/user" component={UserLogin}/>
                <Route path="/login/vendor" component={VendorLogin}/>
                <Route path="/register/user" component={UserRegister}/>
                <Route path="/register/owner" component={OwnerRegister}/>
                <Route path="/profile/user/:userId" component={UserProfile}/>
                <Route path="/profile/owner/:userId" component={OwnerProfile}/>
                <Route exact path="/admin" component={AdminPage}/>
                <Route exact path="/:userId" component={Dashboard}/>
                <Route path="/:userId/truck/:truckId/edit" component={TruckEditor}/>
                <Route exact path="/:userId/truck/:truckId" component={TruckPreview}/>
                <Route path="/truck/:truckId" component={TruckPage}/>
                <Route path="/admin/profile/user/:userId" component={UserProfile}/>
                <Route path="/admin/profile/owner/:userId" component={OwnerProfile}/>
                <Route path="/admin/truck/:truckId" component={TruckEditor}/>
                */}
            </Switch>
        </Router>
    )
}