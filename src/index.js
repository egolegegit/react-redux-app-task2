import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { titleChange, taskDelete, completedTask, getTasks } from './store/task'
import configureStore from './store/store'
import { Provider, useSelector } from 'react-redux'

const store = configureStore()

const App = () => {
  const state = useSelector((state) => state)
  console.log('state', state)

  useEffect(() => {
    store.dispatch(getTasks())
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
