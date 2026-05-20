import { Drawer } from "antd";

const UserViewDetail = (props) => {
    const { userView, setUserView, isViewModalOpen, setIsViewModalOpen } = props;

    return (
        <Drawer
            title="Information User"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setIsViewModalOpen(false);
                setUserView(null);
            }}
            open={isViewModalOpen}
            mask={false}
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
                    <input type='file' id='btnUpload' style={{ display: 'none' }} />
                </div>
            </> : <p>No data</p>}
        </Drawer>
    )
}

export default UserViewDetail;