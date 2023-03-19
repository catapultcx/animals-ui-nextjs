export abstract class BaseAPIService {
  baseUrl: string;

  constructor() {
    //console.log(process.env.API_URL);
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

  async _fetch(url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }

  async _delete(url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }

  async _create(url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }
}
