import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {SanPhamModel} from "../../models/san-pham.model";
import {SanPhamService} from "../../service/san-pham-service";
import {HangService} from "../../service/hang-service";
import {ChatLieuService} from "../../service/chat-lieu-service";
import {HangModel} from "../../models/hang.model";
import {ChatLieuModel} from "../../models/chat-lieu.model";
import {ChiTietSanPhamService} from "../../service/chi-tiet-san-pham-service";
import {ChiTietSanPhamModel} from "../../models/chi-tiet-san-pham.model";
import * as QRCode from 'qrcode';

@Component({
  selector: 'cons-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.scss']
})
export class SanPhamComponent implements OnInit {
  sanPhamList: SanPhamModel[] = [];
  hangList: HangModel[] = [];
  chatLieuList: ChatLieuModel[] = [];
  searchInput: string = '';
  isVisibleCreate = false;
  isVisibleUpdate = false;
  sanPham!: SanPhamModel;
  ctspList: ChiTietSanPhamModel[] = [];
  isVisibleCTSP = false;
  idSanPham: number | undefined;
  maSanPhamMoi: string = '';
  qrCodeUrl: string = '';

  constructor(private sanPhamService: SanPhamService,
              private ctspService: ChiTietSanPhamService,
              private hangService: HangService,
              private chatLieuService: ChatLieuService,
              private mess: NzMessageService) {
  }

  private getList(): void {
    this.sanPhamService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.sanPhamList = res.content;
      }
    })
  }

  getListHang() {
    this.hangService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.hangList = res.content;
      }
    })
  }

  getListChatLieu() {
    this.chatLieuService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.chatLieuList = res.content;
      }
    })
  }

  getSanPhamByString() {

  }

  showModalCreaate() {
    this.maSanPhamMoi = 'SP0' +  String(Number.parseInt(this.sanPhamList[0].ma.charAt(3)) + 1);
    this.isVisibleCreate = true;
  }

  cancelCreate() {
    this.isVisibleCreate = false;
  }

  createSanPham() {
    if ((document.getElementById('ten') as HTMLInputElement).value == '' ||
      (document.getElementById('ten') as HTMLInputElement).value == null) {
      this.mess.error('Không được để trống!');
      return;
    }
    const data = {
      ten: (document.getElementById('ten') as HTMLInputElement).value,
      idHang: (document.getElementById('hang') as HTMLInputElement).value,
      idChatLieu: (document.getElementById('chatLieu') as HTMLInputElement).value,
      imageDefault: '',
      qrCode: ''
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        data.qrCode = reader.result as string; // Thêm trường base64Image vào payload
    };
    this.sanPhamService.create(data).subscribe(res => {
      if (res) {
        console.log(res);
        this.mess.success('Thêm thành công!');
        this.isVisibleCreate = false;
        this.getList();
      }
    })
  }

  showModalUpdate(id: any) {
    this.sanPhamService.detail(id).subscribe(res => {
      console.log(res);
      this.sanPham = res;
    })
    this.isVisibleUpdate = true;
  }

  cancelUpdate() {
    this.isVisibleUpdate = false;
  }

  updateSanPham() {
    if ((document.getElementById('tenUpdate') as HTMLInputElement).value == '' ||
      (document.getElementById('tenUpdate') as HTMLInputElement).value == null) {
      this.mess.error('Không được để trống!');
      return;
    }
    const data = {
      ten: (document.getElementById('tenUpdate') as HTMLInputElement).value,
      idHang: this.sanPham.idHang,
      idChatLieu: this.sanPham.idChatLieu
    }
    this.sanPhamService.update(this.sanPham.id, data).subscribe(res => {
      if (res) {
        console.log(res);
        this.mess.success('Cập nhật thành công!');
        this.isVisibleUpdate = false;
        this.getList();
      }
    })
  }

  updateTrangThai(id: any, trangThai: any) {
    let data = 1;
    if (trangThai == 1) {
      data = 0;
    }
    this.sanPhamService.updateStatus(id, data).subscribe(res => {
      if (res) {
        console.log(res);
        this.getList();
      }
    })
  }

  updateImageDefault(id: any, imageDefault: string) {
    this.sanPhamService.updateImage(id, imageDefault).subscribe(res => {
      if (res) {
        console.log(res);
        this.isVisibleCTSP = false;
        this.mess.success('Cập nhật thành công!');
        this.getList();
      }
    })
  }

  showModalListCTSP(id: any) {
    this.idSanPham = id;
    this.ctspService.getListBySanPham(1, 10, id).subscribe(
      res => {
        if (res && res.content) {
          this.ctspList = res.content;
        }
      })
    this.isVisibleCTSP = true;
  }

  cancelCTSP(){
    this.isVisibleCTSP = false;
  }
  generateQRCode(): void {
    QRCode.toDataURL(this.maSanPhamMoi)
      .then((url: string) => {
        this.qrCodeUrl = url;
      })
      .catch((err: any) => {
        console.error('Error generating QR Code', err);
      });
  }


  ngOnInit(): void {
    this.getListHang();
    this.getListChatLieu();
    this.getList();
  }

}
