import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';
import '../Style.css';

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
        this.setState({
            course: {title: "New Course",
                owner: 'peggyq',
                created: new Date().toISOString(),
                modified: new Date().toISOString()}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        alert("Course deleted.");
        this.courseService
            .deleteCourse(courseId).then(() => {
            this.findAllCourses();
        });
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    titleChanged(event) {
        this.setState({
            course: {title: event.target.value,
                owner: 'peggyq',
                created: new Date().toISOString(),
                modified: new Date().toISOString()}
        });
    }

    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                (course) => {
                    return <CourseRow key={course.id}
                                      course={course}
                                      courseTitle={course.title}
                                      delete={this.deleteCourse}/>
                })
        }
        return courses;
    }


    render() {
        return (
            <div>
                <div id="new-course" className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="New Course Title..."
                           aria-label="New Course" aria-describedby="basic-addon2"
                           onChange={this.titleChanged}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-primary" onClick={this.createCourse}>
                            +</button>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Last Modified</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;
