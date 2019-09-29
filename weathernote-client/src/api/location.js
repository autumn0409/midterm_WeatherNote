import axios from 'axios';

const key = "<google's api key>";

const geoCodingBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}`;
let geoCodingSource = axios.CancelToken.source();

const geoLocationBaseUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`;
let geoLocationSource = axios.CancelToken.source();

export const locationToAddress = (pos) => {
    let url = `${geoCodingBaseUrl}&latlng=${pos.lat},${pos.lon}&result_type=administrative_area_level_1`;

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

    let url = geoLocationBaseUrl;

    console.log(`Making Post request to ${url}`);

    return axios.post(url, { cancelToken: geoLocationSource.token }).then(function (res) {
        return {
            lat: res.data.location.lat,
            lon: res.data.location.lng
        };
    }).catch(function (err) {
        console.log(err);
        return getState().location;
    });
}