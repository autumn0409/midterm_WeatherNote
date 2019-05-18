import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';

import {
    toggleProject,
    addProject,
    startAddProject,
    finishAddProject,
    newProjectInput,
    newProjectInputDanger,
} from '../states/todo-actions.js';

import ProjectItem from './ProjectItem.js';
import './ProjectSelecter.css'

class ProjectSelecter extends React.Component {
    static propTypes = {
        projectToggle: PropTypes.bool,
        name: PropTypes.string,
        projectList: PropTypes.array,
        addingProject: PropTypes.bool,
        inputValue: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.inputEl = null;
    };

    render() {
        const { projectToggle, projectList, name, addingProject, inputValue } = this.props;

        const projectMenu = projectList.map(e => {
            return <ProjectItem id={e._id} name={e.name} />
        });

        return (
            <div className='project align-self-start'>
                <ButtonDropdown type='buttom' isOpen={projectToggle} toggle={this.handleProjectToggle}>
                    <DropdownToggle className='project-toggle' type='button' caret color="light">
                        {name !== '' ? name : 'Choose a project'}
                    </DropdownToggle>
                    <DropdownMenu>
                        {projectMenu}
                        {addingProject ?
                            <div className='add-project'>
                                <input type='text'
                                    className='form-control no-border'
                                    placeholder='Name your project'
                                    innerRef={el => { this.inputEl = el }}
                                    value={inputValue}
                                    onChange={this.handleInputChange} />
                                <div className='add-or-cancel'>
                                    <button type="button" class="btn btn-info btn-sm mb-0 ml-1 mt-2" onClick={this.handleAddProject}>Add</button>
                                    <button type="button" class="btn btn-info btn-sm mb-0 ml-1 mt-2" onClick={this.handleCancelAddProject}>Cancel</button>
                                </div>
                            </div> :
                            <div className='last-item d-flex flex-row'>
                                <div className='new-project flex-grow-1' onClick={this.handleNewProjectToggle}>
                                    <i className="fas fa-plus"></i>
                                    Add project
                                </div>
                                <div className='remove align-self-center'>
                                    <i className="far fa-times-circle"></i>
                                </div>
                            </div>}
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        )
    }

    handleProjectToggle = (e) => {
        const { addingProject, dispatch } = this.props;

        if (addingProject)
            this.handleCancelAddProject();

        dispatch(toggleProject());
    }

    handleInputChange = (e) => {
        const text = e.target.value
        this.props.dispatch(newProjectInput(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(newProjectInputDanger(false));
        }
    }

    handleNewProjectToggle = () => {
        this.props.dispatch(startAddProject());
    }

    handleAddProject = () => {
        const { inputValue, dispatch, projectList } = this.props;

        if (!inputValue) {
            dispatch(newProjectInputDanger(true));
            return;
        }

        for (let i = 0; i < projectList.length; i++) {
            if (projectList[i].name === inputValue) {
                alert(`${inputValue} has been created.`);
                return;
            }
        }

        dispatch(addProject(inputValue));
        dispatch(newProjectInput(''));
    }

    handleCancelAddProject = () => {
        const { inputValue, dispatch } = this.props;

        if (inputValue !== '')
            dispatch(newProjectInput(''));

        dispatch(finishAddProject());
    }
}

export default connect(state => ({
    ...state.project
}))(ProjectSelecter)