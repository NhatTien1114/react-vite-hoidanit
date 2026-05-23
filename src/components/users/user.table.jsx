import { useState } from 'react';
import { notification, Popconfirm, Space, Table } from 'antd';
import { deleteUserAPI } from '../../services/axios.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UserUpdateModal from './user.update.modal';
import UserViewDetail from './user.view.detail';

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [userUpdate, setUserUpdate] = useState(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [userView, setUserView] = useState(null);

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete user successfully",
                description: "Xóa user thành công"
            })
            await loadUser();
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a onClick={() => {
                            setUserView(record);
                            setIsViewModalOpen(true);
                        }}>{record._id}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <EditOutlined style={{ color: 'orange' }} onClick={() => {
                            setUserUpdate(record);
                            setIsUpdateModalOpen(true);
                        }} />
                        <Popconfirm
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Delete"
                            cancelText="Cancel"
                            placement="left"
                        >
                            <DeleteOutlined style={{ color: 'red' }} />
                        </Popconfirm>

                    </div>

                </Space>
            ),
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current != +current) {
                setCurrent(+pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
        console.log("Kết quả: ", { pagination, filters, sorter, extra })
    }
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey="_id"
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />
            <UserUpdateModal
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                userUpdate={userUpdate}
                setUserUpdate={setUserUpdate}
                loadUser={loadUser}
            />
            <UserViewDetail
                isViewModalOpen={isViewModalOpen}
                setIsViewModalOpen={setIsViewModalOpen}
                userView={userView}
                setUserView={setUserView}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable;