import LessonTabItem from '../components/LessonTabItem';
import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import LessonService from '../services/LessonService';
import LessonEditor from './LessonEditor';
import {BrowserRouter as Router, Route}
    from 'react-router-dom'

export default class LessonTabs
    extends React.Component {
    constructor() {
        super();
        this.state = {
            moduleId: '',
            courseId: '',
            lesson: {title: 'New Lesson'},
            lessons: []
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    createLesson() {
        this.lessonService.createLesson
        (this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule
                (this.state.courseId, this.state.moduleId)
            });
    }

    deleteLesson(lessonId) {

        alert("Lesson deleted.");
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => {
                this.findAllLessonsForModule
                (this.state.courseId, this.state.moduleId)
            });
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {
                this.setLessons(lessons)
            });
    }

    renderListOfLessons() {
        let lessons = this.state.lessons.map((lesson) => {
            return (<LessonTabItem key={lesson.id}
                                    delete={this.deleteLesson}
                                    moduleId={this.state.moduleId}
                                   courseId={this.state.courseId}
                                    lesson={lesson}/>)
        });
        return (lessons);

    }

    render() {
        return (
            <Router>
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="New Lesson Title..."
                           aria-label="New Lesson" aria-describedby="basic-addon2"
                           onChange={this.titleChanged} value={this.state.lesson.title}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-primary" onClick={this.createLesson}>
                            +</button>
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}

                </ul>
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                       component={LessonEditor}>
                </Route>
            </div>
            </Router>

        );
    }
}
