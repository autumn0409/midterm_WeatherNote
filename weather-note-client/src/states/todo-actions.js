import {
    listTodos as listTodosFromApi,
    createTodo as createTodoFromApi,
    accomplishTodo as accomplishTodoFromApi,
    removeTodo as removeTodoFromApi
} from '../api/todos.js';

import {
    listProjects as listProjectsFromApi,
    addProject as addProjectFromApi,
    removeProject as removeProjectFromApi,
} from '../api/projects.js'

/*  Todo Form */

export function input(value) {
    return {
        type: '@TODO_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@TODO_FORM/INPUT_DANGER',
        danger
    };
};

export function setDate(date) {
    return {
        type: '@TODO_FORM/SET_DATE',
        date,
    };
}

/*  Todos */

function startLoading() {
    return {
        type: '@TODO/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@TODO/END_LOADING'
    };
}

function endListTodos(todos) {
    return {
        type: '@TODO/END_LIST_TODOS',
        todos
    };
}

export function listTodos(loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        let p;

        if (getState().project.hasGotProjects === false) {
            p = listProjectsFromApi().then(projectList => {
                dispatch(endListProjects(projectList));

                if (projectList.length !== 0)
                    dispatch(selectProject(projectList[0].name));
                else
                    dispatch(selectProject(''));

                dispatch(hasGotProjects());
            });
        }
        else {
            p = new Promise((resolve, reject) => {
                resolve();
            });
        }

        return p.then(() => {
            return listTodosFromApi(getState().filterMode, getState().project.name)
        }).then(todos => {
            dispatch(endListTodos(todos));
        }).catch(err => {
            console.error('Error listing todos', err);
        }).then(() => {
            dispatch(endLoading());
        });
    }
}

export function createTodo(text, date) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createTodoFromApi(text, date, getState().project.name).then(() => {
            dispatch(listTodos(true));
        }).catch(err => {
            console.error('Error creating todos', err);
            dispatch(listTodos(true));
        });
    };
};

export function accomplishTodo(id) {
    return (dispatch) => {
        dispatch(startLoading(true));

        return accomplishTodoFromApi(id).then(() => {
            dispatch(listTodos(true));
        }).catch(err => {
            console.error('Error accomplishing todos', err);
            dispatch(listTodos(true));
        });
    }
}

export const removeTodo = (id) => {
    return (dispatch) => {
        dispatch(startLoading(true));

        return removeTodoFromApi(id).then(() => {
            dispatch(listTodos(true));
        }).catch(err => {
            console.error('Error removing todos', err);
            dispatch(listTodos(true));
        });
    }
}

/* Filter */

function toggleAll() {
    return {
        type: '@FILTER/TOGGLE_ALL'
    };
}

export function toggleAllAndList() {
    return (dispatch) => {
        dispatch(toggleAll());
        return dispatch(listTodos());
    }
}

function toggleActive() {
    return {
        type: '@FILTER/TOGGLE_ACTIVE'
    };
}

export function toggleActiveAndList() {
    return (dispatch) => {
        dispatch(toggleActive());
        return dispatch(listTodos());
    }
}

function toggleComleted() {
    return {
        type: '@FILTER/TOGGLE_COMPLETED'
    };
}

export function toggleComletedAndList() {
    return (dispatch) => {
        dispatch(toggleComleted());
        return dispatch(listTodos());
    }
}


/* Project */

export function toggleProject() {
    return {
        type: '@PROJECT/TOGGLE_PROJECT'
    }
}

function selectProject(project) {
    return {
        type: '@PROJECT/SELECT_PROJECT',
        project
    }
}

export function selectProjectAndList(project) {
    return (dispatch) => {
        dispatch(selectProject(project));
        dispatch(toggleProject());
        return dispatch(listTodos());
    }
}

function endListProjects(projectList) {
    return {
        type: '@PROJECT/END_LIST_PROJECTS',
        projectList
    };
}

export function startAddProject() {
    return {
        type: '@PROJECT/START_ADD_PROJECT',
    }
}

export function finishAddProject() {
    return {
        type: '@PROJECT/FINISH_ADD_PROJECT',
    };
}

export function addProject(inputValue) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return addProjectFromApi(inputValue).then(() => {
            return listProjectsFromApi()
        }).then(projectList => {
            dispatch(endListProjects(projectList));
            dispatch(selectProjectAndList(inputValue));
        }).catch(err => {
            console.error('Error adding project', err);
            dispatch(selectProjectAndList(''));
        });
    };
}

export function removeProject(name) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return removeProjectFromApi(name).then(() => {
            return listProjectsFromApi()
        }).then(projectList => {
            dispatch(endListProjects(projectList));

            let targetProject;

            if (getState().project.name === name || projectList.length === 0)
                targetProject = '';
            else
                targetProject = getState().project.name;

            dispatch(selectProjectAndList(targetProject));
        }).catch(err => {
            console.error('Error adding project', err);
            dispatch(selectProjectAndList(''));
        });
    };
}

export function newProjectInput(value) {
    return {
        type: '@PROJECT/INPUT',
        value
    };
}

export function newProjectInputDanger(danger) {
    return {
        type: '@PROJECT/INPUT_DANGER',
        danger
    };
}

function hasGotProjects() {
    return {
        type: '@PROJECT/HAS_GOT_PROJECTS'
    };
}
