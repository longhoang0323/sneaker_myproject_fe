import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {SanPhamModel} from "../../models/san-pham.model";
import {SanPhamService} from "./san-pham-service";
import {HangService} from "../hang/hang-service";
import {ChatLieuService} from "../chat-lieu/chat-lieu-service";
import {HangModel} from "../../models/hang.model";
import {ChatLieuModel} from "../../models/chat-lieu.model";
import {ChiTietSanPhamService} from "../chi-tiet-san-pham/chi-tiet-san-pham-service";
import {ChiTietSanPhamModel} from "../../models/chi-tiet-san-pham.model";

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
      imageDefault: ''
    }
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

  ngOnInit(): void {
    this.getListHang();
    this.getListChatLieu();
    this.getList();
  }

}
