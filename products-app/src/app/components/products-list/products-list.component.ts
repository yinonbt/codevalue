import { Product } from './../../interfaces/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Output()
  productSelected = new EventEmitter<Product>();
  constructor() {}

  ngOnInit() {}

  onProductSelected(product: Product) {
    this.selectedProduct = product;
    this.productSelected.emit(product);
  }
}
