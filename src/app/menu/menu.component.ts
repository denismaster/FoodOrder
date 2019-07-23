import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductCategory, UpdateOrderAction } from '../models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
    @Input()
    menu: ProductCategory[] = []

    @Output()
    select = new EventEmitter<UpdateOrderAction>()
}