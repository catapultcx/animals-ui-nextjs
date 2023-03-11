export abstract class BaseAPIService {
  baseUrl: string

  constructor () {
    this.baseUrl = `${process.env.API_URL|| process.env.NEXT_PUBLIC_API_URL }`;
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

  async _fetchPOST (url: string, body:any) {
    return this._doFetchWithBody('POST', url, body);
  }

  async _fetchPUT (url: string, body:any) {
    return this._doFetchWithBody('PUT', url, body);
  }
  async _fetchDELETE (url: string) {
    return await fetch(url, {
      method:"DELETE"
    });
  }

  async _doFetchWithBody (method:string, url: string, body:any) {
    
    return await fetch(url, {
      method,
      headers: new Headers({'content-type': 'application/json'}),
      body:JSON.stringify(body),
    });
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
