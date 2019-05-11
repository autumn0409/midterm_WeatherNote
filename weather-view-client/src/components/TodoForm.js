import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';

import { createTodo, input, inputDanger } from '../states/todo-actions.js';

import './TodoForm.css';

class TodoForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.inputEl = null;
    }

    render() {
        const { inputValue } = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <Input className='input' type='textarea' innerRef={el => { this.inputEl = el }} value={inputValue} onChange={this.handleInputChange} placeholder="What's next to do?"></Input>
                    <Button className='btn-post align-self-end' color="info" onClick={this.handlePost}>Add</Button>
                </Alert>
            </div>
        );
    }

    handleInputChange = (e) => {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handlePost = () => {
        const { inputValue, dispatch } = this.props;

        if (!inputValue) {
            dispatch(inputDanger(true));
            return;
        }

        dispatch(createTodo(inputValue));
        dispatch(input(''));
    }
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
