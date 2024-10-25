import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/hoa-don`;

@Injectable({
  providedIn: 'root'
})
export class BillService{
  constructor(private http: HttpClient) {
  }

  getBillList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  get(id: any): Observable<any> {
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/detail`, {params});
  }

  // updateStatus(id: any, data: number): Observable<any> {
  //   const params = {id};
  //   return this.http.put<any>(`${API_AU_URL}/delete`, data, {params});
  // }

  createNewBill(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create-new-bill`, data);
  }

  thanhToanTaiQuay(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/thanh-toan-tai-quay`, data, {params});
  }

}
