import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GqlConstants } from '../../gql-constants';
import { ApiService } from '../../services/api/api.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { phone } from 'phone';
import { GqlClientService } from '../../services/gql-client/gql-client.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  step = 0;
  selectedCountry = '+1 USA'; // set default to USA
  countryCode = '+1'; // set default to USA
  phoneNumber?: string;
  otpCode?: string;
  formErrorMsg?: string;

  // required to figure out which OTP API to call.
  // The Resend OTP API is called if numbers haven't changed.
  tempFullPhoneNumber?: string;
  fullPhoneNumber?: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private jwtService: JwtService,
    private gqlClientService: GqlClientService,
  ) { }

  ngOnInit(): void {
    document.getElementById('nb-global-spinner').style.display = 'none';
  }

  resetForm() {
    this.tempFullPhoneNumber = this.fullPhoneNumber;
    this.step = 0;
    this.phoneNumber = '';
    this.fullPhoneNumber = '';
    this.otpCode = '';
    this.formErrorMsg = '';
  }

  showError(message: string, timeout = 5000) {
    this.formErrorMsg = message;
    setTimeout(() => {
      this.formErrorMsg = '';
    }, timeout);
  }

  decodeJwt(token: string | undefined) {
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        return JSON.parse(atob(parts[1]));
      }
    }
  }

  async submit(event: any) {
    // call API to send an OTP
    if (this.step === 0) {
      this.countryCode = event.target.countryCode.value;
      if (this.countryCode.slice(0, 1) !== '+') {
        this.countryCode = `+${this.countryCode}`;
      }
      this.phoneNumber = event.target.phoneNumber.value;
      console.log('submit:countryCode:', this.countryCode);
      console.log('submit:phoneNumber:', this.phoneNumber);

      const phoneObj = phone(`${this.countryCode}${this.phoneNumber}`);
      console.log(phoneObj);

      if (!phoneObj.isValid) {
        this.showError('Phone number is not valid');
        return;
      }

      this.fullPhoneNumber = phoneObj.phoneNumber;

      // call the Resend OTP API, since phone number did not change.
      if (this.tempFullPhoneNumber === this.fullPhoneNumber) {
        console.log('resend OTP API called');
        try {
          const resp = await this.apiService.resendLoginOtp(this.countryCode, this.phoneNumber);
          if (
            !resp ||
            !resp.resendLoginOtp ||
            !resp.resendLoginOtp.data.message
          ) {
            this.showError('Something went wrong while sending OTP.');
            return;
          }

          // increment step
          this.formErrorMsg = '';
          this.step++;
        } catch (err) {
          console.log('Err::', err);
          if (
            err &&
            err.response &&
            err.response.errors[0].extensions.statusCode === 401
          ) {
            this.showError(
              'You do not have permission to access this page. Please contact your administrator if you think this is a mistake.'
            );
          }
        }
      }
      // call Request Login OTP API, since the phone number changed.
      else {
        try {
          const resp = await this.apiService.requestLoginOtp(this.countryCode, this.phoneNumber);

          if (
            !resp ||
            !resp.requestLoginOtp ||
            !resp.requestLoginOtp.data.message
          ) {
            this.showError('Something went wrong while sending OTP.');
            return;
          }

          // increment step
          this.formErrorMsg = '';
          this.step++;
        } catch (err) {
          console.log('Err::', err);
          if (
            err &&
            err.response &&
            err.response.errors[0].extensions.statusCode === 401
          ) {
            this.showError(
              'You do not have permission to access this page. Please contact your administrator if you think this is a mistake.'
            );
          }
        }
      }
    }

    // call API to validate the code
    else if (this.step === 1) {
      this.otpCode = event.target.otpCode.value;
      console.log('submit:otpCode:', this.otpCode);

      // you should get back JWT in success response.
      const resp = await this.apiService.verifyLoginOtp(this.countryCode,this.phoneNumber,parseInt(this.otpCode!));

      if (!resp || !resp.verifyLoginOtp || !resp.verifyLoginOtp.data.token) {
        this.showError('That is not the code.');
        return;
      }

      // set user as well
      this.jwtService.setToken(resp.verifyLoginOtp.data.token);

      const accessTokenData = this.decodeJwt(resp.verifyLoginOtp.data.token);
      const userId =
        accessTokenData['https://hasura.io/jwt/claims']['x-hasura-user-id'];
      // this.userService.set({
      //   id: userId,
      // });
      console.log('user set successfully');

      this.gqlClientService.refreshClient();

      this.router.navigate(['/app/organizations']);
    }
  }

}
