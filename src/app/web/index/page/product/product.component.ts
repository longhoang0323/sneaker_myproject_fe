import {Component, OnInit} from '@angular/core';
import {SanPhamModel} from "../../../../models/san-pham.model";
import {SanPhamService} from "../../../../service/san-pham-service";

@Component({
  selector: 'cons-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  listSanPham: SanPhamModel[] = [];
  constructor(private sanPhamService: SanPhamService) {
  }

  getListSanPham(){
    this.sanPhamService.getList(1, 50).subscribe(res => {
      if (res){
        this.listSanPham = res.content;
      }
    })
  }

  ngOnInit(): void {
    this.getListSanPham();
  }

}
