import { Product } from './../../interfaces/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-root',
  templateUrl: './products-root.component.html',
  styleUrls: ['./products-root.component.scss']
})
export class ProductsRootComponent implements OnInit, OnDestroy {
  
  products$: Observable<Product[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedProduct: Product;
  newProductId = 0;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.products$ = this.productService.products$;
    this.products$.takeUntil(this.destroy$).subscribe(products => {
      if (products != null) {
        let maxId = this.newProductId;
        products.map(function(obj) {
          if (obj.id > maxId) {
            maxId = obj.id;
          }
        });
        this.newProductId = maxId + 1;
      }
    });
    this.productService.getAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
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
