import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/axios.service';

const UserTable = (props) => {
    const { dataUsers } = props;
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        }
    ];
    return (
        <Table columns={columns} dataSource={dataUsers} rowKey="_id" />
    )
}

export default UserTable;