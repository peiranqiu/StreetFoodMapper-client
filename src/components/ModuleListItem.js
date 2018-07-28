import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {Link} from
        'react-router-dom'
import '../styles/home.css';
export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab"
               aria-controls="v-pills-home" aria-selected="true">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>
                <span className="float-right" onClick={() => {
                    this.props.delete
                    (this.props.module.id)
                }}><i className="fa fa-trash"></i></span>
            </a>
        );
    }
}