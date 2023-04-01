import { Cat } from '@/domain/cat';
import { BaseAPIService } from './base-api-service';

interface GetCommand {
  id: string;
}

export class CatsService extends BaseAPIService {
  async get(params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`);
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`);
  }

  create = async (name: string, description: string) => {
    const cat = {
      name,
      description,
    };
    return this._fetchPOST(`${this.baseUrl}/cats`, cat);
  };

  async delete(id: string): Promise<boolean | null> {
    return await this._fetchDELETE(`${this.baseUrl}/cats/${id}`);
  }

  async update(cat: Cat): Promise<any> {
    return await this._fetchPUT(`${this.baseUrl}/cats/update`, cat);
  }

  async search(name: string, desc: string): Promise<any> {
    return await this._fetchGET(`${this.baseUrl}/cats/search?name=${name}&desc=${desc}`);
  }
}
