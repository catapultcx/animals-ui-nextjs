import axios from 'axios'

export abstract class BaseAPIService {
  baseUrl: string;
  options : {}

  constructor () {
    this.baseUrl = process.env.API_URL ? process.env.API_URL : 'http://localhost:8080/api/1';
    this.options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  handleError (error: any) {
    console.error(error)
    throw error
  }

  async _fetchGET (url: string) {
    const response = await axios.get(this.baseUrl + url)
    return response.data
  }

  async _fetchPOST (url: string, body: any) {
    console.log(this.baseUrl + url)
    const response = await axios.post(this.baseUrl + url, body, this.options)
    return response.data
  }

  async _fetchDELETE (id: string, url: string) {
    const response = await axios.delete(`${this.baseUrl + url}/${encodeURIComponent(id)}`);
    return response.data
  }

  async _fetchPUT (id:string, url: string, body: any) {
    const response = await axios.put(`${this.baseUrl + url}/${encodeURIComponent(id)}`, body, this.options)
    return response.data
  }

}
