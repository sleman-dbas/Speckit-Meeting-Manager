import { Injectable } from '@nestjs/common';
import { SmsProvider, SmsPayload } from './sms.provider';

@Injectable()
export class NotificationsService {
  private readonly provider = new SmsProvider();

  async sendSms(recipientId: string, message: string, recipientPhone: string) {
    const payload: SmsPayload = {
      recipientPhone,
      message,
    };

    return this.provider.sendSms(payload);
  }
}
