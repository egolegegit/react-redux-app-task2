import httpService from './http.service'

const todoEndpoint = 'todos'

const todoService = {
  fetch: async () => {
    const { data } = await httpService.post(todoEndpoint, {
      title: 'new todo',
      completed: false,
    })

    return data
  },
}

export default todoService
