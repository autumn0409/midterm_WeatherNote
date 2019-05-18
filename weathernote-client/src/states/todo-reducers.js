/* Todo Form */

const initTodoFormState = {
    inputValue: '',
    inputDanger: false,
    date: new Date(),
};

export function todoForm(state = initTodoFormState, action) {
    switch (action.type) {
        case '@TODO_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@TODO_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@TODO_FORM/SET_DATE':
            return {
                ...state,
                date: action.date,
            };
        default:
            return state;
    }
}

/* Todos */

const initTodoState = {
    todoLoading: false,
    todos: [],
};

export function todo(state = initTodoState, action) {
    switch (action.type) {
        case '@TODO/START_LOADING':
            return {
                ...state,
                todoLoading: true
            };
        case '@TODO/END_LOADING':
            return {
                ...state,
                todoLoading: false
            };
        case '@TODO/END_LIST_TODOS':
            return {
                ...state,
                todos: action.todos
            };
        default:
            return state;
    }
}

/* Filter */

const initFilterMode = 'all'

export function filterMode(state = initFilterMode, action) {
    switch (action.type) {
        case '@FILTER/TOGGLE_ALL':
            return 'all';
        case '@FILTER/TOGGLE_ACTIVE':
            return 'active';
        case '@FILTER/TOGGLE_COMPLETED':
            return 'completed';
        default:
            return state;
    }
}

/* Project */

const initProjectState = {
    projectToggle: false,
    name: '',
    projectList: [],
    addingProject: false,
    inputValue: '',
    inputDanger: false,
    hasGotProjects: false,
};

export function project(state = initProjectState, action) {
    switch (action.type) {
        case '@PROJECT/END_LIST_PROJECTS':
            return {
                ...state,
                projectList: action.projectList,
            }
        case '@PROJECT/TOGGLE_PROJECT':
            return {
                ...state,
                projectToggle: !state.projectToggle,
            }
        case '@PROJECT/SELECT_PROJECT':
            return {
                ...state,
                name: action.project,
            }
        case '@PROJECT/START_ADD_PROJECT':
            return {
                ...state,
                addingProject: true
            }
        case '@PROJECT/FINISH_ADD_PROJECT':
            return {
                ...state,
                addingProject: false
            }
        case '@PROJECT/INPUT':
            return {
                ...state,
                inputValue: action.value
            }
        case '@PROJECT/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            }
        case '@PROJECT/HAS_GOT_PROJECTS':
            return {
                ...state,
                hasGotProjects: true
            }
        default:
            return state;
    }
}