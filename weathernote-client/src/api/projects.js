import axios from 'axios';

// Develop server URL
// const projectBaseUrl = 'http://localhost:3000/api/projects';

// Staging server URL
const projectBaseUrl = '<Demo link>/api/projects';

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
