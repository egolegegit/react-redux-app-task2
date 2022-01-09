import httpService from './http.service'

const todoEndpoint = 'todos'
const todosEndpoint = 'todos/'

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 3 },
    })
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post(todoEndpoint, payload)
    return data
  },
}

export default todosService
