import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WeatherDisplay from '../components/WeatherDisplay';
import WeatherTable from '../components/WeatherTable';
import WeatherForm from '../components/WeatherForm';
import { getWeather } from '../states/weather-actions';
import { cancelCurrntWeather, cancelForecast } from '../api/open-weather-map.js';

import './Weather.css';

class Weather extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        address: PropTypes.string,
        unit: PropTypes.string,
        masking: PropTypes.bool,
        dispatch: PropTypes.func,

        list: PropTypes.array,
        forecastLoading: PropTypes.bool,

        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        currentWeatherLoading: PropTypes.bool,
    };

    componentDidMount() {
        this.props.dispatch(getWeather(this.props.inputValue, this.props.unit));
    }

    componentWillUnmount() {
        if (this.props.currentWeatherLoading) {
            cancelCurrntWeather();
        };

        if (this.props.forecastLoading) {
            cancelForecast();
        };
    }

    render() {
        const { address, group, description, temp, list, unit, masking } = this.props;
        const forecast = list;

        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='weather'>
                <div className='current'>
                    <WeatherForm address={address} defaultUnit={unit} submitAction={getWeather} />
                    <WeatherDisplay {...{ group, description, temp, unit, masking }} day='today' />
                </div>
                <div className='forecast'>
                    <WeatherTable list={forecast} unit={unit} masking={masking} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    ...state.currentWeather,
    ...state.forecast,
    inputValue: state.weatherForm.inputValue,
    unit: state.unit,
    address: state.address,
    masking: state.masking,
}))(Weather);
