import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductCategory } from '../models';

@Injectable({ providedIn: 'root' })
export class MenuService {
    getMenu(): Observable<ProductCategory[]> {
        return of([
            {
                "name": "First dishes",
                "products": [
                    {
                        "name": "Chicken soup",
                        "weight": 300,
                        "price": 100
                    },
                    {
                        "name": "Borscht",
                        "weight": "300/110",
                        "price": 150
                    },
                    {
                        "name": "Mushroom cream soup",
                        "weight": 300,
                        "price": 150
                    },
                    {
                        "name": "Okroshka",
                        "weight": 300,
                        "price": 120
                    }
                ]
            },
            {
                "name": "Sausages",
                "products": [
                    {
                        "name": "Pig-Beef Sausages",
                        "weight": 100,
                        "price": 95
                    },
                    {
                        "name": "Chicken with bacon",
                        "weight": 100,
                        "price": 85
                    },
                    {
                        "name": "Sausages with lamb",
                        "weight": 100,
                        "price": 95
                    }
                ]
            },
            {
                "name": "Salads",
                "products": [
                    {
                        "name": "Salad with cabbage and sour cream",
                        "additionalInformation": "Filled with sour cream",
                        "weight": 200,
                        "price": 105
                    },
                    {
                        "name": "Vegetable salad",
                        "additionalInformation": "Filled with vegetable oil",
                        "weight": 200,
                        "price": 105
                    },
                    {
                        "name": "Salad with smoked salmon",
                        "weight": 150,
                        "price": 160
                    },
                    {
                        "name": "Salad with grilled chicken",
                        "additionalInformation": "Honey-mustard fill",
                        "weight": 150,
                        "price": 140
                    }
                ]
            },
            {
                "name": "Side dishes",
                "products": [
                    {
                        "name": "French fries",
                        "weight": 120,
                        "price": 60
                    },
                    {
                        "name": "Tagliatelle",
                        "weight": 150,
                        "price": 65
                    },
                    {
                        "name": "Spaghetti",
                        "weight": 150,
                        "price": 50
                    },
                    {
                        "name": "Potato pancakes with creamy mushroom sauce",
                        "weight": 180,
                        "price": 110
                    }
                ]
            }
        ])
    }
}