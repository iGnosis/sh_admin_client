import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BadgeTier, BadgeType } from '../../../types/global';
import { BadgeMetric } from '../../../types/global';
import { Badge } from '../../../types/global';
import { GqlClientService } from '../../services/gql-client/gql-client.service';
import { GqlConstants } from '../../gql-constants';
import { NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'add-badge-model',
  templateUrl: './add-badge-model.component.html',
  styleUrls: ['./add-badge-model.component.scss']
})
export class AddBadgeModelComponent implements OnInit {

  @Input() showBadgeModal: boolean = false;
  @Output() modalStateChange = new EventEmitter();
  badge: Partial<Badge> = {};

  constructor(
    private gqlService: GqlClientService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {}

  saveBadge() {
    console.log('save badge run');
    this.gqlService.req(GqlConstants.INSERT_BADGE, this.badge).then(res => {
      this.toastrService.show('Badge created!', '', {
        position: 'bottom-start' as NbGlobalPosition,
        duration: 2000,
        destroyByClick: true,
        preventDuplicates: true,
        hasIcon: false,
        icon: '',
      });
    this.toggleShowModal();
    }).catch(err => {
      console.log(err);
    });
  }

  setInput(inputType: string, event: any) {
    this.badge[inputType] = event.target.value;

    // we may not need dimension column.
    this.badge.dimension = 'profile';
  }

  toggleShowModal() {
    this.showBadgeModal = false;
    this.modalStateChange.emit();
  }
}
