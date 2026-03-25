import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { ApiResponse } from '../interfaces/response.interface';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  findAll(): ApiResponse<Product[]> {
    const readProductData = fs.readFileSync('data/products.json', 'utf-8');
    const productData = JSON.parse(readProductData) as Product[];
    return productData;
  }
}
A