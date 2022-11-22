import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-organization-modal',
  templateUrl: './add-organization-modal.component.html',
  styleUrls: ['./add-organization-modal.component.scss']
})
export class AddOrganizationModalComponent implements OnInit {
  @Input() showOrganizationModal: boolean = false;
  @Output() modalStateChange = new EventEmitter();
  linkExpiry = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowModal() {
    this.modalStateChange.emit();
  }

}
