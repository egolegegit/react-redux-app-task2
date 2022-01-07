import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task 1', complited: false },
  { id: 2, title: 'Task 2', complited: false },
]

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
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
const { update, remove } = actions

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
