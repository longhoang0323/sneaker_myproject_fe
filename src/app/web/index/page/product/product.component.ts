import {Component, OnInit} from '@angular/core';
import {SanPhamModel} from "../../../../models/san-pham.model";
import {SanPhamService} from "../../../../service/san-pham-service";
import {HangService} from "../../../../service/hang-service";
import {ChatLieuService} from "../../../../service/chat-lieu-service";
import {HangModel} from "../../../../models/hang.model";
import {ChatLieuModel} from "../../../../models/chat-lieu.model";

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
  idHang: any = null;
  idChatLieu: any = null;
  searchInput: string = '';
  constructor(private sanPhamService: SanPhamService,
              private hangService: HangService,
              private chatLieuService: ChatLieuService) {
  }

  getListSanPham(){
    this.sanPhamService.getList(1, 50).subscribe(res => {
      if (res){
        this.listSanPham = res.content;
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

  getListSanPhamBySearch(idHang: any, idChatLieu: any, searchInput: string){
    this.idHang = idHang;
    this.idChatLieu = idChatLieu;
    this.searchInput = searchInput;
    this.sanPhamService.getListBySearch(1, 50, idHang, idChatLieu, this.giaSearch, searchInput).subscribe(res => {
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
