import React from 'react';
import PropTypes from 'prop-types';

import './WeatherTable.css';

export default class WeatherTable extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        unit: PropTypes.string,
        list: PropTypes.array
    };

    static weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    render() {
        const { masking, list } = this.props;

        return (
            <div className={`weather-table ${masking ? 'masking' : ''}`}>
                <div className='d-flex justify-content-around'>{
                    list.map((el, i) => (
                        <div key={el.ts} className={i > 2 ? 'hidden-xs-down' : ''}>
                            <div className='day'>{
                                WeatherTable.weekDays[(new Date(el.ts * 1000)).getDay()]
                            }</div>
                            <i className={`owf owf-${el.code}`}></i>
                            <span className='weather'>
                                <span className='max-temp'>{el.maxTemp.toFixed(0)}&ordm;</span>
                                <span className='min-temp'>{el.minTemp.toFixed(0)}&ordm;</span>
                            </span>
                        </div>
                    ))
                }</div>
            </div>
        );
    }
}
