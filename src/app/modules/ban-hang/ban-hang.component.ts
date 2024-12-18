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
import {BillDetailService} from "../../service/bill-detail-service";
import {BillDetailModel} from "../../models/bill-detail.model";

@Component({
  selector: 'cons-ban-hang',
  templateUrl: './ban-hang.component.html',
  styleUrls: ['./ban-hang.component.scss']
})
export class BanHangComponent implements OnInit {
  amount: number = 0;
  qrcodeValue: string = '';
  billList: BillModel[] = [];
  billListOnline: BillModel[] = [];
  billDetailsList: BillDetailModel[] = [];
  user$: Observable<any>;
  user: UserModel | undefined;
  idBillOnline: number = 0;
  billOnlineModel!: BillModel;
  billOfflineModel!: BillModel;
  isVisbleBillOnlineDetails = false;
  isVisbleShowFormGiaoHang = false;
  isVisbleShowFormGiaoHangTaiQuay = false;
  searchInput: string = '';
  searchInput2: string = '';

  constructor(private vnpayService: VNPAYService,
              private paymentService: PaymentService,
              private billService: BillService,
              private billDetailService: BillDetailService,
              private notification: NzNotificationService,
              private authService: AuthService,
              private router: Router) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.getListOffline();
    // this.generateQRCode();
  }

  private getListOffline(): void {
    this.billService.getListByLoaiHD(1, 15, 0).subscribe(res => {
      if (res && res.content) {
        this.billList = res.content;
      }
    })
  }

  getListOnLine(): void {
    this.billService.getListByLoaiHD(1, 15, 1).subscribe(res => {
      if (res && res.content) {
        this.billListOnline = res.content;
      }
    })
  }

  getListOfflineBySearch(): void {
    this.searchInput = (document.getElementById('searchInput') as HTMLInputElement).value;
    const trangThai = Number.parseInt((document.getElementById('trangThaiThanhToan') as HTMLInputElement).value);
    const trangThaiGiaoHang = Number.parseInt((document.getElementById('trangThaiGiaoHang') as HTMLInputElement).value);
    const hinhThucGiaoHang = Number.parseInt((document.getElementById('hinhThucGiaoHang') as HTMLInputElement).value);
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    this.billService.getListBySearch(1, 15, 0, this.searchInput, trangThai, trangThaiGiaoHang, hinhThucGiaoHang, startDate, endDate).subscribe(res => {
      if (res && res.content) {
        this.billList = res.content;
      }
    })
  }

  getListOnlineBySearch(): void {
    this.searchInput2 = (document.getElementById('searchInput2') as HTMLInputElement).value;
    const trangThai = Number.parseInt((document.getElementById('trangThaiThanhToan2') as HTMLInputElement).value);
    const trangThaiGiaoHang = Number.parseInt((document.getElementById('trangThaiGiaoHang2') as HTMLInputElement).value);
    const hinhThucGiaoHang = Number.parseInt((document.getElementById('hinhThucGiaoHang2') as HTMLInputElement).value);
    const startDate = (document.getElementById('startDate2') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate2') as HTMLInputElement).value;
    this.billService.getListBySearch(1, 15, 1, this.searchInput2, trangThai, trangThaiGiaoHang, hinhThucGiaoHang, startDate, endDate).subscribe(res => {
      if (res && res.content) {
        this.billListOnline = res.content;
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
        this.getListOffline();
      }
    })
  }

  getBillDetailS(id:any){
        this.router.navigate([`/admin/ban-hang-tai-quay/bill/${id}`]);
  }

  // bán hàng online
  getBillOnlineDetailS(id: any){
    this.idBillOnline = id;
    this.billService.get(id).subscribe(res => {
      if(res){
        this.billOnlineModel = res;
      }
    })
    this.billDetailService.getListByBill(1, 50, id).subscribe(res => {
      this.billDetailsList = res.content;
      this.isVisbleBillOnlineDetails = true;
    })
  }

  cancelBillOnlineDetails(){
    this.isVisbleBillOnlineDetails = false;
  }

  showFormGiaoHang(id: any){
    this.isVisbleShowFormGiaoHang = true;
  }

  cancelFormGiaoHang(){
    this.isVisbleShowFormGiaoHang = false;
  }

  okFormGiaoHang(){
    const data = {
      trangThaiGiaoHang: 2,
      tenNguoiShip: (document.getElementById('tenNguoiShip') as HTMLInputElement).value,
      sdtNguoiShip: (document.getElementById('sdtNguoiShip') as HTMLInputElement).value
    }
    this.billService.updateGiaoHang(this.idBillOnline, data).subscribe(res => {
      if(res){
        this.isVisbleShowFormGiaoHang = false;
        this.notification.success('Giao hàng thành công', '');
        this.getListOnLine();
        this.billService.get(this.idBillOnline).subscribe(res2 => {
          if(res2){
            this.billOnlineModel = res2;
          }
        })
      }
    })
  }

  hoanTatGiaoHang(){
    const data = {
      trangThaiGiaoHang: 1,
      tenNguoiShip: this.billOnlineModel.tenNguoiShip,
      sdtNguoiShip: this.billOnlineModel.sdtNguoiShip
    }
    this.billService.updateGiaoHang(this.idBillOnline, data).subscribe(res => {
      if(res){
        this.isVisbleShowFormGiaoHang = false;
        this.notification.success('Hoàn tất giao hàng!', '');
        this.getListOnLine();
        this.billService.get(this.idBillOnline).subscribe(res2 => {
          if(res2){
            this.billOnlineModel = res2;
          }
        })
      }
    })
  }

  showModalGiaoHangOffline(id: any){
    this.billService.get(id).subscribe(res => {
     if(res) {
       this.billOfflineModel = res;
       this.isVisbleShowFormGiaoHangTaiQuay = true;
     }
    })
  }

  cancelModalGiaoHangOffline(){
    this.isVisbleShowFormGiaoHangTaiQuay = false;
  }

  hoanTatGiaoHangTaiQuay(){
    const data = {
      trangThaiGiaoHang: 1,
      tenNguoiShip: this.billOfflineModel.tenNguoiShip,
      sdtNguoiShip: this.billOfflineModel.sdtNguoiShip
    }
    this.billService.updateGiaoHang(this.billOfflineModel.id, data).subscribe(res => {
      if(res){
        this.isVisbleShowFormGiaoHangTaiQuay = false;
        this.notification.success('Hoàn tất giao hàng!', '');
        this.getListOffline();
      }
    })
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

}
