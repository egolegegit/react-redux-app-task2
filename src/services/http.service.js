import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

const htttpService = {
  get: axios.get,
}

export default htttpService
