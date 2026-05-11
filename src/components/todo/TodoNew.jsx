import { useState } from "react";

const TodoNew = (props) => {

    const [inputValue, setInputValue] = useState("Bin")

    const { addTodo } = props

    // addTodo("Nhật Tiến")
    const handleClick = () => {
        addTodo(inputValue)
    }

    const handleOnChange = (name) => {
        setInputValue(name)
    }
    return (
        <div className="todo-new" >
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} />
            <button className="todo-add" onClick={handleClick}>Add</button>
        </div >
    )
};

export default TodoNew;