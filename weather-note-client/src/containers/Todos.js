import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';

import ProjectSelecter from '../components/ProjectSelecter';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

import {
    listTodos,
    toggleAllAndList,
    toggleActiveAndList,
    toggleComletedAndList
} from '../states/todo-actions.js';

import './Todos.css';

class Todos extends React.Component {
    static propTypes = {
        todoLoading: PropTypes.bool,
        todos: PropTypes.array,
        filterMode: PropTypes.string,
        dispatch: PropTypes.func,
    };

    componentDidMount() {
        this.props.dispatch(listTodos());
    }

    render() {
        const { todoLoading, todos, filterMode } = this.props;

        return (
            <div className='todos d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                    <ProjectSelecter />
                    <ButtonGroup size='sm'>
                        <Button outline={filterMode === 'all' ? false : true} color='light' onClick={this.toggleAll}>All</Button>
                        <Button outline={filterMode === 'active' ? false : true} color='light' onClick={this.toggleActive}>Active</Button>
                        <Button outline={filterMode === 'completed' ? false : true} color='light' onClick={this.toggleComleted}>Completed</Button>
                    </ButtonGroup>
                </div>
                <TodoForm />
                <TodoList todos={todos} />{
                    todoLoading &&
                    <i className="fas fa-spinner fa-spin loading"></i>
                }
            </div>
        );
    }

    toggleAll = () => {
        this.props.dispatch(toggleAllAndList());
    }

    toggleActive = () => {
        this.props.dispatch(toggleActiveAndList());
    }

    toggleComleted = () => {
        this.props.dispatch(toggleComletedAndList());
    }
}

export default connect(state => ({
    ...state.todo,
    filterMode: state.filterMode,
}))(Todos);