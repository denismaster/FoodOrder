import { Order } from '../models';
import { Input, Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-order-status',
    templateUrl: './order-status.component.html',
})
export class OrderStatusComponent{
    @Input()
    order: Order = null;

    @Output()
    clearOrder = new EventEmitter<void>();

    get dishes() {
        if(!this.order || !this.order.dishes) return [];

        return this.order.dishes;
    }

    get categorizedDishes() {
        return this.dishes.reduce((prev, current) => {
            if (!prev[current.category]) {
                prev[current.category] = [{
                    name: current.name,
                    amount: 1
                }]
            }
            else {
                let productsInCategory: { name: string, amount: number }[] = prev[current.category];
                let currentDishIndex = productsInCategory.findIndex(p => p.name == current.name)
                if (currentDishIndex !== -1) {
                    productsInCategory[currentDishIndex].amount++;
                }
                else {
                    productsInCategory.push({
                        name: current.name,
                        amount: 1
                    });
                }

            }
            return prev;
        }, {});
    }

    get dishCategories() {
        return Object.keys(this.categorizedDishes);
    }

    get totalPrice() {
        return this.dishes.reduce((p, c) => {
            return p + c.price
        }, 0)
    }

}