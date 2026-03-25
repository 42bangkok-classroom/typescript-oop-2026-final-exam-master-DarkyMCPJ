import { Injectable } from '@nestjs/common';
import { Purchase } from './purchase.interface';
import { ApiResponse } from '../interfaces/response.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, '../../data/purchases.json');

@Injectable()
export class PurchaseService {
  findAll(customerName?: string, startDate?: string, endDate?: string): ApiResponse<Purchase[]> {
    const readPurchaseData = readFileSync(filePath, 'utf-8');
    let purchaseData = JSON.parse(readPurchaseData) as Purchase[];
    let isFiltered = false;

    if (customerName) {
      purchaseData = purchaseData.filter((p) =>
        p.customerName.toLowerCase().includes(customerName.toLowerCase()),
      );
      isFiltered = true;
    }

    if (startDate) {
      purchaseData = purchaseData.filter((p) => p.purchaseDate >= startDate);
      isFiltered = true;
    }

    if (endDate) {
      purchaseData = purchaseData.filter((p) => p.purchaseDate <= endDate);
      isFiltered = true;
    }

    return {
      success: true,
      data: purchaseData,
      message: isFiltered ? 'Filtered purchases successfully' : 'Fetched purchases successfully',
    };
  }

  findOne(id: number): ApiResponse<Purchase | null> {
    const readPurchaseData = readFileSync(filePath, 'utf-8');
    const purchaseData = JSON.parse(readPurchaseData) as Purchase[];
    const purchase = purchaseData.find((p) => p.id === id);

    if (!purchase) {
      return {
        success: false,
        data: null,
        message: `Purchase with id ${id} not found`,
      };
    }

    return {
      success: true,
      data: purchase,
      message: 'Fetched purchase successfully',
    };
  }
}