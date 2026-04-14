import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, retry, Subscription, tap } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductType } from 'src/types/product.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private router: Router,
  ) {}

  public products: ProductType[] = [];
  private subscription: Subscription | null = null;
  loading: boolean = false;

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.loading = true;
    this.subscription = this.productService
      .getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log('next');
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
