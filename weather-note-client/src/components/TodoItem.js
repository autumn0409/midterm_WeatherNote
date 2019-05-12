import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { accomplishTodo, removeTodo } from '../states/todo-actions';

import './TodoItem.css';

class TodoItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        text: PropTypes.string,
        ts: PropTypes.number,
        doneTs: PropTypes.number,
        dispatch: PropTypes.func
    };

    render() {
        const { text, ts, doneTs } = this.props;

        return (
            <div className={'todo-item d-flex flex-row ' + (doneTs ? 'done' : 'undone')}>
                <div className='remove' onClick={this.handleRemove}>
                    <i className="far fa-times-circle"></i>
                </div>
                <div className='todo d-flex flex-column' onClick={this.handleCheckboxCheck}>
                    <div className='wrap'>
                        <div className='ts'>{'Created: ' + moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                    <div className='check d-flex justify-content-end align-items-center'>
                        <div className='done-ts'>{
                            !!doneTs &&
                            <span>{moment(doneTs * 1000).calendar()}</span>
                        }</div>
                        <div className='checkbox'>
                            <i className={'far ' + (doneTs ? 'fa-check-square' : 'fa-square')}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleCheckboxCheck = (e) => {
        this.props.dispatch(accomplishTodo(this.props.id));

    }

    handleRemove = (e) => {
        this.props.dispatch(removeTodo(this.props.id));
    }
}

export default connect()(TodoItem);
