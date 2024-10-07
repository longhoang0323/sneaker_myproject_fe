import {Component, OnInit} from '@angular/core';
import {ChatLieuService} from "./chat-lieu-service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ChatLieuModel} from "../../models/chat-lieu.model";

@Component({
  selector: 'cons-chat-lieu',
  templateUrl: './chat-lieu.component.html',
  styleUrls: ['./chat-lieu.component.scss']
})
export class ChatLieuComponent implements OnInit{
  chatLieuList: ChatLieuModel[] = [];
  searchInput: string = '';
  isVisibleCreate = false;
  isVisibleUpdate = false;
  chatLieu!: ChatLieuModel;

  constructor(private chatLieuService: ChatLieuService,
              private mess: NzMessageService) {
  }

  private getList(): void {
    this.chatLieuService.getList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.chatLieuList= res.content;
      }
    })
  }

  getChatLieuByString(){

  }

  showModalCreaate(){
    this.isVisibleCreate = true;
  }

  cancelCreate(){
    this.isVisibleCreate = false;
  }

  createChatLieu(){
    if((document.getElementById('ten') as HTMLInputElement).value == '' ||
      (document.getElementById('ten') as HTMLInputElement).value == null){
      this.mess.error('Không được để trống!');
      return;
    }
    const data = {
      ten: (document.getElementById('ten') as HTMLInputElement).value
    }
    this.chatLieuService.create(data).subscribe(res => {
      if(res){
        console.log(res);
        this.mess.success('Thêm thành công!');
        this.isVisibleCreate = false;
        this.getList();
      }
    })
  }

  showModalUpdate(id: any){
    this.chatLieuService.detail(id).subscribe(res => {
      console.log(res);
      this.chatLieu = res;
    })
    this.isVisibleUpdate = true;
  }

  cancelUpdate(){
    this.isVisibleUpdate = false;
  }

  updateChatLieu(){
    if((document.getElementById('tenUpdate') as HTMLInputElement).value == '' ||
      (document.getElementById('tenUpdate') as HTMLInputElement).value == null){
      this.mess.error('Không được để trống!');
      return;
    }
    const data = {
      ten: (document.getElementById('tenUpdate') as HTMLInputElement).value
    }
    this.chatLieuService.update(this.chatLieu.id, data).subscribe(res => {
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
    this.chatLieuService.updateStatus(id, data).subscribe(res => {
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
