import { useState } from "react";

const TodoNew = (props) => {

    const [inputValue, setInputValue] = useState("")

    const { addTodo } = props

    const handleClick = () => {
        addTodo(inputValue)
        setInputValue("")
    }

    const handleOnChange = (name) => {
        setInputValue(name)
    }
    return (
        <div className="todo-new" >
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} value={inputValue} />
            <button className="todo-add" onClick={handleClick}>Add</button>
        </div >
    )
};

export default TodoNew;