export interface Product {
    name: string;
    weight?: number | string;
    price?: number;
    additionalInformation?: string;
}

export interface ProductCategory {
    name: string;
    products: Product[]
}

export interface UpdateOrderAction {
    action: "add" | "remove"
    name: string;
    category?: string;
    price: number;
}

export interface OrderItem {
    id: string,
    name: string;
    category: string,
    price: number
}
export interface Order {
    dishes: OrderItem[]
}
