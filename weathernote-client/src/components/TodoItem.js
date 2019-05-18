import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import dateFormat from 'dateformat';

import { accomplishTodo, removeTodo } from '../states/todo-actions';

import './TodoItem.css';

class TodoItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        text: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        ts: PropTypes.number,
        doneTs: PropTypes.number,
        project: PropTypes.string,
        dispatch: PropTypes.func
    };

    render() {
        const { text, date, ts, doneTs } = this.props;
        const thisYear = (new Date()).getFullYear();
        const dueDateYear = (new Date(date)).getFullYear();

        return (
            <div className={'todo-item d-flex flex-row ' + (doneTs ? 'done' : 'undone')}>
                <div className='date'>
                    {thisYear === dueDateYear ?
                        dateFormat(date, 'mmm d') :
                        dateFormat(date, 'yyyy\nmmm d')}
                </div>
                <div className='todo d-flex flex-column'>
                    <div className='d-flex flex-row'>
                        <div className='wrap'>
                            <div className='ts'>{'Created: ' + moment(ts * 1000).calendar()}</div>
                            <div className='text'>{text}</div>
                        </div>
                        <div className='remove align-self-start' onClick={this.handleRemove}>
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                    <div className='check d-flex justify-content-end align-items-center'>
                        <div className='done-ts'>{
                            !!doneTs &&
                            <span>{moment(doneTs * 1000).calendar()}</span>
                        }</div>
                        <div className='checkbox' onClick={this.handleCheckboxCheck}>
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
