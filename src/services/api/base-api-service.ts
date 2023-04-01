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

  _fetchPOST = async (url: string, data: any) => {
    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: JSON.stringify(data),
    };
    return await this._fetch(url, params);
  };

  async _fetchDELETE(url: string) {
    return await this._fetch(url, {
      method: 'DELETE',
    });
  }

  async _fetchPUT(url: string, data: any) {
    const params = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(data),
    };
    return await this._fetch(url, params);
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
