import { describe, expect, it } from 'vitest';
import { buildWhatsAppBookingUrl, sanitizeWhatsAppNumber } from '../../shared/utils/whatsapp';

describe('WhatsApp Deep Link Helper', () => {
  it('sanitizes telephone numbers properly', () => {
    expect(sanitizeWhatsAppNumber('+961 70 828 290')).toBe('96170828290');
    expect(sanitizeWhatsAppNumber('00961-70-123456')).toBe('0096170123456');
  });

  it('builds a rich booking URL with encoded details', () => {
    const url = buildWhatsAppBookingUrl('+961 70 828 290', {
      oilName: 'Liqui Moly Molygen New Generation 5W-40',
      viscosity: '5W-40',
      carModel: 'BMW M4 F82',
      serviceType: 'motor_oil',
    });

    expect(url).toContain('https://wa.me/96170828290?text=');
    const decodedMessage = decodeURIComponent(url.replace('https://wa.me/96170828290?text=', ''));
    expect(decodedMessage).toContain('BMW M4 F82');
    expect(decodedMessage).toContain('Engine / Motor Oil Service');
    expect(decodedMessage).toContain('Liqui Moly Molygen New Generation 5W-40');
    expect(decodedMessage).toContain('Sidawi Garage');
  });
});
