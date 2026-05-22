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

export { createUserAPI, updateUserAPI, deleteUserAPI, fetchAllUserAPI, handleUploadFileAPI, updateAvatarFileAPI }