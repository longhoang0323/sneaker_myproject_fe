import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/chat-lieu`;

@Injectable({
    providedIn: 'root'
})
export class ChatLieuService {
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

    create(data: any): Observable<any> {
        return this.http.post(`${API_AU_URL}/create`, data);
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
}