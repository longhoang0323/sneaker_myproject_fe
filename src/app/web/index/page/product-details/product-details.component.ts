import {Component, OnInit} from '@angular/core';
import {SanPhamService} from "../../../../service/san-pham-service";
import {SanPhamModel} from "../../../../models/san-pham.model";
import {ActivatedRoute, Router} from "@angular/router";
import {da_DK} from "ng-zorro-antd/i18n";
import {ChiTietSanPhamService} from "../../../../service/chi-tiet-san-pham-service";
import {ChiTietSanPhamModel} from "../../../../models/chi-tiet-san-pham.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {VNPAYService} from "../../../../service/VNPAY-service";
import {KhachHangKhuyenMaiService} from "../../../../service/khach-hang-khuyen-mai-service";
import {AuthService} from "../../../../auth/services";
import {concatMap, Observable} from "rxjs";
import {CustomerModel} from "../../../../modules/customer/models/customer.model";
import {CustomerService} from "../../../../service/customer.service";
import {KhachHangKhuyenMaiModel} from "../../../../models/khach-hang-khuyen-mai.model";
import {BillService} from "../../../../service/bill.service";
import {BillDetailService} from "../../../../service/bill-detail-service";

@Component({
  selector: 'cons-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }
    `
  ]
})
export class ProductDetailsComponent implements OnInit {
  user$: Observable<any>;
  sanPham!: SanPhamModel;
  chiTietSanPham!: ChiTietSanPhamModel;
  khachHang !: CustomerModel;
  listBySanPham: ChiTietSanPhamModel[] = [];
  listBySanPhamAndColor: ChiTietSanPhamModel[] = [];
  listMaGiamGia: KhachHangKhuyenMaiModel[] = [];
  checkListByColor = false;
  idMauSac: number = 0;
  mauSac: string = '';
  idKichThuoc: number = 0;
  sizeGiay: string = '';
  soLuong: number = 0;
  soLuongMua: number = 0;
  giamGia: number = 0;
  loaiGiamGia: number = 0;
  maGiamGia: string = '';
  idVoucher: number | undefined;
  idSP: number = 0;
  imgSanPhamMua: string = '';
  isVisbleShowForm = false;
  isVisbleNhapSoLuong = false;
  isVisbleMaGiamGia = false;
  chonPTThanhToan: number = 0;
  soTienThanhToan: number = 0;

  constructor(private sanPhamService: SanPhamService,
              private chiTietSanPhamService: ChiTietSanPhamService,
              private billDetailService: BillDetailService,
              private khachHangKhuyenMaiService: KhachHangKhuyenMaiService,
              private billService: BillService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private messs: NzMessageService,
              private vnpayService: VNPAYService,
              private customerService: CustomerService) {
    this.user$ = this.authService.currentUser$;
  }

  getDetailProduct() {
    this.idSP = this.route.snapshot.params['id'];
    this.sanPhamService.detail(this.idSP).subscribe(res => {
      if (res) {
        this.sanPham = res;
      }
    })
    this.chiTietSanPhamService.getListBySanPham(1, 50, this.idSP).subscribe(res => {
      if (res) {
        this.listBySanPham = res.content;
      }
    })
  }

  chooseColor(id: any, idMauSac: any) {
    this.idMauSac = idMauSac;
    for (let x = 0; x < this.listBySanPham.length; x++) {
      if (this.listBySanPham[x].id == id) {
        (document.getElementById('mau' + id) as HTMLInputElement).style.border = '4px solid green';
        this.mauSac = this.listBySanPham[x].tenMauSac;
        this.soLuong = 0;
      }
      if (this.listBySanPham[x].id != id) {
        (document.getElementById('mau' + this.listBySanPham[x].id) as HTMLInputElement).style.border = '1px solid black';
      }
    }
    this.chiTietSanPhamService.getListBySanPhamAndMauSac(1, 50, this.idSP, idMauSac).subscribe(res => {
      if (res) {
        this.listBySanPhamAndColor = res.content;
        this.checkListByColor = false;
      }
    })
    setTimeout(() => {
      this.checkListByColor = this.listBySanPhamAndColor.length == 0;
    }, 500)
  }

  chooseSize(id: any, idKichThuoc: any) {
    this.idKichThuoc = idKichThuoc;
    for (let x = 0; x < this.listBySanPhamAndColor.length; x++) {
      if (this.listBySanPhamAndColor[x].id == id) {
        (document.getElementById('sizeGiay' + id) as HTMLInputElement).style.backgroundColor = 'black';
        (document.getElementById('sizeGiay' + id) as HTMLInputElement).style.color = 'white';
        this.sizeGiay = this.listBySanPhamAndColor[x].tenKichThuoc;
        this.soLuong = this.listBySanPhamAndColor[x].soLuong;
      }
      if (this.listBySanPhamAndColor[x].id != id) {
        (document.getElementById('sizeGiay' + this.listBySanPhamAndColor[x].id) as HTMLInputElement).style.backgroundColor = 'white';
        (document.getElementById('sizeGiay' + this.listBySanPhamAndColor[x].id) as HTMLInputElement).style.color = 'black';
      }
    }
  }

  // show form mua hàng
  nhapSoLuong() {
    this.chiTietSanPhamService.getOneByColorAndSize(this.idMauSac, this.idKichThuoc, this.idSP).subscribe(res => {
      if (res) {
        this.chiTietSanPham = res;
        this.imgSanPhamMua = res.image;
      }
    })
    this.isVisbleNhapSoLuong = true;
  }

  cancelNhapSoLuong() {
    this.isVisbleNhapSoLuong = false;
  }

  okSoLuong() {
    if ((document.getElementById('soLuongMua') as HTMLInputElement).value == null ||
      Number.parseInt((document.getElementById('soLuongMua') as HTMLInputElement).value) <= 0) {
      this.messs.error('Vui lòng nhập số lượng hợp lệ');
      return;
    }
    this.soLuongMua = Number.parseInt((document.getElementById('soLuongMua') as HTMLInputElement).value);
    this.isVisbleShowForm = true;
    this.isVisbleNhapSoLuong = false;
  }

  ngOnInit(): void {
    this.customerService.getKhachHangByUser(this.authService.currentUserValue?.id).subscribe(res => {
      this.khachHang = res;
    })
    this.getDetailProduct();
  }

  pay(maHD: string) {
    if(this.loaiGiamGia == 0){
      this.soTienThanhToan = this.chiTietSanPham.giaBan * this.soLuongMua + 30000 + ((this.soLuongMua - 1) * 2500) - this.giamGia;
    }
    if(this.loaiGiamGia == 1){
      this.soTienThanhToan = this.chiTietSanPham.giaBan * this.soLuongMua*(100- this.giamGia)/100 + 30000 + ((this.soLuongMua - 1) * 2500);
    }
    this.vnpayService.createPayment(this.soTienThanhToan, 'NCB', maHD).subscribe({
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

  chonPhuongThucThanhToan(pttt: number) {
    this.chonPTThanhToan = pttt;
    if (pttt == 0) {
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.color = 'white';
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.backgroundColor = 'yellowgreen';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.color = 'dodgerblue';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.backgroundColor = 'white';
    }
    if (pttt == 1) {
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.color = 'yellowgreen';
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.backgroundColor = 'white';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.color = 'white';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.backgroundColor = 'dodgerblue';
    }
  }

  showModelChonMaGiamGia() {
    this.khachHangKhuyenMaiService.getListByKhachHang(1, 50, this.khachHang.id).subscribe(res => {
      if (res) {
        this.listMaGiamGia = res.content;
        this.isVisbleMaGiamGia = true;
      }
    })
  }

  chonMaGiamGia(idVoucher: any, maVoucher: string, giaTri: number, loaiGiamGia: number) {
    this.messs
      .loading('Đang áp dụng voucher ' + maVoucher, { nzDuration: 1500 })
      .onClose!.pipe(
      concatMap(() => this.messs.success('Áp dụng mã voucher ' + maVoucher + ' thành công!', { nzDuration: 1500 }).onClose!),
    )
      .subscribe(() => {
        console.log('All completed!');
      });
    setTimeout(() => {
      this.idVoucher = idVoucher;
      this.maGiamGia = maVoucher;
      this.giamGia = giaTri;
      this.loaiGiamGia = loaiGiamGia;
      this.isVisbleMaGiamGia = false;
    }, 1400)
  }

  cancelShowMaGiamGia() {
    this.isVisbleMaGiamGia = false;
  }

  xacNhanDatHang() {

    const dataDefault = {
      idUser: this.authService.currentUserValue?.id,
      idKhachHang: this.khachHang.id,
      hinhThucGiaoHang: 1,
      hinhThucThanhToan: this.chonPTThanhToan,
      tenNguoiNhan: (document.getElementById('tenNguoiNhan') as HTMLInputElement).value,
      sdtNguoiNhan: (document.getElementById('sdtNguoiNhan') as HTMLInputElement).value,
      tenNguoiShip: '',
      sdtNguoiShip: '',
      tienGiamGia: 0,
      tienShip: 30000 + ((this.soLuongMua - 1) * 2500),
      tongTien: this.chiTietSanPham.giaBan * this.soLuongMua,
      tongThanhToan: this.chiTietSanPham.giaBan * this.soLuongMua + 30000 + ((this.soLuongMua - 1) * 2500),
      tienMat: 0,
      chuyenKhoan: 0,
      diaChi: (document.getElementById('diaChi') as HTMLInputElement).value,
      ghiChu: (document.getElementById('ghiChu') as HTMLInputElement).value,
      trangThai: 0,
      idVoucher: null
    }
    const data = {
      idUser: this.authService.currentUserValue?.id,
      idKhachHang: this.khachHang.id,
      hinhThucGiaoHang: 1,
      hinhThucThanhToan: this.chonPTThanhToan,
      tenNguoiNhan: (document.getElementById('tenNguoiNhan') as HTMLInputElement).value,
      sdtNguoiNhan: (document.getElementById('sdtNguoiNhan') as HTMLInputElement).value,
      tenNguoiShip: '',
      sdtNguoiShip: '',
      tienGiamGia: 0,
      tienShip: 30000 + ((this.soLuongMua - 1) * 2500),
      tongTien: this.chiTietSanPham.giaBan * this.soLuongMua,
      tongThanhToan: 0,
      tienMat: 0,
      chuyenKhoan: 0,
      diaChi: (document.getElementById('diaChi') as HTMLInputElement).value,
      ghiChu: (document.getElementById('ghiChu') as HTMLInputElement).value,
      trangThai: 0,
      idVoucher: 0
    }
    if(this.idVoucher){
      data.idVoucher = this.idVoucher;
      if(this.loaiGiamGia == 0){
        data.tienGiamGia = this.giamGia;
        data.tongThanhToan = this.chiTietSanPham.giaBan * this.soLuongMua + 30000 + ((this.soLuongMua - 1) * 2500) - this.giamGia;
      }
      if(this.loaiGiamGia == 1){
        data.tienGiamGia = this.giamGia * this.chiTietSanPham.giaBan * this.soLuongMua / 100;
        data.tongThanhToan = this.chiTietSanPham.giaBan * this.soLuongMua + 30000 + ((this.soLuongMua - 1) * 2500) - this.giamGia*this.chiTietSanPham.giaBan * this.soLuongMua/100;
      }
      this.billService.createBillOnline(data).subscribe(res => {
        if(res){
          this.createBillDetail(res.id);
          if (this.chonPTThanhToan == 1) {
            this.pay(res.ma);
          }else if(this.chonPTThanhToan == 0){
            this.messs.success('Đặt hàng thành công!');
            this.router.navigate(['/product']);
          }
        }
      })
    //   api xác nhận đặt hàng
    }
    if(!this.idVoucher){
    //   api xác nhận đặt hàng
      this.billService.createBillOnline(dataDefault).subscribe(res => {
        if(res){
          this.createBillDetail(res.id);
          if (this.chonPTThanhToan == 1) {
            this.pay(res.ma);
          }else if(this.chonPTThanhToan == 0){
            this.router.navigate(['/product']);
          }
        }
      })
    }
  }

  createBillDetail(id: any) {
    if (this.chiTietSanPham) {
      const data = {
        idHoaDon: id,
        idChiTietSanPham: this.chiTietSanPham.id,
        donGia: this.chiTietSanPham.donGia,
        soLuong: this.soLuongMua,
        giaBan: this.chiTietSanPham.giaBan,
        giamGia: 0
      }
      this.billDetailService.addBillDetail(data).subscribe(res => {
        if (res) {
          console.log(res);
        }
      })
    }
  }

  protected readonly da_DK = da_DK;
}
