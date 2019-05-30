import { Product } from './../../interfaces/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[];
  @Output()
  productSelected = new EventEmitter<Product>();
  selectedProductId: number;
  constructor() {}

  ngOnInit() {}

  onProductSelected(product: Product) {
    this.selectedProductId = product.id;
    this.productSelected.emit(product);
  }
}
