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
  expiryPeriod = '1';
  redirectURL = 'https://org.pointmotion.us/invite/';
  inviteCode = '';
  emails = '';
  hasInvited = false;
  isEmailValid = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  toggleShowModal() {
    this.modalStateChange.emit();
    this.hasInvited = false;
  }

  async generateInviteCode() {
    const organization = await this.apiService.createOrganization();
    if (!organization.insert_organization_one) return;

    const result = await this.apiService.generateOrganizationInviteCode(organization.insert_organization_one.orgId);
    if (!result || !result.insert_invite_organization_one) return;

    this.inviteCode = result.insert_invite_organization_one.inviteCode;
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

    if (emailsRegex.test(this.emails) && this.emails !== '') {
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
  }

  updateLinkExpiry() {
    const resetExpiry = this.linkExpiry ? false : true;

    if (resetExpiry) {
      this.apiService.updateInvitationCodeExpiry(this.inviteCode, null);
      return;
    }

    let expiryAt: Date = new Date();
    expiryAt.setDate(expiryAt.getDate() + Number(this.expiryPeriod));

    this.apiService.updateInvitationCodeExpiry(this.inviteCode, expiryAt.toISOString());
  }

  toggleLinkExpiry() {
    this.linkExpiry = !this.linkExpiry;
    this.updateLinkExpiry();
  }

  sendInvite() {
    if (!this.inviteCode) this.generateInviteCode();

    let emails = this.emails.split(',').map((email) => email.trim()).filter((email) => email !== '');
    emails = [...new Set(emails)];

    emails.forEach((email) => {
      this.apiService.sendOrganizationInvite(email, this.redirectURL, this.inviteCode);
    });
    this.hasInvited = true;
  }

}
