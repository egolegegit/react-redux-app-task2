import httpService from './http.service'

const todoEndpoint = 'todos'
const todosEndpoint = 'todos/'
const fakeTodo = {
  title: 'new todo',
  completed: false,
}

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 10 },
    })

    return data
  },
  post: async () => {
    const { data } = await httpService.post(todoEndpoint, fakeTodo)

    return data
  },
}

export default todosService
