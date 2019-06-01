import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-root',
  templateUrl: './products-root.component.html',
  styleUrls: ['./products-root.component.scss']
})
export class ProductsRootComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct: Product;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productService.products$;
    this.productService.getAll();
  }

  onProductSelected(product: Product) {
    this.selectedProduct = product;
  }

}
