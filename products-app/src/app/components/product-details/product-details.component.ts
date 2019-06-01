import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnChanges {
  @Input() product: Product;
  @Output()
  productUpdated = new EventEmitter<Product>();
  detailsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.detailsFormGroup = this.formBuilder.group({
      formControlPrice: [this.product.price, Validators.required]
    });
  }

  saveProduct() {
    console.log(this.detailsFormGroup.value);
  }
}