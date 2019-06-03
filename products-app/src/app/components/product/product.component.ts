import { Product } from './../../interfaces/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output()
  productSelected = new EventEmitter<Product>();
  @Output()
  productDeleted = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.productSelected.emit(this.product);
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.productDeleted.emit(this.product);
  }
}
