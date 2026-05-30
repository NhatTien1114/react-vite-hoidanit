import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { updateAvatarFileAPI } from "../../services/axios.service";
import { handleUploadFileAPI } from "../../services/axios.service";

const UserViewDetail = (props) => {
    const { userView, setUserView, isViewModalOpen, setIsViewModalOpen, loadUser } = props;

    // eslint-disable-next-line no-unused-vars
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleUploadFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateAvatar = async () => {
        // step 1: upload file
        const resUploadFile = await handleUploadFileAPI(selectedFile, "avatar");

        if (resUploadFile.data) {
            // step 2: update avatar
            const newAvatar = resUploadFile.data.fileUploaded;
            const resUpdateAvatar = await updateAvatarFileAPI(newAvatar, userView._id, userView.fullName, userView.phone);

            if (resUpdateAvatar.data) {
                // success
                setSelectedFile(null)
                setIsViewModalOpen(false)
                setPreview(null);
                await loadUser()
                notification.success({
                    message: "Update avatar success",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Update avatar error",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            //  error
            notification.error({
                message: "Upload file error",
                description: JSON.stringify(resUploadFile.message)
            })
        }
    }

    return (
        <Drawer
            title="Information User"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setIsViewModalOpen(false);
                setUserView(null);
            }}
            open={isViewModalOpen}
        >
            {userView ? <>
                <p>ID: <b>{userView._id}</b></p>
                <br />
                <p>Full name: <b>{userView.fullName}</b></p>
                <br />
                <p>Email: <b>{userView.email}</b></p>
                <br />
                <p>Phone number: <b>{userView.phone}</b></p>
                <br />
                <div>
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userView.avatar}`} alt="avatar" style={{ width: '100%' }} />
                </div>
                <div>
                    <label htmlFor='btnUpload' style={{
                        display: 'block',
                        width: 'fit-content',
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>Upload Avatar</label>
                    <input type='file' id='btnUpload' style={{ display: 'none' }} onChange={handleUploadFile} />
                </div>
                {preview &&
                    <>
                        <div>
                            <img src={preview} alt="avatar" style={{ width: '100%' }} />
                        </div>
                        <Button color="default" onClick={() => { handleUpdateAvatar() }}>Save</Button>
                    </>
                }
            </> : <p>No data</p>}
        </Drawer>
    )
}

export default UserViewDetail;