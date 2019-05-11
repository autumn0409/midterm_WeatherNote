import {
    getCurrentWeather as getCurrentWeatherFromApi,
    getForecast as getForecastFromApi,
} from '../api/open-weather-map.js';

import {
    getCurrentLocation as getCurrentLocationFromApi,
    locationToAddress as locationToAddressFromApi,
    searchAddress as searchAddressFromApi
} from '../api/location'


/* Unit */

const setUnit = (unit) => {
    return {
        type: '@UNIT/SET_UNIT',
        unit: unit
    };
}

/* Address */

const setAddress = (address) => {
    return {
        type: '@ADDRESS/SET_ADDRESS',
        address: address
    }
}

/* Location */

const setLocation = (location) => {
    return {
        type: '@LOACTION/SET_LOCATION',
        location: location
    }
}

/* Masking */

const maskBg = () => {
    return {
        type: '@MASKING/MASK_BG'
    }
}

const unmaskBg = () => {
    return {
        type: '@MASKING/UNMASK_BG'
    }
}

/* Current Weather */

const startGetCurrentWeather = () => {
    return {
        type: '@CURRENT_WEATHER/START_GET_CURRENT_WEATHER',
    };
}

const endGetCurrentWeather = (code, group, description, temp) => {
    return {
        type: '@CURRENT_WEATHER/END_GET_CURRENT_WEATHER',
        code,
        group,
        description,
        temp,
    };
}

const resetCurrentWeather = () => {
    return {
        type: '@CURRENT_WEATHER/RESET_CURRENT_WEATHER'
    };
}


/* WeatherForm */

export const toggleForm = () => {
    return {
        type: '@WEATHER_FORM/TOGGLE_FORM'
    };
}

export const input = (value) => {
    return {
        type: '@WEATHER_FORM/INPUT',
        value
    };
}

export const toggleTemp = () => {
    return {
        type: '@WEATHER_FORM/TOGGLE_TEMP'
    };
}

export const selectUnit = (unit) => {
    return {
        type: '@WEATHER_FORM/SELECT_UNIT',
        unit
    };
}

/* Forecast */

const startGetForecast = () => {
    return {
        type: '@FORECAST/START_GET_FORECAST',
    };
}

const endGetForecast = (list) => {
    return {
        type: '@FORECAST/END_GET_FORECAST',
        list
    };
}

const resetForecast = () => {
    return {
        type: '@FORECAST/RESET_FORECAST'
    };
}



/* Weather */

export const getWeather = (inputAddress, unit) => {
    return (dispatch, getState) => {

        dispatch(maskBg());

        const getLocation = checkInput(inputAddress, getState).then(inputAddress => {
            return searchAddressFromApi(inputAddress);
        }).then(addressInfo => {
            const { pos, address } = addressInfo;
            dispatch(setAddress(address));
            dispatch(setLocation(pos));
            return pos;
        });

        const getCurrentWeather = getLocation.then(pos => {
            dispatch(startGetCurrentWeather());
            return getCurrentWeatherFromApi(pos, unit);
        }).then(weather => {
            const { code, group, description, temp } = weather;
            dispatch(endGetCurrentWeather(code, group, description, temp));
        }).catch(err => {
            console.error('Error getting current weather', err);
            dispatch(resetCurrentWeather());
            dispatch(unmaskBg());
        });

        const getForecast = getLocation.then(pos => {
            dispatch(startGetForecast());
            return getForecastFromApi(pos, unit);
        }).then(forecast => {
            const { list } = forecast;
            dispatch(endGetForecast(list));
        }).catch(err => {
            console.error('Error getting forecast', err);
            dispatch(resetForecast());
            dispatch(unmaskBg());
        });

        return Promise.all([getCurrentWeather, getForecast]).then(() => {
            dispatch(setUnit(unit));
            dispatch(unmaskBg());
        });
    }
}

const checkInput = (inputAddress, getState) => {
    return new Promise((resolve, reject) => {
        let hasAddress = inputAddress !== '' ? true : false;

        if (!hasAddress) {
            getCurrentLocationFromApi(getState).then(currentLocation => {
                return locationToAddressFromApi(currentLocation);
            }).then(address => {
                resolve(address);
            });
        }
        else
            resolve(inputAddress);
    });
}

