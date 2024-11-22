import {Component, OnInit} from '@angular/core';
import {SanPhamModel} from "../../../../models/san-pham.model";
import {SanPhamService} from "../../../../service/san-pham-service";
import {HangService} from "../../../../service/hang-service";
import {ChatLieuService} from "../../../../service/chat-lieu-service";
import {HangModel} from "../../../../models/hang.model";
import {ChatLieuModel} from "../../../../models/chat-lieu.model";
import _default from "chart.js/dist/plugins/plugin.legend";
import onHover = _default.defaults.onHover;

@Component({
  selector: 'cons-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  listSanPham: SanPhamModel[] = [];
  listHang: HangModel[] = [];
  listChatLieu: ChatLieuModel[] = [];
  giaSearch: number = 0;
  idHang: number = 0;
  tenHang: string = '';
  idChatLieu: number = 0;
  tenChatLieu: string = '';
  searchInput: string = '';
  constructor(private sanPhamService: SanPhamService,
              private hangService: HangService,
              private chatLieuService: ChatLieuService) {
  }

  getListSanPham(){
    this.searchInput = '';
    if(this.idHang !=0){
      (document.getElementById('hang' + this.idHang) as HTMLInputElement).style.backgroundColor = 'white';
    }
    if(this.idChatLieu !=0){
      (document.getElementById('chatLieu' + this.idChatLieu) as HTMLInputElement).style.backgroundColor = 'white';
    }
    this.sanPhamService.getList(1, 50).subscribe(res => {
      if (res){
        this.listSanPham = res.content;
        this.idHang = 0;
        this.idChatLieu = 0;
      }
    })
  }

  getListHang(){
    this.hangService.getList(1, 50).subscribe(res => {
      if (res){
        this.listHang = res.content;
      }
    })
  }

  getListChatLieu(){
    this.chatLieuService.getList(1, 50).subscribe(res => {
      if (res){
        this.listChatLieu = res.content;
      }
    })
  }

  getListSanPhamBySearch(idHang: any, idChatLieu: any, searchInput: string, tenHang: string, tenChatLieu: string){
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.idHang = idHang;
    this.tenHang = tenHang;
    this.tenChatLieu = tenChatLieu;
    this.idChatLieu = idChatLieu;
    this.searchInput = inputElement.value;
    this.sanPhamService.getListBySearch(1, 50, this.idHang, this.idChatLieu, this.giaSearch, this.searchInput).subscribe(res => {
      if (res){
        this.listSanPham = res.content;
      }
    })
  }

  ngOnInit(): void {
    this.getListSanPham();
    this.getListChatLieu();
    this.getListHang();
  }

}
