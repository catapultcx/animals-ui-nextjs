export abstract class BaseAPIService {
  baseUrl: string

  constructor () {
    this.baseUrl = 'http://localhost:8080/api/1'
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

  async _fetch (url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message)
        throw err
      })
  }

  async _fetchPost(url: string, data: any) {
    return await this._fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async _fetchPut(url: string, data: any) {
    return await this._fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async _fetchDelete(url: string) {
    return await this._fetch(url, {
      method: "delete",
    });
  }

}
