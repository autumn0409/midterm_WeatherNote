import axios from 'axios';

const projectBaseUrl = 'http://weathernote-server-dev.us-west-2.elasticbeanstalk.com';

export const listProjects = () => {
    let url = `${projectBaseUrl}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const addProject = (name) => {
    let url = projectBaseUrl;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { name }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export const removeProject = (name) => {
    let url = `${projectBaseUrl}/${name}`;

    console.log(`Making DELETE request to: ${url}`);

    return axios.delete(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
