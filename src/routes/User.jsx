import { Button, Input } from "antd";
import UserTable from "../components/users/user.table";
import UserForm from "../components/users/user.form";
import { useEffect, useState } from "react";
import { fetchAllUserAPI } from "../services/axios.service";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        { loadUser() }
    }, [])

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }
    return (
        <div>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} />
        </div>
    )
}

export default UserPage;