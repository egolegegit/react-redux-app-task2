import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function taskReducer(state, action) {
  switch (action.type) {
    case 'task/complited':
      const newArray = [...state]
      const elementIndex = newArray.findIndex(
        (item) => item.id === action.payload.id
      )
      newArray[elementIndex].complited = true
      return newArray

    default:
      break
  }
}

function createStore(reducer, initialState) {
  let state = initialState
  let listeners = []

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    for (let index = 0; index < listeners.length; index++) {
      const listener = listeners[index]
      listener()
    }
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  return { getState, dispatch, subscribe }
}

const store = createStore(taskReducer, [
  { id: 1, description: 'Task 1', complited: false },
  { id: 2, description: 'Task 2', complited: false },
])

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch({ type: 'task/complited', payload: { id: taskId } })
  }

  return (
    <>
      <h1>Apps</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            <p>{item.description}</p>
            <p>{`complited: ${item.complited}`}</p>
            <button onClick={() => completeTask(item.id)}>Complete</button>
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
