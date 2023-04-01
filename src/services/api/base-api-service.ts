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

  _fetchPOST = async (url: string, body: any) => {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    return await this._fetch(url, params);
  };

  async _fetch(url: string, params: any) {
    return await fetch(url, params)
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }
}
