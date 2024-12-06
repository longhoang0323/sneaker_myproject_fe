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

  getBillListByUser(page: number, size: number, idUser: any): Observable<any> {
    const params = {page, size, idUser};
    return this.http.get<any>(`${API_AU_URL}/list-by-user`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getListByLoaiHD(page: number, size: number, loaiHoaDon: number): Observable<any> {
    const params = {page, size, loaiHoaDon};
    return this.http.get<any>(`${API_AU_URL}/list-by-loai-hd`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getListBySearch(page: number, size: number, loaiHoaDon: number, searchInput: string, trangThai: number, trangThaiGiaoHang: number, hinhThucGiaoHang: number, startDate: string, endDate: string): Observable<any> {
    const params = {page, size, loaiHoaDon, searchInput, trangThai, trangThaiGiaoHang, hinhThucGiaoHang, startDate, endDate};
    return this.http.get<any>(`${API_AU_URL}/list-by-search`, {params}).pipe(map(res => {
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

  createBillOnline(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create-bill-online`, data);
  }

  getOneByMa(ma: string): Observable<any> {
    const params = {ma};
    return this.http.get<any>(`${API_AU_URL}/get-by-ma`, {params});
  }

  updateGiaoHang(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update-giao-hang`, data, {params});
  }

  getSumTongThanhToan(loaiHoaDon: number, startDate: any, endDate: any, dayInput: any){
    const params = {loaiHoaDon, startDate, endDate, dayInput};
    return this.http.get<any>(`${API_AU_URL}/get-sum-by-day`, {params});
  }

  getCountHoaDon(trangThai: any, startDate: any, endDate: any, dayInput: any){
    const params = {trangThai, startDate, endDate, dayInput};
    return this.http.get<any>(`${API_AU_URL}/get-count-hoa-don`, {params});
  }

  getDoanhThuByMonth(year: number){
    const params = {year};
    return this.http.get<any>(`${API_AU_URL}/get-doanh-thu-by-month`, {params});
  }
}
