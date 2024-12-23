import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/khach-hang-khuyen-mai`;

@Injectable({
  providedIn: 'root'
})
export class KhachHangKhuyenMaiService {
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

  create(idVoucher: any, data: any): Observable<any> {
    const params = {idVoucher};
    return this.http.post(`${API_AU_URL}/create`, data, {params});
  }

  detail(id: any): Observable<any> {
    const params = {id};
    return this.http.get(`${API_AU_URL}/detail`, {params});
  }

  update(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update`, data, {params});
  }

  updateStatus(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update-status`, data, {params});
  }

  getListByKhachHang(page: number, size: number, idKhachHang: any): Observable<any> {
    const params = {page, size, idKhachHang};
    return this.http.get<any>(`${API_AU_URL}/list-by-khach-hang`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
}
