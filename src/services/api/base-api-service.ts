export abstract class BaseAPIService {
  baseUrl: string;

  constructor() {
    this.baseUrl = `${process.env.API_URL}`;
  }

  handleError(response: any) {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }
  }

  async _fetchGET(url: string) {
    return await this._fetch(url, {});
  }

  async _fetchPost(url: string, params: any) {
    return await this._fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  }

  async _fetchDelete(url: string) {
    return await this._fetch(url, {
      method: "delete",
    });
  }

  async _fetchPut(url: string, params: any) {
    return await this._fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  }

  async _fetch(url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }
}
