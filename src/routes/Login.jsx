import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, notification, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/axios.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';

const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
};

const titleStyle = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '8px',
};

const subtitleStyle = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#888',
    marginBottom: '32px',
};

const buttonStyle = {
    width: '100%',
    height: '44px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
};

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Login success");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Login fail",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    }
    return (
        <div style={pageStyle} >
            <div style={cardStyle}>
                <div style={titleStyle}>Welcome Back</div>
                <div style={subtitleStyle}>Đăng nhập vào tài khoản của bạn</div>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            size="large"
                            placeholder="Nhập email của bạn"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    form.submit();
                                }
                            }}
                            size="large"
                            placeholder="Nhập mật khẩu"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={buttonStyle} loading={loading}>
                                Đăng nhập
                            </Button>
                        </Form.Item>

                        <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                    </div>



                    <Divider />
                    <Row justify="center">
                        <span>Chưa có tài khoản?</span>
                        <Link to="/register">Đăng ký tại đây</Link>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;