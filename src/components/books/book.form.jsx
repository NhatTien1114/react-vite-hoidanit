import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFileAPI } from "../../services/axios.service";

const BookForm = (props) => {
    const { getAllBooks } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState(null);
    const [thumbnail, setThumbnail] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [preview, setPreview] = useState(null);

    const handleCreateBook = async () => {
        const uploadThumbnal = await handleUploadFileAPI(thumbnail, "book");

        if (uploadThumbnal.data) {
            const newThumbnail = uploadThumbnal.data.fileUploaded;
            const res = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);
            if (res.data) {
                notification.success({
                    message: "Create success",
                    description: "Tạo mới sách thành công"
                });
                clearModal();
                setIsModalOpen(false);
                await getAllBooks();
            } else {
                notification.error({
                    message: "Create error",
                    description: JSON.stringify(res.message)
                })
            }
        } else {
            message.error("Upload error")
        }

    }

    const clearModal = () => {
        setThumbnail("");
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory(null)
        setPreview(null);
    }

    const handleUploadFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setThumbnail(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setThumbnail(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="user-form" style={{ margin: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Book Table</h3>
                    <Button onClick={() => setIsModalOpen(true)} type="primary">Create Book</Button>
                </div>
            </div>
            <Modal
                title="Create Book"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleCreateBook()}
                onCancel={() => {
                    clearModal();
                    setIsModalOpen(false);
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Giá tiền</span>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                        />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(value) => setCategory(value)}
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
                    </div>
                    <div>
                        <span>Ảnh thumbnail</span>
                        <label htmlFor='btnUpload' style={{
                            display: 'block',
                            width: 'fit-content',
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: 'blue',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>Upload</label>
                        <input type='file' id='btnUpload' style={{ display: 'none' }} onChange={handleUploadFile} />
                    </div>
                    {preview &&
                        <>
                            <div>
                                <img src={preview} alt="avatar" style={{ width: '50%' }} />
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </div>
    )
}
export default BookForm;