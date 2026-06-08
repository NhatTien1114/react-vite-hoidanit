import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { HomeOutlined, UserOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/axios.service";
const Header = () => {

    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const onClick = e => {
        setCurrent(e.key);
    };

    const location = useLocation();

    useEffect(() => {
        if (location && location.pathname) {
            const path = ["users", "books"];
            const pathName = path.find(item => `/${item}` === location.pathname);
            if (pathName) {
                setCurrent(pathName);
            } else {
                setCurrent("home");
            }
        }
    }, [location])

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.clear("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            })
            message.success("Logout success");
        }
        navigate("/");
    }

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        ...(!user.id ? [{
            label: <Link to="/login">Login</Link>,
            key: "login",
            icon: <LoginOutlined />

        }] : []),
        ...(user.id ? [
            {
                label: `Welcome ${user.fullName}`,
                key: 'settings',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span onClick={() => handleLogout()}>Logout</span>,
                        key: "logout"
                    },
                ],
            },
        ] : []),
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            items={items} />

    )
}

export default Header;