import { Product } from './../../interfaces/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { ProductsService } from 'src/app/services/products.service';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-products-root',
  templateUrl: './products-root.component.html',
  styleUrls: ['./products-root.component.scss']
})
export class ProductsRootComponent implements OnInit, OnDestroy {
  
  products: Product[];
  productsAfterFilter$: Observable<Product[]>;
  searchTermChanged = new BehaviorSubject<string>('');
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedProduct: Product;
  newProductId = 0;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.products$.takeUntil(this.destroy$).subscribe(products => {
      this.products = products;
      if (products != null) {
        let maxId = this.newProductId;
        products.map((obj) => {
          if (obj.id > maxId) {
            maxId = obj.id;
          }
        });
        this.newProductId = maxId + 1;
      }
    });
    this.productService.getAll();

    this.productsAfterFilter$ = this.searchTermChanged
      .pipe(debounceTime(200),
        map(x => x.trim()),
        distinctUntilChanged(),
        map(keyword => {
          return this.products.filter(show => show.name.indexOf(keyword) !== -1);
        }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

  filterProducts(val: string) {
    this.searchTermChanged.next(val);
  }

  onProductSelected(product: Product) {
    this.selectedProduct = product;
  }

  async onProductUpdated(product: Product) {
    if (product.id > -1) {
    await this.productService.update(product);
    } else {
      product.id = this.newProductId;
      await this.productService.add(product);
    }
    this.selectedProduct = null;
  }

  async onProductDeleted(product: Product) {
    await this.productService.delete(product);
    this.selectedProduct = null;
  }

  onAddClicked() {
    // console.log('newProductId: ', this.newProductId);
    this.selectedProduct = {
      id: -1,
      name: 'New Product',
      desc: '',
      price: 0,
      creationDate: new Date()
    };
  }
}
