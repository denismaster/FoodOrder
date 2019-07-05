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