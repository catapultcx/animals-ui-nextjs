import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface PostCommand {
  cat: Cat
}

interface DeleteCommand {
  id: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async post (params: PostCommand): Promise<Cat | null> {
    return await this._fetchPOST(`${this.baseUrl}/cats`, params.cat)
  }

  async delete (params: DeleteCommand): Promise<null> {
    return await this._fetchDELETE(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }
}
