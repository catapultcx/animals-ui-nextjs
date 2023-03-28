import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface PostCommand {
  name: string;
  description: string;
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async add(params: PostCommand): Promise<Cat | null> {
    return await this._fetchPost(`${this.baseUrl}/cats`, params);
  }

  async update(catId: string, params: PostCommand): Promise<Cat | null> {
    return await this._fetchPut(`${this.baseUrl}/cats/${catId}`, params);
  }

  async all(filterString: string): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(
      `${this.baseUrl}/cats${filterString ? `?searchString=${filterString}` : ""}`
    );
  }

  async delete(catId: string): Promise<Cat | null> {
    return await this._fetchDelete(`${this.baseUrl}/cats/${catId}`);
  }
}
