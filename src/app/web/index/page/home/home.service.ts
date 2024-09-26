import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";

const API_AU_URL = `${environment.apiUrl}/phong`;

@Injectable({
  providedIn: 'root'
})
export class HomeService{
  constructor(private http: HttpClient) {
  }
}
