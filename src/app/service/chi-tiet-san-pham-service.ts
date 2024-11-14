import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/chi-tiet-san-pham`;

@Injectable({
  providedIn: 'root'
})
export class ChiTietSanPhamService {
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

  getListBySanPham(page: number, size: number, idSanPham: number): Observable<any> {
    const params = {page, size, idSanPham};
    return this.http.get<any>(`${API_AU_URL}/list-by-san-pham`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getListBySanPhamAndMauSac(page: number, size: number, idSanPham: number, idMauSac: number): Observable<any> {
    const params = {page, size, idSanPham, idMauSac};
    return this.http.get<any>(`${API_AU_URL}/list-by-san-pham-and-color`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }

  detail(id: any): Observable<any> {
    const params = {id};
    return this.http.get(`${API_AU_URL}/detail`, {params});
  }

  getOneByMa(ma: any): Observable<any> {
    const params = {ma};
    return this.http.get(`${API_AU_URL}/get-one-by-ma`, {params});
  }


  update(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update`, data, {params});
  }

  updateStatus(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update-status`, data, {params});
  }

  getOneByColorAndSize(idMauSac: any, idKichThuoc: any, idSanPham: any): Observable<any> {
    const params = {idMauSac, idKichThuoc, idSanPham};
    return this.http.get(`${API_AU_URL}/get-one-by-color-and-size`, {params});
  }
}
