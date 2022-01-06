import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task 1', complited: false },
  { id: 2, title: 'Task 2', complited: false },
]

const update = createAction('task/updated')
const remove = createAction('task/removed')

export function taskComplete(id) {
  return update({ id: id, complited: true })
}

export function titleChange(id) {
  return update({ id, title: `New title for ${id}` })
}

export function taskDelete(id) {
  return remove({ id })
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex(
        (item) => item.id === action.payload.id
      )
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    })
    .addCase(remove, (state, action) => {
      return state.filter((item) => item.id !== action.payload.id)
    })
})

export default taskReducer
