import React from 'react';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';

import { createTodo, input, inputDanger, setDate } from '../states/todo-actions.js';

import './TodoForm.css';
import "react-datepicker/dist/react-datepicker.css";

class TodoForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        date: PropTypes.instanceOf(Date),
        project: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.inputEl = null;
    };

    render() {
        const { inputValue, date } = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        const CustomInput = (props) => {
            return (
                <input
                    className='datepicker'
                    onClick={props.onClick}
                    value={props.value}
                    type="text"
                    readOnly={true}
                />
            )
        }

        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-row justify-content-center ${inputDanger}`}>
                    <DatePicker
                        customInput={<CustomInput />}
                        selected={date}
                        onChange={this.handleDateChange}
                        minDate={new Date()}
                        dateFormat='yyyy/MM/dd'
                    />
                    <Input className='input'
                        type='textarea'
                        innerRef={el => { this.inputEl = el }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        placeholder="What's next to do?" />
                    <Button className='btn-post align-self-end mb-0 h-100' color="info" onClick={this.handlePost}>Add</Button>
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
        const { inputValue, dispatch, project, date } = this.props;

        if (!inputValue) {
            dispatch(inputDanger(true));
            return;
        }

        if (project === '') {
            alert('Please choose a project.');
            return;
        }

        dispatch(createTodo(inputValue, date));
        dispatch(input(''));
    }

    handleDateChange = (e) => {
        this.props.dispatch(setDate(e));
    }
}

export default connect(state => ({
    ...state.todoForm,
    project: state.project.name,
}))(TodoForm);
