import {BaseAPIService} from "./base-api-service";
import {Cat} from "@/domain/cat";

export class RegisterCatService extends BaseAPIService{
    async register (cat: Cat): Promise<Cat | null> {
        return await this._fetchPOST(`${this.baseUrl}/cats`, cat)
    }
}