import { Input, Modal } from "antd";
import { useEffect, useState } from "react";

const UserUpdateModal = (props) => {
    const [idInput, setIdInput] = useState("");
    const [fullNameInput, setFullNameInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");

    const { isUpdateModalOpen, setIsUpdateModalOpen, userUpdate, setUserUpdate } = props;

    useEffect(() => {
        if (userUpdate) {
            setIdInput(userUpdate._id);
            setFullNameInput(userUpdate.fullName);
            setPhoneNumberInput(userUpdate.phone);
            setUserUpdate(null);
        }
    }, [userUpdate])

    const handleDataForm = async () => {
        const res = await createUserAPI(fullNameInput, emailInput, passwordInput, phoneNumberInput);
        if (res.data) {
            notification.success({
                message: "Update user successfully",
                description: "Cập nhật user thành công"
            })
            loadDataAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error update user",
                description: res.message
            })
        }
    }

    const loadDataAndCloseModal = () => {
        setIsModalOpen(false);
        setIdInput("");
        setFullNameInput("");
        setPhoneNumberInput("");
    }
    return (
        <Modal
            title="Update a User"
            open={isUpdateModalOpen}
            onOk={() => handleDataForm()}
            onCancel={() => setIsUpdateModalOpen(false)}
            maskClosable={false}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={idInput}
                        placeholder="Id"
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullNameInput}
                        placeholder="Full Name" />
                </div>
                <div>
                    <span>Phone Number</span>
                    <Input
                        value={phoneNumberInput}
                        placeholder="Phone Number" />
                </div>
            </div>
        </Modal>
    )
}

export default UserUpdateModal;