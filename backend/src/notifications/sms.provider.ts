export interface SmsPayload {
  recipientPhone: string;
  message: string;
}

export class SmsProvider {
  async sendSms(payload: SmsPayload): Promise<{ messageId: string }> {
    console.log('SMS provider send', payload);
    return { messageId: 'stubbed-sms-id' };
  }
}
