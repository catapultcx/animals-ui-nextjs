import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }
  async add(cat:Cat):Promise<void>{
     await this._fetchPOST(`${this.baseUrl}/cats/`, cat);
  }
  async update(cat:Cat):Promise<void>{
     await this._fetchPUT(`${this.baseUrl}/cats/`, cat);
  }
  async delete(id: string) {
    await this._fetchDELETE(`${this.baseUrl}/cats/${id}`);
  }

  async search(params: {[key:string]:string}) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key=> {
      if(params[key]){
        searchParams.append(key, params[key]);
      }
    });
    return this._fetchGET(`${this.baseUrl}/cats/search?${searchParams.toString()}`);
  }
  
}
