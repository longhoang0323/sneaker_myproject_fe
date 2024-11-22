import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/gio-hang`;

@Injectable({
  providedIn: 'root'
})
export class GioHangService {
  constructor(private http: HttpClient) {
  }

  getListByUser(page: number, size: number, idUser: any): Observable<any> {
    const params = {page, size, idUser};
    return this.http.get<any>(`${API_AU_URL}/list-by-user`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getCountCartByUser(idUser: any){
    const params = {idUser};
    return this.http.get<any>(`${API_AU_URL}/count-cart-by-user`, {params});
  }

  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }
}
