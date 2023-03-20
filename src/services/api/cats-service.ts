import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface FilterCommand {
  text: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }

  async filter(params: FilterCommand): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats/filter?text=${params.text}`)
  }
}
