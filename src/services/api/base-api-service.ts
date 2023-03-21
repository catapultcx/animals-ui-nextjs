export abstract class BaseAPIService {
  baseUrl: string

  constructor () {
    this.baseUrl = `${process.env.API_URL}`
  }

  handleError (response: any) {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }

  async _fetchGET (url: string) {
    return await this._fetch(url, {
      method: 'GET'
    })
  }

  async _fetchPOST (url: string, data: any) {
    return await this._fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  async _fetchDELETE (url: string) {
    return await this._fetch(url, {
      method: 'DELETE'
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
