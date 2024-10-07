import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

const API_AU_URL = `${environment.apiUrl}/pay-ment`;
@Injectable({
  providedIn: 'root'
})
export class PaymentService{

  constructor(private http: HttpClient) {

  }

  processPayment(qrCode: string): Observable<any>{
    return this.http.post(`${API_AU_URL}/payment`, {qrCode});
  }
}
