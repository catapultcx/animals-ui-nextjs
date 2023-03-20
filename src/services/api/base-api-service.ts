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

  async _delete(url: string, params: RequestInit) {
    try {
      const response = await fetch(url, params);
      if (!response?.ok) {
        //throw new Error("HTTP error! status");
      }
      return response?.json;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async _create(url: string, params: RequestInit) {
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response?.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async _update(url: string, params: RequestInit) {
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
