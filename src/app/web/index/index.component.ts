import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services";
import {NotificationsModel} from "../../models/notifications.model";
import {ServiceService} from "./page/service/service.service";
import {UserModel} from "../../auth/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  user$: Observable<any>;
  user: UserModel | undefined;
  notificationCount = 200;
  showDropdown = false;
  notifications: NotificationsModel[] = [];
  searchInput: string = '';

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(private authService: AuthService, private service: ServiceService,
              private router: Router) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getNoti();
    this.loadCartItems();
  }

  getNoti(): void {
    this.service.getListNoti(1, 5, this.user?.id).subscribe(res => {
      if (res && res.content) {
        this.notifications = res.content;
      }
    })
  }

  onLogout1(): void {
    this.authService.logout1();
  }

  private cartStorageKey = 'cartItems';
  cartItems: any[] = [];

  private loadCartItems(): void {
    const storedCartItems = localStorage.getItem(`${this.cartStorageKey}_${this.user?.id}`);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }
}
