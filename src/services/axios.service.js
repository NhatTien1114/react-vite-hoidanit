import axios from "./axios.customize";

const createUserAPI = (fullNameInput, emailInput, passwordInput, phoneNumberInput) => {
    const URL = "/api/v1/user";
    const data = {
        fullName: fullNameInput,
        email: emailInput,
        password: passwordInput,
        phone: phoneNumberInput
    }
    return axios.post(URL, data);
}

const updateUserAPI = (_id, fullNameInput, phoneNumberInput) => {
    const URL = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullNameInput,
        phone: phoneNumberInput
    }
    return axios.put(URL, data);
}

const deleteUserAPI = (_id) => {
    const URL = `/api/v1/user/${_id}`;
    return axios.delete(URL);
}

const fetchAllUserAPI = () => {
    const URL = "/api/v1/user";
    return axios.get(URL);
}

export { createUserAPI, updateUserAPI, deleteUserAPI, fetchAllUserAPI }