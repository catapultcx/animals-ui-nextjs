import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface WithdrawCommand {
  customerId: string
  accountId: string
  amount: string
  transactionDescription: string
}

interface TransferCommand {
  customerId: string
  accountId: string
  toAccount: string
  amount: string
  transactionDescription: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${this.baseUrl}/cats`)
  }

  async withdraw (params: WithdrawCommand): Promise<any> {
      const url = `${this.baseUrl}/customers/${params.customerId}/accounts/${params.accountId}/withdraw`
      return await this._fetchPOST(url, {
      amount: params.amount,
      transactionDescription: params.transactionDescription
      })
  }

  async transfer (params: TransferCommand): Promise<any> {
      const url = `${this.baseUrl}/customers/${params.customerId}/accounts/${params.accountId}/transfer`
      return await this._fetchPOST(url, {
      toAccount: params.toAccount,
      amount: params.amount,
      transactionDescription: params.transactionDescription
      })
  }
}
