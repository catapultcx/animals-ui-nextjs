import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'
interface GetCommand {
  id: string | undefined
}
export class CatsService extends BaseAPIService {

  async get (params: any): Promise<any | null> {
    console.log("params:")
    console.log(params.id)
    return await this._fetchGETbyId(`/cats`, params?.id)
  }

  async all(params?: any): Promise<any | null> {
    return this._fetchGET(`/cats`, params)
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
