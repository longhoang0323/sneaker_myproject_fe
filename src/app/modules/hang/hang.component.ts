import {Component, OnInit} from "@angular/core";
import {HangModel} from "../../models/hang.model";
import {HangService} from "./hang-service";
import {create} from "qrcode";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'cons-customer',
    templateUrl: './hang.component.html',
    styleUrls: ['./hang.component.scss']
})
export class HangComponent implements OnInit{
    hangList: HangModel[] = [];
    searchInput: string = '';
    isVisibleCreate = false;
    isVisibleUpdate = false;
    hang!: HangModel;

    constructor(private hangService: HangService,
                private mess: NzMessageService) {
    }

    private getList(): void {
        this.hangService.getList(1, 15).subscribe(res => {
            if (res && res.content) {
                this.hangList= res.content;
            }
        })
    }

    getHangByString(){

    }

    showModalCreaate(){
        this.isVisibleCreate = true;
    }

    cancelCreate(){
        this.isVisibleCreate = false;
    }

    createHang(){
        const data = {
            ten: (document.getElementById('ten') as HTMLInputElement).value
        }
        this.hangService.create(data).subscribe(res => {
            if(res){
                console.log(res);
                this.mess.success('Thêm thành công!');
                this.isVisibleCreate = false;
                this.getList();
            }
        })
    }

    showModalUpdate(id: any){
        this.hangService.detail(id).subscribe(res => {
            console.log(res);
            this.hang = res;
        })
        this.isVisibleUpdate = true;
    }

    cancelUpdate(){
        this.isVisibleUpdate = false;
    }

    updateHang(){
        const data = {
            ten: (document.getElementById('tenUpdate') as HTMLInputElement).value
        }
        this.hangService.update(this.hang.id, data).subscribe(res => {
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
        this.hangService.updateStatus(id, data).subscribe(res => {
            if(res){
                console.log(res);
                this.getList();
            }
        })
    }

    ngOnInit(): void {
        this.getList();
    }

    protected readonly create = create;
}
