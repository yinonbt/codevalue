import { Product } from "./../interfaces/product";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
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

  update(item: Product): Promise<Product> {
    const url = `${environment.apiUrl}products/${item.id}`;
    return this.http
      .put<Product>(url, item)
      .pipe(
        tap(o => {
          this.getAll();
        })
      )
      .toPromise();
  }

  add(product: Product): Promise<Product> {
    const url = `${environment.apiUrl}products`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http
      .post<Product>(url, product, httpOptions)
      .pipe(
        tap(o => {
          this.getAll();
        })
      )
      .toPromise();
  }
}
