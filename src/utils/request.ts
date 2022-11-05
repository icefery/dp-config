import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 3000
})

export default request
