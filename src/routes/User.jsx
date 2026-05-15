import { Button, Input } from "antd";
import UserTable from "../components/users/user.table";
import UserForm from "../components/users/user.form";

const UserPage = () => {
    return (
        <div>
            <UserForm />
            <UserTable />
        </div>
    )
}

export default UserPage;