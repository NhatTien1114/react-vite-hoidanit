import { useCallback, useEffect, useState } from "react";
import { fetchAllBooks } from "../services/axios.service";
import BookTable from "../components/books/book.table";
import BookForm from "../components/books/book.form";

const Book = () => {
    const [books, setBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const getAllBooks = useCallback(async () => {
        const res = await fetchAllBooks(current, pageSize);
        if (res.data) {
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setBooks(res.data.result);
    }, [current, pageSize])

    useEffect(() => {
        { getAllBooks() }
    }, [getAllBooks]);

    return (
        <>
            <BookForm getAllBooks={getAllBooks} />
            <BookTable
                getAllBooks={getAllBooks}
                books={books}
                setBooks={setBooks}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </>
    )
}
export default Book;