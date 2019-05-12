import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';

import { toggleForm, input, toggleTemp, selectUnit } from '../states/weather-actions.js';

import './WeatherForm.css';

class WeatherForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        formToggle: PropTypes.bool,
        tempToggle: PropTypes.bool,
        unit: PropTypes.string,
        address: PropTypes.string,
        defaultUnit: PropTypes.string,
        submitAction: PropTypes.func,
        dispatch: PropTypes.func
    };

    static getUnitString(unit) {
        return unit === 'metric' ? 'C' : 'F';
    }

    constructor(props) {
        super(props);

        this.inputEl = null;
    }

    componentDidMount() {
        this.props.dispatch(selectUnit(this.props.defaultUnit));
    }

    render() {
        const { inputValue, formToggle, tempToggle, unit, address } = this.props;
        const formCls = formToggle ? 'form' : '';

        return (
            <div className={`weather-form ${formCls}`}>{formToggle ?
                <Form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
                    <Input type='text' name='address' innerRef={el => { this.inputEl = el }} value={inputValue} onChange={this.handleInputChange}></Input>&nbsp;
                    <ButtonDropdown type='buttom' isOpen={tempToggle} toggle={this.handleTempToggle}>
                        <DropdownToggle type='button' caret color="secondary">
                            &ordm; {WeatherForm.getUnitString(unit)}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={this.handleMetricUnit}>&ordm; C</DropdownItem>
                            <DropdownItem type='button' onClick={this.handleImperialUnit}>&ordm; F</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>&nbsp;
                    <Button color="info">Check</Button>
                </Form> :
                <Button className='btn-form' outline color="light" onClick={this.handleFormToggle}><i className='fa fa-map-marker' aria-hidden="true"></i>&nbsp;&nbsp;{address}</Button>
            }</div>
        );
    }

    handleFormToggle = () => {
        this.props.dispatch(toggleForm());
    }

    handleInputChange = (e) => {
        this.props.dispatch(input(e.target.value));
    }

    handleMetricUnit = (e) => {
        this.props.dispatch(selectUnit('metric'));
    }

    handleImperialUnit = (e) => {
        this.props.dispatch(selectUnit('imperial'));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.inputEl.blur();
        const { inputValue, address, unit, dispatch } = this.props;
        if (inputValue && inputValue.trim()) {
            dispatch(this.props.submitAction(inputValue, unit));
            this.handleFormToggle();
        } else {
            dispatch(input(address));
        }
    }

    handleTempToggle = (e) => {
        this.props.dispatch(toggleTemp());
    }
}

export default connect(state => state.weatherForm)(WeatherForm);
