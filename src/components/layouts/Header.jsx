import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { HomeOutlined, UserOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from "../context/auth.context";
const Header = () => {

    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext);
    const onClick = e => {
        setCurrent(e.key);
    };

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
                        label: "Đăng xuất",
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