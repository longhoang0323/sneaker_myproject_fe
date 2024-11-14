import {Component, OnInit} from '@angular/core';
import {VNPAYService} from "../../../../service/VNPAY-service";
import {ActivatedRoute} from "@angular/router";
import {BillService} from "../../../../service/bill.service";

@Component({
  selector: 'cons-result-payment-success',
  templateUrl: './result-payment-success.component.html',
  styleUrls: ['./result-payment-success.component.scss']
})
export class ResultPaymentSuccessComponent implements OnInit {

  maHD: string = '';

  constructor(private route: ActivatedRoute,
              private vnpayService: VNPAYService,
              private billService: BillService) {
  }

  ngOnInit(): void {
    this.returnResultPayment();
  }

  returnResultPayment() {
    this.route.queryParams.subscribe(params => {
      const vnp_ResponseCode = params['vnp_ResponseCode'];
      const vnp_OrderInfo = params['vnp_OrderInfo'];
      this.maHD = vnp_OrderInfo.split(':')[1];
      this.billService.getOneByMa(vnp_OrderInfo.split(':')[1]).subscribe(res => {
        if(res){
          this.vnpayService.payCallbackHandler(vnp_ResponseCode, res.id).subscribe({
            next: (response: any) => {
              console.log(response);
            }
          });
        }
      })
    });
  }

}
