import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (item) => item.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload.id
      )
    },
    create(state, action) {
      const entityMaxId = state.entities.reduce((acc, curr) =>
        acc.b > curr.b ? acc : curr
      )

      action.payload = {
        ...action.payload,
        id: entityMaxId.id + 1,
        title: `New todo ${entityMaxId.id + 1}`,
      }
      state.entities.push(action.payload)
      state.isLoading = false
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskFRequestedFailed(state, action) {
      state.isLoading = false
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, create, recived, taskRequested, taskFRequestedFailed } =
  actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())

  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskFRequestedFailed())
    dispatch(setError(error.message))
  }
}

export const createTask = () => async (dispatch) => {
  dispatch(taskRequested())

  try {
    const data = await todosService.post()
    dispatch(create(data))
  } catch (error) {
    dispatch(taskFRequestedFailed())
    dispatch(setError(error.message))
  }
}

export const completedTask = (id) => {
  return update({ id, complited: true })
}

export function titleChange(id) {
  return update({ id, title: `New title for ${id}` })
}

export function taskDelete(id) {
  return remove({ id })
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
