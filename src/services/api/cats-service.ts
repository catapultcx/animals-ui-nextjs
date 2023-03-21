import { Cat } from "../../domain/cat";
import { BaseAPIService } from "./base-api-service";

interface GetCommand {
  id: string;
}

interface FilterOptions {
  text: string;
}

export class CatsService extends BaseAPIService {
  async get(params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`);
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats/viewAllCats`);
  }

  async remove(id: string): Promise<Cat | null> {
    return await this._fetchDELETE(`${this.baseUrl}/cats/removeCat`, id);
  }

  async register(cat: Cat): Promise<Cat | null> {
    return await this._fetchPOST(`${this.baseUrl}/cats/createCat`, cat);
  }

  async update(cat: Cat): Promise<any> {
    return await this._fetchPUT(`${this.baseUrl}/cats/updateCat`, cat);
  }

  async filter(params: FilterOptions): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats/filter?text=${params.text}`);
  }
}
