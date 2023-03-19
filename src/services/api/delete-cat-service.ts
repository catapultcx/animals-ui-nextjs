import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'


export class DeleteCatService extends BaseAPIService {
    async delete (id: string): Promise<Cat | null> {
        return await this._fetchDELETE(`${this.baseUrl}/cats/${id}`)
    }
}