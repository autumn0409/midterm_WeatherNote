import {
    listTodos as listTodosFromApi,
    createTodo as createTodoFromApi,
    accomplishTodo as accomplishTodoFromApi,
    removeTodo as removeTodoFromApi
} from '../api/todos.js';

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

        return listTodosFromApi(getState().todo.filterMode).then(todos => {
            dispatch(endListTodos(todos));
        }).catch(err => {
            console.error('Error listing todos', err);
        }).then(() => {
            dispatch(endLoading());
        });
    }
}

export function createTodo(text) {
    return (dispatch) => {
        dispatch(startLoading());

        return createTodoFromApi(text).then(() => {
            dispatch(listTodos(true));
        }).catch(err => {
            console.error('Error creating todos', err);
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
        });
    }
}

function toggleAll() {
    return {
        type: '@TODO/TOGGLE_ALL'
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
        type: '@TODO/TOGGLE_ACTIVE'
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
        type: '@TODO/TOGGLE_COMPLETED'
    };
}

export function toggleComletedAndList() {
    return (dispatch) => {
        dispatch(toggleComleted());
        return dispatch(listTodos());
    }
}

