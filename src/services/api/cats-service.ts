import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface SearchCommand {
  search?: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(request: SearchCommand | null = null): Promise<Cat[] | null> {
    return this._fetchGET(`${this.baseUrl}/cats?search=${request?.search || ''}`)
  }

  async create(request: Cat): Promise<Cat | null> {
    return this._fetchPOST<Cat>(`${this.baseUrl}/cats`, request)
  }

  async delete(params: GetCommand): Promise<void> {
    return this._fetchDELETE(`${this.baseUrl}/cats/${params.id}`)
  }

  async update(request: Cat): Promise<Cat | null> {
    return this._fetchPUT<Cat>(`${this.baseUrl}/cats`, request)
  }
}
