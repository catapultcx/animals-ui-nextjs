import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface CreateCommand {
  cat: Omit<Cat, "id">
}

interface DeleteCommand {
  id: string
}

interface UpdateCommand {
  id: string,
  cat: Cat
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

  async delete(params: DeleteCommand): Promise<Cat> {
    return await this._fetchDELETE(`${this.baseUrl}/cats/${params.id}`)
  }

  async update(params: UpdateCommand): Promise<Cat> {
    return await this._fetchPUT(`${this.baseUrl}/cats/${params.id}`, params.cat)
  }
}
