import axios from 'axios';

const key = '36978c6550efee0e27e50850cc57adda';

export const getWeatherGroup = (code) => {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

export const capitalize = (string) => {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}




const currentWeatherBaseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
let currentWeatherSource = axios.CancelToken.source();

export const getCurrentWeather = (pos, unit) => {
    var url = `${currentWeatherBaseUrl}&lat=${pos.lat}&lon=${pos.lon}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, { cancelToken: currentWeatherSource.token }).then(function (res) {
        if (res.data.cod && res.data.message)
            throw new Error(res.data.message);

        return {
            code: res.data.weather[0].id,
            group: getWeatherGroup(res.data.weather[0].id),
            description: res.data.weather[0].description,
            temp: res.data.main.temp,
            unit: unit
        };
    }).catch(function (err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelCurrntWeather() {
    currentWeatherSource.cancel('Current weather request canceled');
}




const forecastBaseUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?appid=${key}&cnt=6`;
let forecastSource = axios.CancelToken.source();

export const getForecast = (pos, unit) => {
    var url = `${forecastBaseUrl}&lat=${pos.lat}&lon=${pos.lon}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, { cancelToken: forecastSource.token }).then(function (res) {
        if (Number(res.data.cod) !== 200)
            throw new Error(res.data.message);

        const list = res.data.list.map(forecast => {
            return {
                ts: forecast.dt,
                code: forecast.weather[0].id,
                group: getWeatherGroup(forecast.weather[0].id),
                description: forecast.weather[0].main,
                maxTemp: forecast.temp.max,
                minTemp: forecast.temp.min,
            };
        });
        list.shift(); // remove today

        return {
            unit: unit,
            list
        };
    }).catch(function (err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export const cancelForecast = () => {
    forecastSource.cancel('Forecast request canceled');
}
