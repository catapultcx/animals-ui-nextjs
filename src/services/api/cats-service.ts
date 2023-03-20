import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface PostCommand {
  cat: Cat
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async update (params: PostCommand): Promise<{ cat: Cat } | null> {
    return this._fetchPOST(`${this.baseUrl}/cats/${params.cat.id}`, params.cat);
  }

  async all (): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }
}
