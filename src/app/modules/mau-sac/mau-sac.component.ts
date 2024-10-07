import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {MauSacModel} from "../../models/mau-sac.model";
import {MauSacService} from "./mau-sac-service";

@Component({
  selector: 'cons-mau-sac',
  templateUrl: './mau-sac.component.html',
  styleUrls: ['./mau-sac.component.scss']
})
export class MauSacComponent implements OnInit{
  mauSacList: MauSacModel[] = [];
  searchInput: string = '';
  isVisibleCreate = false;
  isVisibleUpdate = false;
  mauSac!: MauSacModel;

  constructor(private mauSacService: MauSacService,
              private mess: NzMessageService) {
  }

  private getList(): void {
    this.mauSacService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.mauSacList= res.content;
      }
    })
  }

  getMauSacByString(){

  }

  showModalCreaate(){
    this.isVisibleCreate = true;
  }

  cancelCreate(){
    this.isVisibleCreate = false;
  }

  createMauSac(){
    if((document.getElementById('ten') as HTMLInputElement).value == '' ||
      (document.getElementById('ten') as HTMLInputElement).value == null){
      this.mess.error('Không được để trống!');
      return;
    }
    const data = {
      ten: (document.getElementById('ten') as HTMLInputElement).value
    }
    this.mauSacService.create(data).subscribe(res => {
      if(res){
        console.log(res);
        this.mess.success('Thêm thành công!');
        this.isVisibleCreate = false;
        this.getList();
      }
    })
  }

  showModalUpdate(id: any){
    this.mauSacService.detail(id).subscribe(res => {
      console.log(res);
      this.mauSac = res;
    })
    this.isVisibleUpdate = true;
  }

  cancelUpdate(){
    this.isVisibleUpdate = false;
  }

  updateMauSac(){
    if((document.getElementById('tenUpdate') as HTMLInputElement).value == '' ||
      (document.getElementById('tenUpdate') as HTMLInputElement).value == null){
      this.mess.error('Không được để trống!');
      return;
    }
    const data = {
      ten: (document.getElementById('tenUpdate') as HTMLInputElement).value
    }
    this.mauSacService.update(this.mauSac.id, data).subscribe(res => {
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
    this.mauSacService.updateStatus(id, data).subscribe(res => {
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
