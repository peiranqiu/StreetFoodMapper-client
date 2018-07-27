let _singleton = Symbol();
const TOPIC_API_URL =
    'https://myapp-peiran.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';

const TOPIC_API_URL_ONE =
    'https://myapp-peiran.herokuapp.com/api/topic/TID';


export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    createTopic(courseId, moduleId, lessonId, topic) {
        return fetch(TOPIC_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId),
            {
                body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_API_URL_ONE.replace('TID', topicId), {
            method: 'delete'
        })
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        return fetch(
            TOPIC_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            });
    }

    findAllTopics() {
        return fetch(TOPIC_API_URL_ONE)
            .then(function (response) {
                return response.json();
            });
    }

    findTopicById(topicId) {
        return fetch(TOPIC_API_URL_ONE.replace('TID', topicId))
            .then(function(response) {
                return response.json();
            });
    }

    updateTopic(topicId, topic) {
        return fetch(TOPIC_API_URL_ONE.replace('TID', topicId),
            {
                method : 'PUT',
                body : JSON.stringify(topic),
                headers: {
                    'content-type':'application/json'
                }})
            .then(function(response) {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    return response.json();
                }
                else {
                    return null;
                }
            });
    }
}