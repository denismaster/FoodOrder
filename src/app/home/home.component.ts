import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  menu$: Observable<ProductCategory[]>;

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.menu$ = this.menuService.getMenu().pipe(take(1));
  }
}
