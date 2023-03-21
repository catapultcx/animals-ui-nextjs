import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface PostCommand {
  name: string
  description: string
}

interface DeleteCommand {
  id: string
}

interface UpdateCommand {
  name: string
  description: string
  id: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }

  async post (params: PostCommand): Promise<Cat | null> {
    return await this._fetchPOST(`${this.baseUrl}/cats`, params)
  }

  async delete (params: DeleteCommand): Promise<{} | null> {
    try {
      return await this._fetch(`${this.baseUrl}/cats/${params.id}`, { method: 'DELETE'})
    } catch {
      return null
    }
  }

  async update (params: UpdateCommand): Promise<Cat | null> {
    try {
      return await this._fetch(`${this.baseUrl}/cats/${params.id}`, { method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)})
    } catch {
      return null
    }
  }
}
