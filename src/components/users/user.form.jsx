import { App, Button, Input, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/axios.service";

const UserForm = (props) => {
    const { notification } = App.useApp();

    const [fullNameInput, setFullNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { loadUser } = props;
    const handleDataForm = async () => {
        const res = await createUserAPI(fullNameInput, emailInput, passwordInput, phoneNumberInput);
        if (res.data) {
            notification.success({
                message: "Create user successfully",
                description: "Tạo user thành công"
            })
            loadDataAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: res.message
            })
        }
    }

    const loadDataAndCloseModal = () => {
        setIsModalOpen(false);
        setFullNameInput("");
        setEmailInput("");
        setPasswordInput("");
        setPhoneNumberInput("");
    }

    return (
        <div className="user-form" style={{ margin: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Create Table</h3>
                    <Button onClick={() => setIsModalOpen(true)} type="primary">Create User</Button>
                </div>
            </div>
            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => handleDataForm()}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullNameInput}
                            onChange={(event) => setFullNameInput(event.target.value)}
                            placeholder="Full Name" />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={emailInput}
                            onChange={(event) => setEmailInput(event.target.value)}
                            placeholder="Email" />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={passwordInput}
                            onChange={(event) => setPasswordInput(event.target.value)}
                            placeholder="Password" />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            value={phoneNumberInput}
                            onChange={(event) => setPhoneNumberInput(event.target.value)}
                            placeholder="Phone Number" />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserForm;