import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {VNPAYService} from "../../service/VNPAY-service";
import {BillService} from "../../service/bill.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AuthService} from "../../auth/services";
import {Observable} from "rxjs";
import {UserModel} from "../../auth/models/user.model";
import {PaymentService} from "../../service/payment-service";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-ban-hang',
  templateUrl: './ban-hang.component.html',
  styleUrls: ['./ban-hang.component.scss']
})
export class BanHangComponent implements OnInit {
  amount: number = 0;
  qrcodeValue: string = '';
  billList: BillModel[] = [];
  user$: Observable<any>;
  user: UserModel | undefined;


  constructor(private vnpayService: VNPAYService,
              private paymentService: PaymentService,
              private billService: BillService,
              private notification: NzNotificationService,
              private authService: AuthService,
              private router: Router) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.getList();
    // this.generateQRCode();
  }

  private getList(): void {
    this.billService.getBillList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.billList = res.content;
      }
    })
  }

  createNewBill() {
    const data = {
      idUser: this.user?.id

    }
    this.billService.createNewBill(data).subscribe(res => {
      if (res) {
        this.notification.success('Tạo đơn hàng mới thành công', '');
        this.getList();
      }
    })
  }

  getBillDetailS(id:any){
        this.router.navigate([`/admin/ban-hang-tai-quay/bill/${id}`]);
  }

  generateQRCode() {
    // Thay thế các thông tin này bằng thông tin tài khoản MBBank của bạn
    const bankId = 'MBBank';
    const accountNo = '6323032003';
    const template = 'compact2';
    const description = 'Send to Nguyen Hoang Long';
    const accountName = 'NGUYEN HOANG LONG';
    // this.qrcodeValue = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.jpg?amount=${this.amount}&addInfo=${description}&accountName=${accountName}`;
    this.qrcodeValue = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.jpg?amount=${this.amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;
    console.log(`https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.jpg?amount=${this.amount}&addInfo=${description}&accountName=${accountName}`);
  }

  pay() {
    const amount = this.amount; // Số tiền thanh toán
    this.vnpayService.createPayment(amount, 'NCB').subscribe({
      next: (response: any) => {
        // Nếu chuyển hướng đến URL thanh toán, bạn có thể sử dụng window.location
        window.location.href = response.paymentUrl;
        console.log(response);// Đảm bảo response.url chứa URL thanh toán
      },
      error: (err) => {
        console.error('Lỗi khi thanh toán:', err);
      }
    });
  }


}
