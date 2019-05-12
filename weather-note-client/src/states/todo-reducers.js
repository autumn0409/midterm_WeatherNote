/* Todo Form */

const initTodoFormState = {
    inputValue: '',
    inputDanger: false,
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
        default:
            return state;
    }
}

/* Todos */

const initTodoState = {
    todoLoading: false,
    todos: [],
    filterMode: 'all',
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
        case '@TODO/TOGGLE_ALL':
            return {
                ...state,
                filterMode: 'all',
            };
        case '@TODO/TOGGLE_ACTIVE':
            return {
                ...state,
                filterMode: 'active',
            };
        case '@TODO/TOGGLE_COMPLETED':
            return {
                ...state,
                filterMode: 'completed',
            };
        default:
            return state;
    }
}
