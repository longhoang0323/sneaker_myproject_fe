import {Component, OnInit} from '@angular/core';
import {SanPhamModel} from "../../models/san-pham.model";
import {HangModel} from "../../models/hang.model";
import {ChatLieuModel} from "../../models/chat-lieu.model";
import {ChiTietSanPhamModel} from "../../models/chi-tiet-san-pham.model";
import {MauSacModel} from "../../models/mau-sac.model";
import {KichThuocModel} from "../../models/kich-thuoc.model";
import {ChiTietSanPhamService} from "./chi-tiet-san-pham-service";
import {NzMessageService} from "ng-zorro-antd/message";
import {SanPhamService} from "../san-pham/san-pham-service";
import {MauSacService} from "../mau-sac/mau-sac-service";
import {KichThuocService} from "../kich-thuoc/kich-thuoc-service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'cons-chi-tiet-san-pham',
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.scss']
})
export class ChiTietSanPhamComponent implements OnInit {
  ctspList: ChiTietSanPhamModel[] = [];
  sanPhamList: SanPhamModel[] = [];
  mauSacList: MauSacModel[] = [];
  kichThuocList: KichThuocModel[] = [];
  searchInput: string = '';
  isVisibleCreate = false;
  isVisibleUpdate = false;
  ctsp!: ChiTietSanPhamModel;
  image: string = '';
  imageUpdate: string = '';


  constructor(private ctspService: ChiTietSanPhamService,
              private mess: NzMessageService,
              private sanPhamService: SanPhamService,
              private mauSacService: MauSacService,
              private kichThuocService: KichThuocService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.getList();
    this.getListMauSac();
    this.getListKichThuoc();
    this.getListSanPham();
  }

  getListByString() {

  }

  private getList(): void {
    this.ctspService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.ctspList = res.content;
      }
    })
  }

  getListMauSac() {
    this.mauSacService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.mauSacList = res.content;
      }
    })
  }

  getListKichThuoc() {
    this.kichThuocService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.kichThuocList = res.content;
      }
    })
  }

  getListSanPham() {
    this.sanPhamService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.sanPhamList = res.content;
      }
    })
  }

  showModalCreaate() {
    this.isVisibleCreate = true;
  }

  cancelCreate() {
    this.isVisibleCreate = false;
  }

  createCTSP() {
    if ((document.getElementById('soLuong') as HTMLInputElement).value == '' ||
      (document.getElementById('soLuong') as HTMLInputElement).value == null ||
      (document.getElementById('donGia') as HTMLInputElement).value == '' ||
      (document.getElementById('donGia') as HTMLInputElement).value == null) {
      this.mess.error('Không được để trống!');
      return;
    }
    const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;
    const data = {
      idSanPham: (document.getElementById('sanPham') as HTMLInputElement).value,
      idMauSac: (document.getElementById('mauSac') as HTMLInputElement).value,
      idKichThuoc: (document.getElementById('size') as HTMLInputElement).value,
      donGia: (document.getElementById('donGia') as HTMLInputElement).value,
      soLuong: (document.getElementById('soLuong') as HTMLInputElement).value,
      image: ''
    }
    if (file) {
      // Đọc file thành chuỗi Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        data.image = reader.result as string; // Thêm trường base64Image vào payload
        this.ctspService.create(data).subscribe(res => {
          if (res.message == "failed") {
            this.notification.error(res.entityMessages[0].errorMessage, "");
          } else {
            this.mess.success('Thêm thành công!');
            this.isVisibleCreate = false;
            this.getList();
          }
        })
      };
      reader.readAsDataURL(file);
    } else {
      this.ctspService.create(data).subscribe(res => {
        if (res.message == "failed") {
          this.notification.error(res.entityMessages[0].errorMessage, "");
        } else {
          this.mess.success('Thêm thành công!');
          this.isVisibleCreate = false;
          this.getList();
        }
      })
    }
  }

  showModalUpdate(id: any) {
    this.ctspService.detail(id).subscribe(res => {
      console.log(res);
      this.ctsp = res;
      this.imageUpdate = res.image;
    })
    this.isVisibleUpdate = true;
  }

  cancelUpdate() {
    this.isVisibleUpdate = false;
  }

  updateCTSP() {
    if ((document.getElementById('soLuongUpdate') as HTMLInputElement).value == '' ||
      (document.getElementById('soLuongUpdate') as HTMLInputElement).value == null ||
      (document.getElementById('donGiaUpdate') as HTMLInputElement).value == '' ||
      (document.getElementById('donGiaUpdate') as HTMLInputElement).value == null) {
      this.mess.error('Không được để trống!');
      return;
    }
    const fileInput: HTMLInputElement = document.getElementById('imageUpdate') as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;
    if (file) {
      // Đọc file thành chuỗi Base64
      const reader = new FileReader();
      const data = {
        idSanPham: this.ctsp.idSanPham,
        idMauSac: this.ctsp.idMauSac,
        idKichThuoc: this.ctsp.idKichThuoc,
        donGia: (document.getElementById('donGiaUpdate') as HTMLInputElement).value,
        soLuong: (document.getElementById('soLuongUpdate') as HTMLInputElement).value,
        image: ''
      }
      reader.onloadend = () => {
        data.image = reader.result as string; // Thêm trường base64Image vào payload
        this.ctspService.update(this.ctsp.id, data).subscribe(res => {
          if (res) {
            console.log(res);
            this.mess.success('Cập nhật thành công!');
            this.isVisibleUpdate = false;
            this.getList();
          }
        })
      };
      reader.readAsDataURL(file);
    } else {
      const data = {
        idSanPham: this.ctsp.idSanPham,
        idMauSac: this.ctsp.idMauSac,
        idKichThuoc: this.ctsp.idKichThuoc,
        donGia: (document.getElementById('donGiaUpdate') as HTMLInputElement).value,
        soLuong: (document.getElementById('soLuongUpdate') as HTMLInputElement).value,
        image: this.ctsp.image
      }
      this.ctspService.update(this.ctsp.id, data).subscribe(res => {
        if (res) {
          console.log(res);
          this.mess.success('Cập nhật thành công!');
          this.isVisibleUpdate = false;
          this.getList();
        }
      })
    }
  }

  updateTrangThai(id: any, trangThai: any) {
    let data = 1;
    if (trangThai == 1) {
      data = 0;
    }
    this.ctspService.updateStatus(id, data).subscribe(res => {
      if (res) {
        console.log(res);
        this.getList();
      }
    })
  }

  showImageUpdate() {
    const fileInput: HTMLInputElement = document.getElementById('imageUpdate') as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        this.imageUpdate = reader.result as string;
      }
      reader.readAsDataURL(file);
      this.mess.success(reader.result as string);
    }
  }

  showImage() {
    const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        this.image = reader.result as string;
      }
      reader.readAsDataURL(file);
      this.mess.success(reader.result as string);
    }
  }

}
