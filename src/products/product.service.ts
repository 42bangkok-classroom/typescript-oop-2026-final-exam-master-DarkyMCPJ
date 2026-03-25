import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { ApiResponse } from '../interfaces/response.interface';
import * as fs from 'fs';
const readProductData = fs.readFileSync('data/products.json', 'utf-8');
const productData = JSON.parse(readProductData) as Product[];
@Injectable()
export class ProductService {
  findAll(): ApiResponse<Product[]> {
    return productData;
  }
  All(): ApiResponse<Product[]> {
    return {
      success: true,
      data: productData,
      message: 'Fetched products successfully',
    };
}
}
