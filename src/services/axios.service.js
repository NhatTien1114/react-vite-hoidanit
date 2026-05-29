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

const fetchAllUserAPI = (current, pageSize) => {
    const URL = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL);
}

const handleUploadFileAPI = (file, folder) => {
    const URL = "/api/v1/file/upload";
    const config = {
        headers: {
            "upload-type": folder,
            'Content-Type': 'multipart/form-data',
        },
    }
    const formData = new FormData();
    formData.append('fileImg', file);
    return axios.post(URL, formData, config);
}

const updateAvatarFileAPI = (avatar, _id, fullNameInput, phoneNumberInput) => {
    const URL = "/api/v1/user";
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullNameInput,
        phone: phoneNumberInput
    }
    return axios.put(URL, data);
}

const registerUserAPI = (fullNameInput, emailInput, passwordInput, phoneNumberInput) => {
    const URL = "/api/v1/user/register";
    const data = {
        fullName: fullNameInput,
        email: emailInput,
        password: passwordInput,
        phone: phoneNumberInput
    }
    return axios.post(URL, data);
}

const loginAPI = (email, password) => {
    const URL = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        // delay: 3000
    };
    return axios.post(URL, data);
}

const getAccountAPI = () => {
    const URL = "/api/v1/auth/account";
    return axios.get(URL);
}

const logoutAPI = () => {
    const URL = "/api/v1/auth/logout";
    return axios.post(URL);
}

export {
    createUserAPI,
    updateUserAPI,
    deleteUserAPI,
    fetchAllUserAPI,
    handleUploadFileAPI,
    updateAvatarFileAPI,
    registerUserAPI,
    loginAPI,
    getAccountAPI,
    logoutAPI
}