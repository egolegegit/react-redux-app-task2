import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from './store/createStore'
import { taskReducer } from './store/taskReducer'
import * as actions from './store/actionTypes'

const initialState = [
  { id: 1, title: 'Task 1', complited: false },
  { id: 2, title: 'Task 2', complited: false },
]

const store = createStore(taskReducer, initialState)

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, complited: true },
    })
  }

  const changeTitle = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, title: `New title for ${taskId}` },
    })
  }

  return (
    <>
      <h1>Apps</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>{`complited: ${item.complited}`}</p>
            <button onClick={() => completeTask(item.id)}>Complete</button>
            <button onClick={() => changeTitle(item.id)}>Change title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
