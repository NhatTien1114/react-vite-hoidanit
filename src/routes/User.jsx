import UserTable from "../components/users/user.table";
import UserForm from "../components/users/user.form";
import { useEffect, useState } from "react";
import { fetchAllUserAPI } from "../services/axios.service";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        { loadUser() }
    }, [current, pageSize])

    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        console.log("Kết quả", res.data)
        setDataUsers(res.data.result);
    }
    return (
        <div>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                setTotal={setTotal}
            />
        </div>
    )
}

export default UserPage;