import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";

@Component({
    selector: 'cons-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

    bill: BillModel[] = [];

    constructor() {

    }

    ngOnInit(): void {
    }

}
