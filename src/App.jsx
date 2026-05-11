import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'
import { useState } from 'react'
const App = () => {

  const name = "Nhật Tiến"
  const age = 21
  const data = {
    name: "Nhật Tiến",
    age: 21
  }

  const [todoList, setTodoList] = useState([
    {
      id: 1, name: "Học ReactJS"
    },
    {
      id: 2, name: "Học JavaScript"
    },
  ])


  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const addTodo = (name) => {
    const newTodo = { id: randomIntFromInterval(3, 1000), name: name }
    setTodoList([...todoList, newTodo])
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addTodo={addTodo}
      />
      <TodoData
        name={name}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className="todo-image">
        <img src={ReactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
