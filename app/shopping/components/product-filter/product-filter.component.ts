import { CategoryService } from 'shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{

  categories$;
  @Input('category') category="";

  constructor(categoriesService:CategoryService) {
    this.categories$=categoriesService.getAll(); 
   }
}
