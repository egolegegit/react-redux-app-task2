import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todo.service'

const initialState = []

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      console.log('action', action)
      return action.payload
    },
    update(state, action) {
      const elementIndex = state.findIndex(
        (item) => item.id === action.payload.id
      )
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload.id)
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived } = actions

const taskRequested = createAction('task/requested')
const taskFRequestedFailed = createAction('task/requestFailed')

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())

  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
    console.log('data', data)
  } catch (error) {dispatch(taskFRequestedFailed(error.message))}
}

export const completedTask = (id) => (getState, dispatch) => {
  dispatch(update({ id: id, complited: true }))
}

export function titleChange(id) {
  return update({ id, title: `New title for ${id}` })
}

export function taskDelete(id) {
  return remove({ id })
}

export default taskReducer
