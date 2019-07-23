import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { Order } from './models';

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

    clearOrder() {
        this._clear$.next();
    }



    createOrder() {
        let orderId = uuid();
        sessionStorage.setItem('current_order', orderId)
        this.afs.collection("orders").doc<Order>(orderId).set({ dishes: [] })
            .then(_ => {
                this.router.navigate(['/'], { queryParams: { 'order': orderId } });
            })
            .catch(err => {
                alert(err);
            })
    }
}
