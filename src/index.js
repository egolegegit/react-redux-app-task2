import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { titleChange, taskDelete, completedTask } from './store/task'
import configureStore from './store/store'

const store = configureStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const changeTitle = (taskId) => {
    store.dispatch(titleChange(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(taskDelete(taskId))
  }

  return (
    <>
      <h1>Apps</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>{`complited: ${item.complited}`}</p>
            <button onClick={() => store.dispatch(completedTask(item.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(item.id)}>Change title</button>
            <button onClick={() => deleteTask(item.id)}>Delete</button>
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
