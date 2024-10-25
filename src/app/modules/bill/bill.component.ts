import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {ActivatedRoute} from "@angular/router";
import {BillService} from "../../service/bill.service";
import {BillDetailModel} from "../../models/bill-detail.model";
import {SanPhamService} from "../../service/san-pham-service";
import {SanPhamModel} from "../../models/san-pham.model";
import {HangModel} from "../../models/hang.model";
import {ChatLieuModel} from "../../models/chat-lieu.model";
import {ChatLieuService} from "../../service/chat-lieu-service";
import {HangService} from "../../service/hang-service";
import {MauSacModel} from "../../models/mau-sac.model";
import {KichThuocModel} from "../../models/kich-thuoc.model";
import {MauSacService} from "../../service/mau-sac-service";
import {KichThuocService} from "../../service/kich-thuoc-service";
import {ChiTietSanPhamModel} from "../../models/chi-tiet-san-pham.model";
import {ChiTietSanPhamService} from "../../service/chi-tiet-san-pham-service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {BillDetailService} from "../../service/bill-detail-service";

@Component({
  selector: 'cons-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  // id
  idBill: any;
  idSanPham: any;
  idCTSP: any;

  // model
  bill!: BillModel;
  sanPham!: SanPhamModel;
  chiTietSanPham!: ChiTietSanPhamModel;

  // list
  billDetails: BillDetailModel[] = [];
  sanPhamList: SanPhamModel[] = [];
  hangList: HangModel[] = [];
  chatLieuList: ChatLieuModel[] = [];
  mauSacList: MauSacModel[] = [];
  kichThuocList: KichThuocModel[] = [];

  // isVisible
  isVisibleListSP = false;
  isVisibleShowCTSP = false;
  imgDefault: string = '';

  // check
  checkSelectColor = true;
  checkSelectSize = true;
  checkSelectKhachHang = 0;

  // biến
  tienMat: number = 0;
  tienThua: number = 0;
  hinhThucTT: number = 0;
  hinhThucGH: number = 0;
  amount: number = 0;
  qrcodeValue: string = '';
  colorFontKhachLe: string = 'white';
  backGroundColorKhachLe: string = 'green';
  colorFontKhachHang: string = 'green';
  backGroundColorKhachHang: string = 'white';

  constructor(private route: ActivatedRoute,
              private billService: BillService,
              private billDetailService: BillDetailService,
              private chatLieuService: ChatLieuService,
              private hangService: HangService,
              private mauSacService: MauSacService,
              private kichThuocService: KichThuocService,
              private sanPhamService: SanPhamService,
              private chiTietSanPhamService: ChiTietSanPhamService,
              private notification: NzNotificationService) {

  }

  ngOnInit(): void {
    this.idBill = this.route.snapshot.params['id'];
    this.getBillAndListByBill();
  }

  showListSP() {
    this.hangService.getList(1, 50).subscribe(res => {
      if (res) {
        this.hangList = res.content;
      }
    })
    this.chatLieuService.getList(1, 50).subscribe(res => {
      if (res) {
        this.chatLieuList = res.content;
      }
    })
    this.sanPhamService.getList(1, 50).subscribe(res => {
      if (res) {
        this.sanPhamList = res.content;
      }
    })
    this.isVisibleListSP = true;
  }

  cancelListSP() {
    this.isVisibleListSP = false;
  }

  showModalEditCTSP(id: any) {
    this.idSanPham = id;
    this.sanPhamService.detail(id).subscribe(res => {
      console.log(res);
      this.sanPham = res;
      this.imgDefault = res.imageDefault;
    })
    this.mauSacService.getList(1, 50).subscribe(res => {
      if (res) {
        this.mauSacList = res.content;
      }
    })
    this.kichThuocService.getList(1, 50).subscribe(res => {
      if (res) {
        this.kichThuocList = res.content;
      }
    })
    this.isVisibleShowCTSP = true;
  }

  cancelCTSP() {
    this.checkSelectColor = true;
    this.checkSelectSize = true;
    !this.chiTietSanPham;
    this.isVisibleShowCTSP = false;
  }

  getCTSPByColorAndSize() {
    if ((document.getElementById('mauSac') as HTMLInputElement).value != '' &&
      (document.getElementById('kichThuoc') as HTMLInputElement).value != '') {
      this.checkSelectColor = false;
      this.checkSelectSize = false;
      const idMauSac = Number((document.getElementById('mauSac') as HTMLInputElement).value);
      const idKichThuoc = Number((document.getElementById('kichThuoc') as HTMLInputElement).value);
      this.chiTietSanPhamService.getOneByColorAndSize(idMauSac, idKichThuoc, this.idSanPham).subscribe(res => {
        if (res.message == "failed") {
          this.notification.error(res.entityMessages[0].errorMessage, "");
        } else {
          this.chiTietSanPham = res;
          this.imgDefault = res.image;
        }
      })
    }
  }

  createBillDetail() {
    if (this.chiTietSanPham) {


      const data = {
        idHoaDon: this.idBill,
        idChiTietSanPham: this.chiTietSanPham.id,
        donGia: this.chiTietSanPham.donGia,
        soLuong: Number.parseInt((document.getElementById('soLuong') as HTMLInputElement).value),
        giaBan: this.chiTietSanPham.donGia,
        giamGia: 0
      }
      this.billDetailService.addBillDetail(data).subscribe(res => {
        if (res) {
          this.isVisibleShowCTSP = false;
          this.isVisibleListSP = false;
          this.checkSelectColor = true;
          this.checkSelectSize = true;
          this.notification.success('Thêm vào giỏ hàng thành công!', '');
          this.getBillAndListByBill();
        }
      })
    }
  }

  tinhTienThua() {
    if (Number.parseInt((document.getElementById('tienMat') as HTMLInputElement).value) > (this.bill.tongTien - (this.bill.tienGiamGia ?? 0))) {
      this.tienThua = Number.parseInt((document.getElementById('tienMat') as HTMLInputElement).value) - (this.bill.tongTien - (this.bill.tienGiamGia ?? 0));
    } else {
      this.tienThua = 0;
    }
  }

  chonHinhThucThanhToan() {
    this.hinhThucTT = Number.parseInt((document.getElementById('hinhThucThanhToan') as HTMLInputElement).value);
    this.amount = this.bill.tongTien - (this.bill.tienGiamGia ?? 0);
    this.generateQRCode();
  }

  chonHinhThucGiaoHang() {
    this.hinhThucGH = Number.parseInt((document.getElementById('hinhThucGiaoHang') as HTMLInputElement).value);
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
    // console.log(`https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.jpg?amount=${this.amount}&addInfo=${description}&accountName=${accountName}`);
  }

  chonKhachBanLe() {
    this.checkSelectKhachHang = 0;
    this.backGroundColorKhachLe = 'green';
    this.colorFontKhachLe = 'white';
    this.backGroundColorKhachHang = 'white';
    this.colorFontKhachHang = 'green';
  }

  chonKhachHang() {
    this.checkSelectKhachHang = 1;
    this.backGroundColorKhachLe = 'white';
    this.colorFontKhachLe = 'green';
    this.backGroundColorKhachHang = 'green';
    this.colorFontKhachHang = 'white';
  }

  // thanh toán tại quầy
  thanhToanTaiQuay() {
    const data = {
      hinhThucGiaoHang: this.hinhThucGH,
      hinhThucThanhToan: this.hinhThucTT,
      tenNguoiNhan: '',
      sdtNguoiNhan: '',
      tenNguoiShip: '',
      sdtNguoiShip: '',
      tienGiamGia: 0,
      tienShip: 0,
      tongThanhToan: 0,
      tienMat: 0,
      chuyenKhoan: 0,
      diaChi: '',
      trangThai: 1
    }
    if (this.hinhThucGH == 1 && this.checkSelectKhachHang == 0) {
      data.tenNguoiNhan = (document.getElementById('tenNguoiNhan') as HTMLInputElement).value;
      data.sdtNguoiNhan = (document.getElementById('sdtNguoiNhan') as HTMLInputElement).value;
      data.tenNguoiShip = (document.getElementById('tenNguoiShip') as HTMLInputElement).value;
      data.sdtNguoiShip = (document.getElementById('sdtNguoiShip') as HTMLInputElement).value;
      data.diaChi = (document.getElementById('diaChi') as HTMLInputElement).value;
      data.tienShip = 30000;
      data.tongThanhToan = this.bill.tongTien - (this.bill.tienGiamGia ?? 0) + 30000
    }
    // if (this.hinhThucGH == 1 && this.checkSelectKhachHang == 1) {
    //   data.tenNguoiNhan = '';
    //   data.sdtNguoiNhan = '';
    //   data.tienShip = 30000;
    //   data.tongThanhToan = this.bill.tongTien - (this.bill.tienGiamGia ?? 0) + 30000
    // }
    if (this.hinhThucGH == 0 && this.checkSelectKhachHang == 0) {
      data.tenNguoiNhan = 'Khách bán lẻ';
      data.tienShip = 0;
      data.tongThanhToan = this.bill.tongTien - (this.bill.tienGiamGia ?? 0)
    }
    // if (this.hinhThucGH == 0 && this.checkSelectKhachHang == 1) {
    //   data.tenNguoiNhan = 'Khách bán lẻ';
    //   data.tienShip = 0;
    //   data.tongThanhToan = this.bill.tongTien - (this.bill.tienGiamGia ?? 0)
    // }
    if (this.hinhThucTT == 0) {
      data.tienMat = Number.parseInt((document.getElementById('tienMat') as HTMLInputElement).value);
      data.chuyenKhoan = 0;
    }
    if (this.hinhThucTT == 1) {
      data.tienMat = 0;
      data.chuyenKhoan = this.amount;
    }
    if (this.hinhThucTT == 2) {
      data.tienMat = Number.parseInt((document.getElementById('tienMat') as HTMLInputElement).value);
      data.chuyenKhoan = this.amount;
    }
    this.billService.thanhToanTaiQuay(this.idBill, data).subscribe(res => {
      if(res){
        this.notification.success('Thanh toán thành công!', '');
        this.getBillAndListByBill();
      }
    })
  }

  getBillAndListByBill(){
    this.billService.get(this.idBill).subscribe((res: BillModel) => {
      this.bill = res;
    })
    this.billDetailService.getListByBill(1, 50, this.idBill).subscribe(res => {
      this.billDetails = res.content;
    })
  }
}
