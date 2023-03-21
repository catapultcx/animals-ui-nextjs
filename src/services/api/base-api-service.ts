import { Cat } from "../../domain/cat";

export abstract class BaseAPIService {
  baseUrl: string;

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_URL}`;
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

  async _fetchDELETE(url: string, id: string) {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }

  async _fetchPOST(url: string, cat: Cat) {
    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: cat.name, description: cat.description }),
    })
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }

  async _fetchPUT(url: string, cat: Cat) {
    return await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cat.id,
        name: cat.name,
        description: cat.description,
      }),
    })
      .then(this.handleError)
      .catch((err) => {
        console.log(err.message);
        throw err;
      });
  }
}
