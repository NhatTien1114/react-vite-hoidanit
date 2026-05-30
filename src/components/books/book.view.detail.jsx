import { Drawer } from "antd";

const BookDetail = (props) => {
    const { bookDetail, setBookDetail, isOpenDrawer, setIsOpenDrawer } = props;

    return (
        <>
            <Drawer
                title="Book Detail"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setIsOpenDrawer(false)
                    setBookDetail(null);
                }}
                open={isOpenDrawer}
            >
                {bookDetail ? <>
                    <p>Id: {bookDetail._id}</p>
                    <br />
                    <p>Tiêu đề: {bookDetail.mainText}</p>
                    <br />
                    <p>Tác giả: {bookDetail.author}</p>
                    <br />
                    <p>Thể loại: {bookDetail.category}</p>
                    <br />
                    <p>Giá tiền: {bookDetail.price}</p>
                    <br />
                    <p>Số lượng: {bookDetail.quantity}</p>
                    <br />
                    <p>Đã bán: {bookDetail.sold}</p>
                    <br />
                    <div>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail.thumbnail}`} alt="book" style={{ width: '100%' }} />
                    </div>
                </> : <p>No data</p>}
            </Drawer>
        </>
    )
}
export default BookDetail;