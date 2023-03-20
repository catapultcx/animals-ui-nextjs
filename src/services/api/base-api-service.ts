export abstract class BaseAPIService {
  baseUrl: string

  constructor () {
    this.baseUrl = `${process.env.API_URL}`
  }

  handleError (response: any) {
    if (!response.ok) {
      throw new Error(response.statusText)
    } else {
      return response.json()
    }
  }

  async _fetchGET (url: string) {
    return await this._fetch(url, {})
  }

  async _fetchDELETE (url: string) {
    return await this._fetch(url, {
      method: 'DELETE'
    })
  }

  async _fetchPUT (url: string, data: any) {
    return await this._fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async _fetchPOST (url: string, data: any) {
    return await this._fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async _fetch (url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message)
        throw err
      })
  }
}
