import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {

  const [todoList, setTodoList] = useState([

  ])

  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const addTodo = (name) => {
    const newTodo = { id: randomIntFromInterval(3, 1000), name: name }
    setTodoList([...todoList, newTodo])
  }

  const deleteTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id)
    setTodoList(newTodoList)
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addTodo={addTodo}
      />
      {todoList.length > 0 ?
        <TodoData
          deleteTodo={deleteTodo}
          todoList={todoList}
        />
        :
        <div className="todo-image">
          <img src={ReactLogo} className="logo" />
        </div>
      }
    </div>
  )
}

export default App
