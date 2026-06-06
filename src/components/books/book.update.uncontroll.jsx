import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFileAPI, updateBookAPI } from "../../services/axios.service";

const BookUpdateUncontroll = (props) => {
    const { isOpenUpdate, setIsOpenUpdate, bookUpdate, setBookUpdate, getAllBooks } = props;

    const [form] = Form.useForm();

    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (bookUpdate) {
            form.setFieldsValue({
                id: bookUpdate._id,
                mainText: bookUpdate.mainText,
                author: bookUpdate.author,
                price: bookUpdate.price,
                quantity: bookUpdate.quantity,
                category: bookUpdate.category,
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdate.thumbnail}`);
        } else {
            setPreview(null);
        }
    }, [bookUpdate]);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setThumbnail(null);
            setPreview(bookUpdate ? `${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdate.thumbnail}` : null);
            return;
        }

        const file = event.target.files[0];
        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
    }

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const res = await updateBookAPI(
            id,
            mainText,
            author,
            Number(price),
            Number(quantity),
            category,
            newThumbnail
        );
        if (res.data) {
            notification.success({
                message: "Update book successfully",
                description: "Cập nhật sách thành công"
            });
            closeModal();
            await getAllBooks();
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
            });
        }
    }

    const handleUpdateBook = async (values) => {
        let newThumbnail = bookUpdate?.thumbnail || "";

        if (!thumbnail && !preview) {
            notification.error({
                message: "Thumbnail is required",
                description: "Ảnh thumbnail là bắt buộc"
            });
            return;
        }

        if (thumbnail) {
            const resThumbnail = await handleUploadFileAPI(thumbnail, "book");
            if (resThumbnail.data) {
                newThumbnail = resThumbnail.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload thumbnail",
                    description: JSON.stringify(resThumbnail.message)
                });
                return;
            }
        }

        await updateBook(newThumbnail, values);
    }

    const closeModal = () => {
        form.resetFields();
        setThumbnail(null);
        setPreview(null);
        setIsOpenUpdate(false);
        setBookUpdate(null);
    }
    return (
        <>
            <Modal
                title="Update Book"
                open={isOpenUpdate}
                onOk={() => form.submit()}
                onCancel={() => closeModal()}
                okText={"Update"}
            >

                <Form
                    form={form}
                    onFinish={(values) => handleUpdateBook(values)}
                    layout="vertical"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <Form.Item
                                label="Id"
                                name="id"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Tiêu đề"
                                name="mainText"
                                rules={[{ required: true, message: 'Please input your main text!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[{ required: true, message: 'Please input your author!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Please input your quantity!' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[{ required: true, message: 'Please input your cate!' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    name="category"
                                    options={[
                                        { value: 'Arts', label: 'Arts' },
                                        { value: 'Business', label: 'Business' },
                                        { value: 'Comics', label: 'Comics' },

                                        { value: 'Cooking', label: 'Cooking' },
                                        { value: 'Entertainment', label: 'Entertainment' },
                                        { value: 'History', label: 'History' },

                                        { value: 'Music', label: 'Music' },
                                        { value: 'Sports', label: 'Sports' },
                                        { value: 'Teen', label: 'Teen' },
                                        { value: 'Travel', label: 'Travel' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <span>Ảnh thumbnail</span>
                            <label htmlFor="updateUpload" style={{ display: 'inline-block', marginLeft: 8, padding: '6px 12px', background: '#1890ff', color: '#fff', borderRadius: 4, cursor: 'pointer' }}>Upload</label>
                            <input
                                id="updateUpload" type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => { handleOnChangeFile(e) }}
                                onClick={(e) => { e.target.value = null }}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{ marginTop: '10px', marginBottom: '10px', height: '100px', width: '150px' }}>
                                    <img src={preview} alt="thumbnail" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                </div>
                            </>
                        }
                    </div>
                </Form>

            </Modal >
        </>
    )
}
export default BookUpdateUncontroll;