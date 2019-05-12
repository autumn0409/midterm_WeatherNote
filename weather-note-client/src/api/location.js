import axios from 'axios';

const key = 'AIzaSyDrQpacyuBhAAB5TFobrhKWyk7rugcEOfw';

const geoCodingBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}`;
let geoCodingSource = axios.CancelToken.source();

export const locationToAddress = (pos) => {
    let url = `${geoCodingBaseUrl}&latlng=${pos.lat},${pos.lon}&result_type=administrative_area_level_3`;

    console.log(`Making request to ${url}`);

    return axios.get(url, { cancelToken: geoCodingSource.token }).then(function (res) {
        if (res.data.error_message)
            throw new Error(res.data.error_message);

        return res.data.results[0].formatted_address;
    }).catch(function (err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export const searchAddress = (inputAddress) => {
    let url = `${geoCodingBaseUrl}&address=${inputAddress}`;

    console.log(`Making request to ${url}`);

    return axios.get(url, { cancelToken: geoCodingSource.token }).then(function (res) {
        if (res.data.error_message)
            throw new Error(res.data.error_message);

        if (res.data.status === "ZERO_RESULTS")
            throw new Error(`There's no result for ${inputAddress}`);

        return {
            pos: {
                lat: res.data.results[0].geometry.location.lat,
                lon: res.data.results[0].geometry.location.lng,
            },
            address: res.data.results[0].formatted_address,
        };
    }).catch(function (err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export const getCurrentLocation = (getState) => {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const currentLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            resolve(currentLocation);
        }, () => {
            resolve(getState().location);
        });
    });
}