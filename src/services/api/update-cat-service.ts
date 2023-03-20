import {BaseAPIService} from "./base-api-service";
import {Cat} from "@/domain/cat";

export class UpdateCatService extends BaseAPIService{
    async update (cat: Cat): Promise<Cat | null> {
        return await this._fetchPUT(`${this.baseUrl}/cats`, cat)
    }
}