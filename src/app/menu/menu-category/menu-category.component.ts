import { Component, Input } from '@angular/core';
import { ProductCategory } from '../../models';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
})
export class MenuCategoryComponent {
    @Input()
    category: ProductCategory = undefined;
}
