import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'
interface GetCommand {
  id: string
}
export class CatsService extends BaseAPIService {

  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return await this._fetchGET(`/cats`)
  }

  async create(name: string, description: string, group: string): Promise<Cat | null> {
    return await this._fetchPOST(`/cats`, { name, description, group } )
  }

  async delete(id: string): Promise<void> {
    return await this._fetchDELETE(id, `/cats`)
  }

  async update(id: string, name: string, description: string, group : string): Promise<Cat | null> {
    return await this._fetchPUT(id, `/cats`, {
      name,
      description,
      group
    })

  }

}
