import { Component, OnInit } from '@angular/core';
import { ProductCategory, Order, UpdateOrderAction } from '../models';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators'
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

    order$: Observable<Order>;

    constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private orderService: OrderService) { }

    async ngOnInit() {
        const order = this.activatedRoute.snapshot.queryParams.order;

        if (!order) {
            await this.orderService.createOrder();
            this.orderId = sessionStorage.getItem('current_order');
        }
        else {
            this.orderId = order;
            sessionStorage.setItem('current_order', order);
        }

        this.menu$ = this.menuService.getMenu().pipe(take(1));

        this.order$ = this.orderService.getOrder(this.orderId);
        this.order$.pipe(filter(order => !!order)).subscribe(order => {
            if (order.dishes && !order.dishes.length) {
                this.orderService.handleOrderClearing();
            }
        })
    }

    updateOrder(orderUpdate: UpdateOrderAction) {
        this.orderService.updateOrder(this.orderId, orderUpdate);
    }

    clearOrder() {
        alert(this.orderId);
        this.orderService.clearOrder(this.orderId);
    }
}
