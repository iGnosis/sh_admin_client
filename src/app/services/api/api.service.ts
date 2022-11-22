import { Injectable } from '@angular/core';
import { GqlConstants } from '../../gql-constants';
import { GqlClientService } from '../gql-client/gql-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: GqlClientService) { }

  async getOrganizationsList(limit?: number, offset?: number): Promise<any> {
    return this.client.req(GqlConstants.GET_ORGANIZATIONS_LIST, {
      offset,
      limit,
    });
  }

  async resendLoginOtp(phoneCountryCode: string, phoneNumber: string): Promise<any> {
    return this.client.req(GqlConstants.RESEND_LOGIN_OTP, {
      phoneCountryCode,
      phoneNumber,
    });
  }

  async requestLoginOtp(phoneCountryCode: string, phoneNumber: string): Promise<any> {
    return this.client.req(GqlConstants.REQUEST_LOGIN_OTP, {
      phoneCountryCode,
      phoneNumber,
    });
  }

  async verifyLoginOtp(phoneCountryCode: string, phoneNumber: string, otp: number): Promise<any> {
    return this.client.req(GqlConstants.VERIFY_LOGIN_OTP, {
      phoneCountryCode,
      phoneNumber,
      otp,
    });
  }
}
