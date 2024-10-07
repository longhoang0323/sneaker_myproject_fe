import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {ActivatedRoute} from "@angular/router";
import {BillService} from "./bill.service";
import {BillDetailModel} from "../../models/bill-detail.model";

@Component({
    selector: 'cons-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
    id: any;
    bill!: BillModel;
    billDetails: BillDetailModel[] = [];

    constructor(private route: ActivatedRoute,
                private billService: BillService) {

    }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.billService.get(this.id).subscribe((res: BillModel) => {
          this.bill = res;
      })
      setTimeout(() => {
        console.log(this.bill)
      }, 500)
    }

}
