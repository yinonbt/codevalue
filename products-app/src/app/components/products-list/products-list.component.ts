import { Product } from './../../interfaces/product';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnChanges {
  
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Output()
  productSelected = new EventEmitter<Product>();
  @Output()
  productDeleted = new EventEmitter<Product>();
  searchQuery = '';
  searchTermChanged = new BehaviorSubject<string>(this.searchQuery);
  productsAfterFilter$: Observable<Product[]>;
  
  constructor() {
    this.productsAfterFilter$ = this.searchTermChanged
      .pipe(debounceTime(200),
        map(x => x.trim()),
        distinctUntilChanged(),
        map(keyword => {
          return this.products.filter(show => show.name.indexOf(keyword) !== -1);
        }));
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.filterProducts(this.searchQuery);
  }

  ngOnInit() {
    this.filterProducts(this.searchQuery);
    // this.showsAfterFilter$ = this.searchTermChanged
    //   .pipe(debounceTime(200),
    //     map(x => x.trim()),
    //     distinctUntilChanged(),
    //     map(keyword => {
    //       return this.products.filter(show => show.name.indexOf(keyword) !== -1);
    //     }));
  }

  onProductSelected(product: Product) {
    this.selectedProduct = product;
    this.productSelected.emit(product);
  }

  onProductDeleted(product: Product) {
    this.productDeleted.emit(product);
  }

  filterProducts(val: string) {
    this.searchTermChanged.next(val);
  }
}
