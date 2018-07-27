let _singleton = Symbol();
const LESSON_API_URL =
    'https://myapp-peiran.herokuapp.com/api/course/CID/module/MID/lesson';
const LESSON_API_URL_ONE =
    'https://myapp-peiran.herokuapp.com/api/lesson/LID';

export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL_ONE.replace
        ('LID', lessonId), {
            method: 'delete'
        })
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(
            LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllLessons() {
        return fetch(LESSON_API_URL_ONE)
            .then(function (response) {
                return response.json();
            });
    }

    findLessonById(lessonId) {
        return fetch(LESSON_API_URL_ONE.replace('LID', lessonId))
            .then(function(response) {
                return response.json();
            });
    }

    updateLesson(lessonId, lesson) {
        return fetch(LESSON_API_URL_ONE.replace
            ('LID', lessonId),
            {
                method : 'PUT',
                body : JSON.stringify(lesson),
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