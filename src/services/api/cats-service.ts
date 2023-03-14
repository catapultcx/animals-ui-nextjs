import { Cat } from "@/domain/cat";
import { BaseAPIService } from "./base-api-service";

interface GetCommand {
  id: string;
}

interface PostCommand {
  cat: Cat;
}

interface FindCommand {
  name?: string;
  description?: string;
}

export class CatsService extends BaseAPIService {
  async get(params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`);
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`);
  }

  async find(params: FindCommand): Promise<{ cats: Cat[] } | null> {
    const name = params.name ? `name=${params.name}` : "";
    const description = params.description
      ? `description=${params.description}`
      : "";
    const queryParams = [name, description]
      .filter((item) => item !== "")
      .join("&");

    return this._fetchGET(`${this.baseUrl}/cats/search?${queryParams}`);
  }

  async create(params: PostCommand): Promise<Cat | null> {
    return this._fetchPOST(`${this.baseUrl}/cats`, params.cat);
  }

  async delete(params: GetCommand): Promise<{ cat: Cat } | null> {
    return this._fetchDELETE(`${this.baseUrl}/cats/${params.id}`);
  }

  async update(params: PostCommand): Promise<{ cat: Cat } | null> {
    return this._fetchPOST(`${this.baseUrl}/cats/${params.cat.id}`, params.cat);
  }
}
