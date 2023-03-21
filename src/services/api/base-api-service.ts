export abstract class BaseAPIService {
  baseUrl: string

  constructor () {
    this.baseUrl = typeof window === 'undefined' ?`${process.env.API_URL}` : '/api/1'
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

  async _fetchPOST<T> (url: string, req: T) {
    let response = await this._fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(req)
    });
    return response as T;
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
