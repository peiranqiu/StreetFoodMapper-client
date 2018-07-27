let _singleton = Symbol();
const MODULE_API_URL =
    'https://myapp-peiran.herokuapp.com/api/course/CID/module';
const MODULE_API_URL_ONE =
    'https://myapp-peiran.herokuapp.com/api/module/MID';

export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL_ONE.replace
        ('MID', moduleId), {
            method: 'delete'
        })
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllModules() {
        return fetch(MODULE_API_URL_ONE)
            .then(function (response) {
                return response.json();
            });
    }

    findModuleById(moduleId) {
        return fetch(MODULE_API_URL_ONE.replace
        ('MID', moduleId))
            .then(function(response) {
                return response.json();
            });
    }

    updateModule(moduleId, module) {
        return fetch(MODULE_API_URL_ONE.replace
            ('MID', moduleId),
            {
                method : 'PUT',
                body : JSON.stringify(module),
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