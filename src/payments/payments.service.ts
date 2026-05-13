import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  cashOnDelivery(orderId: string) {
    return {
      success: true,
      message: 'Order placed successfully',
      orderId,
      paymentMethod: 'Cash On Delivery',
      paymentStatus: 'Pending',
    };
  }
}