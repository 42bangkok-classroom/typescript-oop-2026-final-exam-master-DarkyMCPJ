import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return {
      success: true,
      data: this.productService.findAll(),
      message: 'Fetched products successfully',
    };
  }
}
