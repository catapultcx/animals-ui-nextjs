import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'
interface GetCommand {
  id: string | undefined
}
export class CatsService extends BaseAPIService {

  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`/cats/${params.id}`, {})
  }

  async all(params?: any): Promise<any | null> {
    const { name, description } = params || {}
    let url = `/cats`
    console.log('all', params);
    return this._fetchGET(url, params)
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
