import axios from 'axios';

const todoBaseUrl = 'http://localhost:3000/api/todos';

export const listTodos = (filterMode = 'all') => {
    let url = `${todoBaseUrl}?mode=`;

    if (filterMode === 'active')
        url += 'active';
    else if (filterMode === 'completed')
        url += 'completed';
    else
        url += 'all';

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then((res) => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}


export const createTodo = (text) => {
    let url = todoBaseUrl;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, { text }).then((res) => {
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
