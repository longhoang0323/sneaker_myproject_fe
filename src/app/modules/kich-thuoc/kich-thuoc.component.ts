import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {KichThuocModel} from "../../models/kich-thuoc.model";
import {KichThuocService} from "./kich-thuoc-service";

@Component({
  selector: 'cons-kich-thuoc',
  templateUrl: './kich-thuoc.component.html',
  styleUrls: ['./kich-thuoc.component.scss']
})
export class KichThuocComponent implements OnInit{
  kichThuocList: KichThuocModel[] = [];
  searchInput: string = '';
  isVisibleCreate = false;
  isVisibleUpdate = false;
  kichThuoc!: KichThuocModel;

  constructor(private kichThuocService: KichThuocService,
              private mess: NzMessageService) {
  }

  private getList(): void {
    this.kichThuocService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.kichThuocList= res.content;
      }
    })
  }

  getSizeByString(){

  }

  showModalCreaate(){
    this.isVisibleCreate = true;
  }

  cancelCreate(){
    this.isVisibleCreate = false;
  }

  createSize(){
    if((document.getElementById('ten') as HTMLInputElement).value == '' ||
      (document.getElementById('ten') as HTMLInputElement).value == null){
      this.mess.error('Không được để trống!');
      return;
    }
    if(Number.parseInt((document.getElementById('ten') as HTMLInputElement).value) <= 0){
      this.mess.error('Size phải lớn hơn 0!');
      return;
    }
    const data = {
      ten: (document.getElementById('ten') as HTMLInputElement).value
    }
    this.kichThuocService.create(data).subscribe(res => {
      if(res){
        console.log(res);
        this.mess.success('Thêm thành công!');
        this.isVisibleCreate = false;
        this.getList();
      }
    })
  }

  showModalUpdate(id: any){
    this.kichThuocService.detail(id).subscribe(res => {
      console.log(res);
      this.kichThuoc = res;
    })
    this.isVisibleUpdate = true;
  }

  cancelUpdate(){
    this.isVisibleUpdate = false;
  }

  updateSize(){
    if((document.getElementById('tenUpdate') as HTMLInputElement).value == '' ||
      (document.getElementById('tenUpdate') as HTMLInputElement).value == null){
      this.mess.error('Không được để trống!');
      return;
    }
    if(Number.parseInt((document.getElementById('tenUpdate') as HTMLInputElement).value) <= 0){
      this.mess.error('Size phải lớn hơn 0!');
      return;
    }
    const data = {
      ten: (document.getElementById('tenUpdate') as HTMLInputElement).value
    }
    this.kichThuocService.update(this.kichThuoc.id, data).subscribe(res => {
      if(res){
        console.log(res);
        this.mess.success('Cập nhật thành công!');
        this.isVisibleUpdate = false;
        this.getList();
      }
    })
  }

  updateTrangThai(id:any, trangThai: any){
    const data = {
      trangThai: 1
    }
    if(trangThai == 1){
      data.trangThai = 0;
    }
    this.kichThuocService.updateStatus(id, data).subscribe(res => {
      if(res){
        console.log(res);
        this.getList();
      }
    })
  }

  ngOnInit(): void {
    this.getList();
  }

}
