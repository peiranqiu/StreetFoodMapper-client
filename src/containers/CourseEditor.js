import React from "react";
import ModuleList from "./ModuleList";

export default class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.setCourseTitle = this.setCourseTitle.bind(this);
        this.state = {courseId: '', courseTitle: ''};
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    setCourseTitle(courseTitle) {
        this.setState({courseTitle: courseTitle});
    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
        this.setCourseTitle
        (this.props.match.params.courseTitle);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse
        (newProps.match.params.courseId);
        this.setCourseTitle
        (newProps.match.params.courseTitle);
    }

    render() {
        return (
            <div>
            <h3>COURSE {this.state.courseId}</h3>
            <ModuleList courseId={this.state.courseId}/>
            </div>

        );
    }
}