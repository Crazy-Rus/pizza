import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ProductType } from 'src/types/product.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: ProductType[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiURL + 'pizzas');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `pizzas?id=${id}`);
  }

  createOrder(data: { product: string; address: string; phone: string }) {
    return this.http.post<{ success: number; message?: string }>(
      environment.apiURL + `order-pizza`,
      data,
    );
  }
}
