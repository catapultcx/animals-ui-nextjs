export abstract class BaseAPIService {
  baseUrl: string

  constructor () {
    this.baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`
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

  async _fetchPOST(url: string, data: any) {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(this.handleError)
      .catch((err) => {
        console.log(err.message)
        throw err
      })
  }

  async _fetchDELETE(url: string) {
    return await fetch(url, {
      method: 'DELETE'
    }).then(this.handleError)
      .catch((err) => {
        console.log(err.message)
        throw err
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
