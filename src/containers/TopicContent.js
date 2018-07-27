import React from 'react';

export default class TopicContent
    extends React.Component {

    constructor(props) {
        super(props);
        this.setTopicId =
            this.setTopicId.bind(this);
        this.state = {
            topicId: ''
        };
    }

    setTopicId(topicId) {
        this.setState
        ({topicId: topicId});
    }


    componentDidMount() {
        this.setTopicId(
            this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setTopicId(
            newProps.match.params.topicId);
    }

    render() {
        return (
            <div className="card bg-light mb-3">
                <div className="card-header">Topic {this.state.topicId}</div>
                <div className="card-body">
                    <p className="card-text">In this assignment we are going to add a React client to build the faculty
                        application. Faculties are going to be able to author online courses in terms of learning
                        modules, lessons, topics, content widgets, assignments, and evaluations. This assignment will
                        tackle creating courses, modules, and lessons. We will use the same middle tier established in
                        the first assignment, and just focus on adding support for the new React client.</p>
                </div>
            </div>

        )
    }
}