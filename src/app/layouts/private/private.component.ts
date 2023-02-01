import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.getElementById('nb-global-spinner').style.display = 'none';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/public/login']);
  }

}
