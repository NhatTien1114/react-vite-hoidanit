import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/axios.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UserUpdateModal from './user.update.modal';

const UserTable = (props) => {
    const { dataUsers } = props;

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [userUpdate, setUserUpdate] = useState(null);
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href="#">{record._id}</a>
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
                        <DeleteOutlined style={{ color: 'red' }} />
                    </div>

                </Space>
            ),
        }
    ];
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey="_id" />
            <UserUpdateModal
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                userUpdate={userUpdate}
                setUserUpdate={setUserUpdate}
            />
        </>

    )
}

export default UserTable;