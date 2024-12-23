import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/hoa-don-chi-tiet`;

@Injectable({
  providedIn: 'root'
})
export class BillDetailService {
  constructor(private http: HttpClient) {
  }

  getList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getListByBill(page: number, size: number, idHoaDon: any): Observable<any> {
    const params = {page, size, idHoaDon};
    return this.http.get<any>(`${API_AU_URL}/list-by-bill`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  addBillDetail(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create-new-hdct`, data);
  }

  getTopSPBanChay(): Observable<any>{
    return this.http.get<any>(`${API_AU_URL}/top-sp-ban-chay`);
  }

  getTongSPBanChay(): Observable<any>{
    return this.http.get<any>(`${API_AU_URL}/tong-sp-ban-chay`);
  }
}
