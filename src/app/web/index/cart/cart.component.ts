import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services";
import {UserModel} from "../../../auth/models/user.model";
import {GioHangChiTietModel} from "../../../models/gio-hang-chi-tiet.model";
import {GioHangService} from "../../../service/gio-hang-service";

@Component({
  selector: 'cons-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  user: UserModel | undefined;
  gioHangList: GioHangChiTietModel[] = [];

  constructor(private authService: AuthService,
              private gioHangService: GioHangService) {
  }

  private cartStorageKey = 'cartItems';
  cartItems: any[] = [];

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getListByUser();
    this.loadCartItems(this.user?.id);
    this.subtotal();
  }

  private loadCartItems(userId: any): void {
    const userCartStorageKey = `${this.cartStorageKey}_${userId}`;

    const storedCartItems = localStorage.getItem(userCartStorageKey);

    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }


  // removeFromCart(index: number): void {
  //   this.cartItems.splice(index, 1);
  //   localStorage.setItem(`${this.cartStorageKey}_${this.user?.id}`, JSON.stringify(this.cartItems));
  // }

  subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.amount, 0);
  }

  getListByUser(){
    this.gioHangService.getListByUser(1, 50, this.authService.currentUserValue?.id).subscribe(res => {
      if (res) {
        this.gioHangList = res.content;
      }
    })
  }

  editData(id: any){

  }

  removeFromCart(id: any){

  }

}
