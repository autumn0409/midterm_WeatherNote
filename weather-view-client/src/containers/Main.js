import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Weather from './Weather';
import Todos from './Todos';

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    render() {
        return (
            <div className='main'>
                <Weather />
                <Todos />
            </div>
        );
    }
}

export default connect()(Main);
