import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductCategory, UpdateOrderAction } from '../../models';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
})
export class MenuCategoryComponent {
    @Input()
    category: ProductCategory = undefined;

    @Output()
    select = new EventEmitter<UpdateOrderAction>()

    handleItemClick($event:UpdateOrderAction) {
      let el: UpdateOrderAction = { ...$event, category: this.category.name };
      this.select.emit(el)
    }
}
