import axios from 'axios';

export async function getDataAPI(url, token){
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token}
    });
    return res;
}

export async function postDataAPI(url, post, token){
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token}
    });
    return res;
}

export async function putDataAPI(url, post, token){
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token}
    });
    return res;
}

export async function patchDataAPI(url, post, token){
    const res = await axios.patch(`/api/${url}`, post, {
        headers: { Authorization: token}
    });
    return res;
}

export async function deleteDataAPI(url, token){
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token}
    });
    return res;
}