import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'add-organization-modal',
  templateUrl: './add-organization-modal.component.html',
  styleUrls: ['./add-organization-modal.component.scss']
})
export class AddOrganizationModalComponent implements OnInit {
  @Input() showOrganizationModal: boolean = false;
  @Output() modalStateChange = new EventEmitter();
  linkExpiry = false;
  expiryPeriod: string;
  redirectURL = 'https://app.pointmotion.us/invite/';
  inviteCode = '';
  emails = '';
  hasInvited = false;
  isEmailValid = false;

  constructor(private apiService: ApiService) {
    this.generateInviteCode();
  }

  ngOnInit(): void {
  }

  toggleShowModal() {
    this.modalStateChange.emit();
    this.hasInvited = false;
  }

  async generateInviteCode() {
    const result = await this.apiService.generateOrganizationInviteCode();
    if (!result || !result.generateOrganizationInviteCode) return;

    this.inviteCode = result.generateOrganizationInviteCode.data.inviteCode;
  }

  copyInviteLink() {
    const el = document.createElement('textarea');
    el.value = this.redirectURL + this.inviteCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  validateEmail() {
    // Source: https://stackoverflow.com/questions/9809357/regex-for-validating-multiple-e-mail-addresses
    const emailsRegex = /^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*,\s*|\s*$))*$/;

    if (emailsRegex.test(this.emails)) {
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
  }

  updateLinkExpiry() {
    let expiryAt: Date = new Date();
    console.log('this.expiryPeriod', this.expiryPeriod);

    if (this.expiryPeriod) {
      expiryAt.setDate(expiryAt.getDate() + Number(this.expiryPeriod));
    }

    this.apiService.updateInvitationCodeExpiry(this.inviteCode, expiryAt.toISOString());
  }

  sendInvite() {
    let emails = this.emails.split(',').map((email) => email.trim()).filter((email) => email !== '');
    emails = [...new Set(emails)];

    emails.forEach((email) => {
      this.apiService.sendOrganizationInvite(email, this.redirectURL);
    });
    this.hasInvited = true;
  }

}
