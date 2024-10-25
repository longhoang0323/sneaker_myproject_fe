import {Component, OnInit} from '@angular/core';
import {SanPhamService} from "../../../../service/san-pham-service";
import {SanPhamModel} from "../../../../models/san-pham.model";

@Component({
  selector: 'cons-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  listSanPhamMoi: SanPhamModel[] = [];
  constructor(private sanPhamService: SanPhamService) {
  }

  getListSanPhamMoi(){
    this.sanPhamService.getList(1, 4).subscribe(res => {
      if (res){
        this.listSanPhamMoi = res.content;
      }
    })
  }

  ngOnInit(): void {
    this.getListSanPhamMoi();
  }

}
