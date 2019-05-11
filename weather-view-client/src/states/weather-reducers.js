const initUnitState = 'metric';

export const unit = (state = initUnitState, action) => {
    switch (action.type) {
        case '@UNIT/SET_UNIT':
            return action.unit;
        default:
            return state;
    }
}

const initAddress = '';

export const address = (state = initAddress, action) => {
    switch (action.type) {
        case '@ADDRESS/SET_ADDRESS':
            return action.address;
        default:
            return state;
    }
}


const initLocation = {
    lat: 25.0173405,
    lon: 121.5397518
};

export const location = (state = initLocation, action) => {
    switch (action.type) {
        case '@LOACTION/SET_LOCATION':
            return action.location;
        default:
            return state;
    }
}


const initMaskingState = false;

export const masking = (state = initMaskingState, action) => {
    switch (action.type) {
        case '@MASKING/MASK_BG':
            return true;
        case '@MASKING/UNMASK_BG':
            return false;
        default:
            return state;
    }
}


const initCurrentWeatherState = {
    code: -1,
    group: 'na',
    description: 'N/A',
    temp: NaN,
    currentWeatherLoading: false,
};

export const currentWeather = (state = initCurrentWeatherState, action) => {
    switch (action.type) {
        case '@CURRENT_WEATHER/START_GET_CURRENT_WEATHER':
            return {
                ...state,
                currentWeatherLoading: true
            };
        case '@CURRENT_WEATHER/END_GET_CURRENT_WEATHER':
            return {
                ...state,
                code: action.code,
                group: action.group,
                description: action.description,
                temp: action.temp,
                currentWeatherLoading: false
            };
        case '@CURRENT_WEATHER/RESET_CURRENT_WEATHER':
            return {
                ...initCurrentWeatherState,
            };
        default:
            return state;
    }
}

const initWeatherFormState = {
    inputValue: '',
    formToggle: false,
    tempToggle: false,
    unit: null,
};

export const weatherForm = (state = initWeatherFormState, action) => {
    switch (action.type) {
        case '@WEATHER_FORM/TOGGLE_FORM':
            return {
                ...state,
                formToggle: !state.formToggle
            };
        case '@WEATHER_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@WEATHER_FORM/TOGGLE_TEMP':
            return {
                ...state,
                tempToggle: !state.tempToggle
            };
        case '@WEATHER_FORM/SELECT_UNIT':
            return {
                ...state,
                unit: action.unit
            };
        default:
            return state;
    }
}

const getInitForecastState = () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
        list[i] = {
            ts: -i,
            code: -1,
            group: 'na',
            description: 'N/A',
            maxTemp: NaN,
            minTemp: NaN,
        };
    }
    return {
        list,
        forecastLoading: false,
    };
}

export const forecast = (state = getInitForecastState(), action) => {
    switch (action.type) {
        case '@FORECAST/START_GET_FORECAST':
            return {
                ...state,
                forecastLoading: true
            };
        case '@FORECAST/END_GET_FORECAST':
            return {
                ...state,
                list: action.list,
                forecastLoading: false
            };
        case '@FORECAST/RESET_FORECAST':
            return {
                ...getInitForecastState(),
            };
        default:
            return state;
    }
}

