import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFileAPI, updateBookAPI } from "../../services/axios.service";

const BookUpdate = (props) => {
    const { isOpenUpdate, setIsOpenUpdate, bookUpdate, setBookUpdate, getAllBooks } = props;

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (bookUpdate) {
            setId(bookUpdate._id);
            setMainText(bookUpdate.mainText);
            setAuthor(bookUpdate.author);
            setPrice(bookUpdate.price);
            setQuantity(bookUpdate.quantity);
            setCategory(bookUpdate.category);
            setThumbnail(null);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdate.thumbnail}`);
        }
    }, [bookUpdate])

    const handleChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setThumbnail(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
    }

    const updateBook = async (newThumbnail) => {
        const res = await updateBookAPI(id, mainText, author, price, quantity, category, newThumbnail);
        if (res.data) {
            notification.success({
                message: "Update book successfully",
                description: "Cập nhật sách thành công"
            })
            closeModal();
            await getAllBooks();
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const handleUpdateBook = async () => {
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

        await updateBook(newThumbnail);
    }

    const closeModal = () => {
        setIsOpenUpdate(false);
        setId("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setThumbnail(null);
        setBookUpdate(null);
        setPreview(null);
    }
    return (
        <>
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpenUpdate}
                onOk={() => { handleUpdateBook() }}
                onCancel={() => closeModal()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <span>ID</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(e) => setMainText(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Giá tiền</span>
                        <InputNumber style={{ width: '100%' }}
                            value={price}
                            onChange={(val) => setPrice(val)}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <InputNumber style={{ width: '100%' }}
                            value={quantity}
                            onChange={(val) => setQuantity(val)}
                        />
                    </div>
                    <div>
                        <span>Thể loại</span>
                        <Select
                            style={{ width: '100%' }}
                            value={category}
                            onChange={(val) => setCategory(val)}
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
                        <label htmlFor="updateUpload" style={{ display: 'inline-block', marginLeft: 8, padding: '6px 12px', background: '#1890ff', color: '#fff', borderRadius: 4, cursor: 'pointer' }}>Upload</label>
                        <input
                            id="updateUpload" hidden type="file"
                            onChange={(e) => { handleChangeFile(e) }}
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
            </Modal>
        </>
    )
}
export default BookUpdate;
