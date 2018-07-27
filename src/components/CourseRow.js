import React from 'react';
import {Link} from 'react-router-dom'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../Style.css';
class CourseRow extends React.Component {
    constructor(props) { super(props); }

    render() {
        return (
            <tr>
                <td><Link to={`/course/${this.props.course.id}`}>
                    <i className="fa fa-book"></i> <span id="course-title">{this.props.course.title}</span>
                </Link></td>
                <td>{this.props.course.owner}</td>
                <td>{this.props.course.modified}</td>
                <td>

                    <span className="float-right" onClick={() => {
                        this.props.delete(this.props.course.id)
                    }}><i className="fa fa-trash"></i></span>
                </td>
            </tr>

        )
    }
}

export default CourseRow;