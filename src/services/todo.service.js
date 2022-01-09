import htttpService from './http.service'

const todoEndpoint = 'todos'

const todoService = {
  fetch: async () => {
    const { data } = await htttpService.post(todoEndpoint, {
      title: 'new todo',
      completed: false,
    })

    return data
  },
}

export default todoService
