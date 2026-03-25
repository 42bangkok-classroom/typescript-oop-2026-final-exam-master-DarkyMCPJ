import { Controller, Get, Param, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(
    @Query('customerName') customerName?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return {
      success: true,
      data: this.purchaseService.findAll(customerName),
      message: 'Fetched purchases successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return  {
      success: true,
      data: this.purchaseService.findOne(id),
      message: 'Fetched purchase successfully',
    };
  }
}

