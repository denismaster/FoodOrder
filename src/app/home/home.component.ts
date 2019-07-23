import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { MenuService } from '../menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    menu$: Observable<ProductCategory[]>;
    orderId: string;

    constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private orderService: OrderService) { }

    ngOnInit() {
        const order = this.activatedRoute.snapshot.queryParams.order;

        if (!order) {
            this.orderService.createOrder();
            this.orderId = sessionStorage.getItem('current_order');
        }
        else {
            this.orderId = order;
            sessionStorage.setItem('current_order', order);
        }
        
        this.menu$ = this.menuService.getMenu().pipe(take(1));
    }
}
