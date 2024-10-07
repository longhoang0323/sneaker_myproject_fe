import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
const API_AU_URL = `${environment.apiUrl}/pay-ment`;
@Injectable({
  providedIn: 'root'
})
export class VNPAYService {
  private readonly vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL thanh toán (sử dụng môi trường sandbox để test)
  private readonly vnpReturnUrl = 'http://yourwebsite.com/vnpay_return'; // URL nhận kết quả
  private readonly vnpIpnUrl = 'http://yourwebsite.com/vnpay_ipn'; // URL nhận thông báo

  constructor(private http: HttpClient) { }

  createPayment(amount: any, bankCode: string): Observable<any> {
    const params = {amount, bankCode};
    return this.http.get<any>(`${API_AU_URL}/vn-pay`, {params});
  }
}
