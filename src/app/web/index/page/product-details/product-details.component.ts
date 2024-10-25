import {Component, OnInit} from '@angular/core';
import {SanPhamService} from "../../../../service/san-pham-service";
import {SanPhamModel} from "../../../../models/san-pham.model";
import {ActivatedRoute} from "@angular/router";
import {da_DK} from "ng-zorro-antd/i18n";
import {ChiTietSanPhamService} from "../../../../service/chi-tiet-san-pham-service";
import {ChiTietSanPhamModel} from "../../../../models/chi-tiet-san-pham.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {VNPAYService} from "../../../../service/VNPAY-service";

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
export class ProductDetailsComponent implements OnInit{
  sanPham!: SanPhamModel;
  chiTietSanPham!: ChiTietSanPhamModel;
  listBySanPham: ChiTietSanPhamModel[] = [];
  listBySanPhamAndColor: ChiTietSanPhamModel[] = [];
  checkListByColor = false;
  idMauSac: number = 0;
  mauSac: string = '';
  idKichThuoc: number = 0;
  sizeGiay: string = '';
  soLuong: number = 0;
  soLuongMua: number = 0;
  giamGia: number = 0;
  idSP: number = 0;
  imgSanPhamMua: string = '';
  isVisbleShowForm = false;
  isVisbleNhapSoLuong = false;
  chonPTThanhToan: number = 0;

  constructor(private sanPhamService: SanPhamService,
              private chiTietSanPhamService: ChiTietSanPhamService,
              private route: ActivatedRoute,
              private messs: NzMessageService,
              private vnpayService: VNPAYService) {
  }

  getDetailProduct(){
    this.idSP = this.route.snapshot.params['id'];
    this.sanPhamService.detail(this.idSP).subscribe(res => {
      if (res){
        this.sanPham = res;
      }
    })
    this.chiTietSanPhamService.getListBySanPham(1, 50, this.idSP).subscribe(res => {
      if (res) {
        this.listBySanPham = res.content;
      }
    })
  }

  chooseColor(id: any, idMauSac: any){
    this.idMauSac = idMauSac;
    for(let x = 0;x < this.listBySanPham.length;x++){
      if(this.listBySanPham[x].id == id){
        (document.getElementById('mau' + id) as HTMLInputElement).style.border = '4px solid green';
        this.mauSac = this.listBySanPham[x].tenMauSac;
        this.soLuong = 0;
      }
      if(this.listBySanPham[x].id != id){
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

  chooseSize(id: any, idKichThuoc: any){
    this.idKichThuoc = idKichThuoc;
    for(let x = 0;x < this.listBySanPhamAndColor.length;x++){
      if(this.listBySanPhamAndColor[x].id == id){
        (document.getElementById('sizeGiay' + id) as HTMLInputElement).style.backgroundColor = 'black';
        (document.getElementById('sizeGiay' + id) as HTMLInputElement).style.color = 'white';
        this.sizeGiay = this.listBySanPhamAndColor[x].tenKichThuoc;
        this.soLuong = this.listBySanPhamAndColor[x].soLuong;
      }
      if(this.listBySanPhamAndColor[x].id != id){
        (document.getElementById('sizeGiay' + this.listBySanPhamAndColor[x].id) as HTMLInputElement).style.backgroundColor = 'white';
        (document.getElementById('sizeGiay' + this.listBySanPhamAndColor[x].id) as HTMLInputElement).style.color = 'black';
      }
    }
  }

  // show form mua hàng
  nhapSoLuong(){
    this.chiTietSanPhamService.getOneByColorAndSize(this.idMauSac, this.idKichThuoc, this.idSP).subscribe(res => {
      if(res){
        this.chiTietSanPham = res;
        this.imgSanPhamMua = res.image;
      }
    })
    this.isVisbleNhapSoLuong = true;
  }

  cancelNhapSoLuong(){
    this.isVisbleNhapSoLuong = false;
  }

  okSoLuong(){
    if ((document.getElementById('soLuongMua') as HTMLInputElement).value == null ||
      Number.parseInt((document.getElementById('soLuongMua') as HTMLInputElement).value) <= 0){
      this.messs.error('Vui lòng nhập số lượng hợp lệ');
      return;
    }
    this.soLuongMua = Number.parseInt((document.getElementById('soLuongMua') as HTMLInputElement).value);
    this.isVisbleShowForm = true;
    this.isVisbleNhapSoLuong = false;
  }

  ngOnInit(): void {
    this.getDetailProduct();
  }

  pay() {
    const amount = this.chiTietSanPham.giaBan*this.soLuongMua + 30000 - this.giamGia; // Số tiền thanh toán
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

  chonPhuongThucThanhToan(pttt: number){
    this.chonPTThanhToan = pttt;
    if(pttt == 0){
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.color = 'white';
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.backgroundColor = 'yellowgreen';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.color = 'dodgerblue';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.backgroundColor = 'white';
    }
    if(pttt == 1){
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.color = 'yellowgreen';
      (document.getElementById('thanhToanSau') as HTMLInputElement).style.backgroundColor = 'white';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.color = 'white';
      (document.getElementById('thanhToanOnline') as HTMLInputElement).style.backgroundColor = 'dodgerblue';
    }
  }

  xacNhanDatHang(){
    
  }

  protected readonly da_DK = da_DK;
}
