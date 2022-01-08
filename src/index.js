import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { titleChange, taskDelete, completedTask, getTasks } from './store/task'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'

const store = configureStore()

const App = () => {
  const state = useSelector((state) => state.tasks.entities)
  const isLoading = useSelector((state) => state.tasks.isLoading)
  const error = useSelector((state) => state.errors.entities[0])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDelete(taskId))
  }

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h3>{error}</h3>
  }

  return (
    <>
      <h1>Apps</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>{`complited: ${item.complited}`}</p>
            <button onClick={() => dispatch(completedTask(item.id))}>
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
