const TodoData = (props) => {

    const { todoList, deleteTodo } = props

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-items" key={item.id}>
                        <div>
                            {item.name}
                        </div>
                        <button className="todo-delete" onClick={() => deleteTodo(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoData;