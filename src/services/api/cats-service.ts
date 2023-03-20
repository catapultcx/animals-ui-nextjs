import { Cat } from "@/domain/cat";
import { BaseAPIService } from "./base-api-service";

interface GetCommand {
  id: string;
}

export class CatsService extends BaseAPIService {
  async get(params: GetCommand): Promise<Cat | null> {
    console.log("Fetch Cat Service" + `${this.baseUrl}/cats/${params.id}`);
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`);
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    console.log(`${this.baseUrl}/cats/viewAllCats`);
    return this._fetchGET(`${this.baseUrl}/cats/viewAllCats`);
  }

  async remove(params: GetCommand): Promise<any> {
    const url: string = "http://localhost:8080/api/1/cats/removeCat";
    console.log("CatService    " + `${this.baseUrl}/cats/removeCat`);
    const args: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: `${params}` }),
    };
    return await this._delete(url, args);
  }

  async create(params: Cat): Promise<any> {
    const url: string = "http://localhost:8080/api/1/cats/createCat";
    console.log("CatService    " + `${this.baseUrl}/cats/createCat`);
    const args: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${params?.name}`,
        description: `${params?.description}`,
      }),
    };
    return await this._create(url, args);
  }

  async update(params: Cat): Promise<any> {
    const url: string = "http://localhost:8080/api/1/cats/updateCat";
    console.log("CatService    " + `${this.baseUrl}/cats/updateCat`);
    const args: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `${params?.id}`,
        name: `${params?.name}`,
        description: `${params?.description}`,
      }),
    };
    return await this._update(url, args);
  }
}
