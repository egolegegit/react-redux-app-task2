import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import * as actions from './store/actions'
import { initiateStore } from './store/store'

const store = initiateStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch(actions.taskComplete(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChange(taskId))
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
