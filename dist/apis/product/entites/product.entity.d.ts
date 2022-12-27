import { IProduct } from 'interfaces/product.interface';
import { Product } from '../model/product.schema';
export interface ProductEntity extends IProduct {
}
export declare class ProductEntity {
    constructor(partial: Partial<Product>);
}
