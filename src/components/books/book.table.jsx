import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import BookDetail from "./book.view.detail";
// import BookUpdate from "./book.update.modal";
import BookUpdateUncontroll from "./book.update.uncontroll";
import { deleteBookAPI } from "../../services/axios.service";

const BookTable = (props) => {
    const { books, current, setCurrent, pageSize, setPageSize, total, getAllBooks } = props

    const [bookDetail, setBookDetail] = useState(null);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [bookUpdate, setBookUpdate] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [bookDelete, setBookDelete] = useState(null);

    const handleDelteBook = async (id) => {
        setIsOpenDelete(false);
        setBookDelete(null);
        await deleteBookAPI(id);
        notification.success({
            message: "Delete book successfully",
            description: "Xóa sách thành công"
        })
        await getAllBooks();
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
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a onClick={() => {
                            setBookDetail(record);
                            setIsOpenDrawer(true);
                        }}>{record._id}</a>
                    </>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => {
                if (text) {
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
                }
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <EditOutlined style={{ color: 'orange' }} onClick={() => {
                                {
                                    setIsOpenUpdate(true)
                                    setBookUpdate(record)
                                }
                            }} />
                            <Popconfirm
                                title="Delete the book"
                                description="Are you sure to delete this book?"
                                onConfirm={() => {
                                    handleDelteBook(record._id)
                                }}
                                onCancel={() => {
                                    setIsOpenDelete(false);
                                    setBookDelete(null);
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteOutlined style={{ color: 'red' }}

                                />
                            </Popconfirm>


                        </div>
                    </Space>
                )
            }
        },
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
            <Table dataSource={books} columns={columns} rowKey="_id"
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
            <BookDetail
                bookDetail={bookDetail}
                isOpenDrawer={isOpenDrawer}
                setBookDetail={setBookDetail}
                setIsOpenDrawer={setIsOpenDrawer}
            />
            {/* <BookUpdate
                isOpenUpdate={isOpenUpdate}
                setIsOpenUpdate={setIsOpenUpdate}
                bookUpdate={bookUpdate}
                setBookUpdate={setBookUpdate}
                getAllBooks={getAllBooks}
            /> */}
            <BookUpdateUncontroll
                isOpenUpdate={isOpenUpdate}
                setIsOpenUpdate={setIsOpenUpdate}
                bookUpdate={bookUpdate}
                setBookUpdate={setBookUpdate}
                getAllBooks={getAllBooks}
            />
        </>
    )
}

export default BookTable;