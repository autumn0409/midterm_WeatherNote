import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeProject, selectProjectAndList } from '../states/todo-actions.js';

import './ProjectItem.css';

class ProjectItem extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        dispatch: PropTypes.func
    };

    render() {
        const { name } = this.props;
        return (
            <div className='project-item d-flex flex-row'>
                <div className='project-name flex-grow-1' onClick={() => { this.handleDropdownSelect(name) }}>
                    <i className="fas fa-circle"></i>
                    {name}
                </div>
                <div className='remove align-self-center'>
                    <i className="far fa-trash-alt" onClick={this.handleRemove}></i>
                </div>
            </div>
        )
    }

    handleDropdownSelect = (project) => {
        this.props.dispatch(selectProjectAndList(project));
    }

    handleRemove = () => {
        this.props.dispatch(removeProject(this.props.name));
    }
}

export default connect()(ProjectItem);


