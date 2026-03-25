import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { ApiResponse } from '../interfaces/response.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, '../../data/products.json');

@Injectable()
export class ProductService {
  findAll(): ApiResponse<Product[]> {
    const readProductData = readFileSync(filePath, 'utf-8');
    const productData = JSON.parse(readProductData) as Product[];
    
    return {
      success: true,
      data: productData,
      message: 'Fetched products successfully',
    };
  }
}
