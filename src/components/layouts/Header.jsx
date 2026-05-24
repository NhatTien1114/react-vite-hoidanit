import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useState } from "react";
import { HomeOutlined, UserOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
const Header = () => {

    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
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
        {
            label: 'Cài đặt',
            key: 'settings',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to="/login">Login</Link>,
                    key: "login"
                },
                {
                    label: "Đăng xuất",
                    key: "logout"
                },
            ],
        },
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