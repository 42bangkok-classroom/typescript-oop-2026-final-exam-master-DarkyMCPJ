import { Controller, Get, Query, Param } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}
  @Get()
  getPurchases(
    @Query('customerName') customerName?: string,
  ) {
    return {
      success: true,
      data: this.purchaseService.findAll(customerName),
      message: 'Fetched purchases successfully',
    };
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return null;
    const data = this.purchaseService.findOne(id);
    if (!data) return null;
    return {
      success: true,
      data: this.purchaseService.findOne(id) ?? null,
      message: 'Fetched purchase successfully',
    };
  }
}