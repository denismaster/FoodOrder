import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { Order, UpdateOrderAction } from './models';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private _clear$ = new Subject<void>();

    constructor(private router: Router, private afs: AngularFirestore, ) {

    }

    get clearOrder$() {
        return this._clear$.asObservable();
    }

    clearOrder(orderId: string) {
        this.afs.doc<Order>(`orders/${orderId}`).update({
            dishes: []
        })
        this._clear$.next();
    }

    handleOrderClearing(){
        this._clear$.next();
    }

    getOrder(orderId:string): Observable<Order> {
        const orderDoc = this.afs.doc<Order>(`orders/${orderId}`);
        return orderDoc.valueChanges();
    }

    async updateOrder(orderId: string, update: UpdateOrderAction) {
        const order = await this.afs.doc<Order>(`orders/${orderId}`).valueChanges().pipe(take(1)).toPromise();

        if (update.action == "add") {
          this.afs.doc<Order>(`orders/${orderId}`).update({
            dishes: <any>firebase.firestore.FieldValue.arrayUnion({
              id: uuid(),
              name: update.name,
              category: update.category,
              price: update.price
            })
          })
        }
        else {
          const dishIds = order.dishes.filter(d=>d.name==update.name).map(d=>d.id);
          const idToRemove = dishIds[0];
          if(!idToRemove) return;
          this.afs.doc<Order>(`orders/${orderId}`).update({
            dishes: <any>firebase.firestore.FieldValue.arrayRemove({
              id: idToRemove,
              name: update.name,
              category: update.category,
              price: update.price
            })
          })
        }
      }

    async createOrder() {
        let orderId = uuid();
        sessionStorage.setItem('current_order', orderId)
        return this.afs.collection("orders").doc<Order>(orderId).set({ dishes: [] })
            .then(_ => {
                return this.router.navigate(['/'], { queryParams: { 'order': orderId } });
            })
            .catch(err => {
                alert(err);
            })
    }
}
