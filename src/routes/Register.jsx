import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { registerUserAPI } from '../services/axios.service';
import { Link, useNavigate } from 'react-router-dom';

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

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        );
        if (res.data) {
            notification.success({
                message: "Register successfully",
                description: "Đăng ký thành công"
            });
            navigate("/login")
        } else {
            notification.error({
                message: "Register error",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <div style={titleStyle}>Book Shop</div>
                <div style={subtitleStyle}>Đăng ký tài khoản của bạn</div>
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ margin: "10px" }}
                // onFinishFailed={onFinishFailed}
                >
                    <Row justify={"center"}>
                        <Col xs={24}>
                            <Form.Item
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your fullname!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={"center"}>
                        <Col xs={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={"center"}>
                        <Col xs={24}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={"center"}>
                        <Col xs={24}>
                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[
                                    {
                                        pattern: new RegExp(/\d+/g),
                                        message: "Wrong format!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={"center"}>
                        <Col xs={24}>
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit" style={buttonStyle}>
                                    Register
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />
                    <Row justify={"center"}>
                        <span>Đã có tài khoản?</span>
                        <Link to="/login">Đăng nhập tại đây</Link>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage;