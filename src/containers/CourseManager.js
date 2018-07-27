import React from 'react';
import CourseEditor from './CourseEditor';
import CourseList from './CourseList';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route}
    from 'react-router-dom'


export default class CourseManager
    extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <nav className="navbar sticky-top navbar-light bg-dark">
                        <a className="text-white" href='/courses'>
                            COURSE MANAGER</a>
                    </nav>

                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}
