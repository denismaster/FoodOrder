import { Component, Input } from '@angular/core';
import { ProductCategory } from '../models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
    @Input()
    menu: ProductCategory[] = []
}