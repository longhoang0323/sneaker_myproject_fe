import {Component} from '@angular/core';
import {AuthService} from '../../auth/services';
import {Observable} from 'rxjs';
import {BillModel} from "../../models/bill.model";

@Component({
  selector: 'cons-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  user$: Observable<any>;
  theme = true;
  bill: BillModel[] = [];
  countBill: number = 0;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }


  onLogout(): void {
    this.authService.logout();
  }
}
