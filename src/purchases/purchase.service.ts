import { Injectable } from '@nestjs/common';
import { Purchase } from './purchase.interface';
import * as fs from 'fs';
@Injectable()
export class PurchaseService {
  findAll(
    customerName?: string,
  ): Purchase[] {
    const rawdata = fs.readFileSync('data/purchases.json', 'utf-8');
    let data = JSON.parse(rawdata) as Purchase[];
    if (customerName)
      data = data.filter((purchase) => purchase.customerName == customerName);
    return data;
  }
  findOne(id: number) {
    const rawdata = fs.readFileSync('data/purchases.json', 'utf-8');
    let data = JSON.parse(rawdata) as Purchase[];
    data = data.filter((purchase) => purchase.id == id);
    if (!data) return null;
    return data[0];
  }
}
