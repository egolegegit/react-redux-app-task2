import { createAction } from '@reduxjs/toolkit'

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

function taskReducer(state = [], action) {
  switch (action.type) {
    case update.type: {
      const newArray = [...state]
      const elementIndex = newArray.findIndex(
        (item) => item.id === action.payload.id
      )
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
      return newArray
    }

    case remove.type: {
      const newArray = [...state]
      return newArray.filter((item) => item.id !== action.payload.id)
    }

    default:
      return state
  }
}

export default taskReducer
