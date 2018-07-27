import ModuleListItem from '../components/ModuleListItem';
import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../Style.css';
import ModuleService from '../services/ModuleService';
import ModuleEditor from './ModuleEditor';
import {BrowserRouter as Router, Route}
    from 'react-router-dom'

export default class ModuleList
    extends React.Component {
    constructor() {
        super();
        this.state = {
            courseId: '',
            module: {title: 'New Module'},
            modules: []
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    createModule() {
        this.moduleService.createModule
        (this.state.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });
    }

    deleteModule(moduleId) {
        alert("Module deleted.");
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.findAllModulesForCourse(newProps.courseId);
        this.setCourseId(newProps.courseId);
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    renderListOfModules() {
        let modules = this.state.modules.map((module) => {
            return (<ModuleListItem key={module.id}
                                    delete={this.deleteModule}
                                    courseId={this.state.courseId}
                                    module={module}/>)
        });
        return (modules);

    }

    render() {
        return (
            <Router>
                <div className="row">
                    <div id="module-list" className="col-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="New Module Title..."
                                   aria-label="New Module" aria-describedby="basic-addon2"
                                   onChange={this.titleChanged} value={this.state.module.title}/>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-outline-primary"
                                        onClick={this.createModule}>
                                    +
                                </button>
                            </div>
                        </div>


                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                             aria-orientation="vertical">
                            {this.renderListOfModules()}
                        </div>
                    </div>

                    <div className="col-8">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}>
                        </Route>

                    </div>
                </div>
            </Router>
        );

    }

}
