import { Product } from './../../interfaces/product';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Output()
  productSelected = new EventEmitter<Product>();
  @Output()
  productDeleted = new EventEmitter<Product>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchQuery = '';
  searchTermChanged = new BehaviorSubject<string>(this.searchQuery);
  productsAfterFilter$: Observable<Product[]>;
  productsAfterFilter: Product[];

  constructor() {
    this.productsAfterFilter$ = this.searchTermChanged.pipe(
      debounceTime(200),
      map(x => x.trim()),
      // distinctUntilChanged(),
      map(keyword => {
        const filtered = this.products.filter(
          product => product.name.indexOf(keyword) !== -1
        );
        return filtered;
      })
    );

    this.productsAfterFilter$.takeUntil(this.destroy$).subscribe(products => {
      this.productsAfterFilter = products;
    });
  }

  ngOnChanges(): void {
    if (this.searchQuery) {
      this.filterProducts(this.searchQuery);
    } else {
      this.productsAfterFilter = this.products;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

  onProductSelected(product: Product) {
    this.selectedProduct = product;
    this.productSelected.emit(product);
  }

  onProductDeleted(product: Product) {
    this.productDeleted.emit(product);
  }

  filterProducts(val: string) {
    console.log('filterProducts');
    this.searchQuery = val;
    this.searchTermChanged.next(val);
  }
}
