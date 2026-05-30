import { Button } from "antd";

const BookForm = () => {
    return (
        <>
            <div className="user-form" style={{ margin: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Book Table</h3>
                        <Button type="primary">Create Book</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BookForm;