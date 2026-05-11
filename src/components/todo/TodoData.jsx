const TodoData = (props) => {

    const { name, age, data, todoList } = props
    return (
        <div className="todo-data">
            <div className="todo-item"> My Name's {name}</div>
            <div className="todo-item"> Learning React</div>
            <div className="todo-item"> Watching Youtube</div>
            <div className="todo-item">
                {JSON.stringify(todoList)}
            </div>
        </div>
    )
}

export default TodoData;