import { createStore } from 'redux'
import taskReducer from './task'

const initialState = [
  { id: 1, title: 'Task 1', complited: false },
  { id: 2, title: 'Task 2', complited: false },
]

function configureStore() {
  return createStore(taskReducer, initialState)
}

export default configureStore
