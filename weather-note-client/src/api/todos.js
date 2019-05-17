import axios from 'axios';

const todoBaseUrl = 'http://localhost:3000/api/todos';

export const listTodos = (filterMode = 'all', project) => {
    let url = `${todoBaseUrl}?`;

    if (filterMode === 'active')
        url += 'mode=active';
    else if (filterMode === 'completed')
        url += 'mode=completed';
    else
        url += 'mode=all';

    url += `&project=${project}`

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}


export const createTodo = (text, date, project) => {
    let url = todoBaseUrl;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { text, date, project }).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}


export const accomplishTodo = (id) => {
    let url = `${todoBaseUrl}/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}


export const removeTodo = (id) => {
    let url = `${todoBaseUrl}/${id}`;

    console.log(`Making DELETE request to: ${url}`);

    return axios.delete(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
