import { Product } from "./../interfaces/product";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  products$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getAll(): void {
    const url = `${environment.apiUrl}products`;
    this.http.get<Product[]>(url).subscribe(result => {
      this.products$.next(result);
    });
  }
}
