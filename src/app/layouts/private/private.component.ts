import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('nb-global-spinner').style.display = 'none';
  }

}
