import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  titleChange,
  taskDelete,
  completedTask,
  loadTasks,
  createTask,
  getTasks,
  getTasksLoadingStatus,
} from './store/task'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getError } from './store/errors'

const store = configureStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
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
      <button onClick={() => dispatch(createTask())}>Add todo</button>

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
