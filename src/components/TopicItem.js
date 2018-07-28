import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {Link} from
        'react-router-dom'
import '../styles/home.css';
export default class TopicItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li id="topic" className="nav-item">
                <a className="nav-link">
                    <Link to={
`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`
                    }>
                        {this.props.topic.title}
                    </Link>
                    <span onClick={() => {
                        this.props.delete
                        (this.props.topic.id)
                    }}>
                    <i className="fa fa-trash"></i>
                </span>
                </a></li>
        );
    }
}