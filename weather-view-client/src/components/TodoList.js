import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import TodoItem from './TodoItem';
import './TodoList.css';

class TodoList extends React.Component {
    static propTypes = {
        todos: PropTypes.array,
    };

    render() {
        const { todos } = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>There are no other todos.</div>
            </ListGroupItem>
        );
        if (todos.length) {
            children = todos.map(t => (
                <ListGroupItem key={t.id} action={true}>
                    <TodoItem {...t} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='todo-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}

export default connect()(TodoList);
