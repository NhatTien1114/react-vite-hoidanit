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

const fetchAllUserAPI = () => {
    const URL = "/api/v1/user";
    return axios.get(URL);
}

export { createUserAPI, fetchAllUserAPI }