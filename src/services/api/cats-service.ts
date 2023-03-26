import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface CreateCommand {
  cat: Omit<Cat, "id">
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }

  async create(params: CreateCommand): Promise<Cat> {
    return await this._fetchPOST(`${this.baseUrl}/cats`, params.cat)
  }
}
