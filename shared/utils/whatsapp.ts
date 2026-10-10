/**
 * WhatsApp Deep-Link Builder for Sidawi Garage
 * Generates direct booking and technical inquiry links with pre-filled messages.
 */

export interface BookingIntent {
  oilName?: string;
  viscosity?: string;
  brandName?: string;
  carModel?: string;
  serviceType?: 'motor_oil' | 'transmission_flush' | 'differential' | 'general';
}

/**
 * Clean phone number to international WhatsApp format (digits only)
 */
export function sanitizeWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[^0-9]/g, '');
}

/**
 * Builds a direct WhatsApp chat link with an encoded professional inquiry message
 */
export function buildWhatsAppBookingUrl(
  phoneNumber: string,
  intent: BookingIntent = {}
): string {
  const cleanPhone = sanitizeWhatsAppNumber(phoneNumber);
  const parts: string[] = ['Hello Mahmoud, I would like to consult with you regarding my car:'];

  if (intent.carModel) {
    parts.push(`🚗 Car Model: ${intent.carModel}`);
  }

  if (intent.serviceType) {
    const serviceLabels: Record<string, string> = {
      motor_oil: 'Engine / Motor Oil Service',
      transmission_flush: 'Automatic / DCT Transmission Gear Oil Flush',
      differential: 'Differential / Axle Fluid Service',
      general: 'Specialized Fluid Inspection',
    };
    parts.push(`🔧 Service Needed: ${serviceLabels[intent.serviceType] || intent.serviceType}`);
  }

  if (intent.oilName) {
    const oilSpec = intent.viscosity ? `${intent.oilName} (${intent.viscosity})` : intent.oilName;
    parts.push(`🛢️ Selected Oil: ${oilSpec}`);
  }

  parts.push('Could you please advise on availability, OEM spec matching, and scheduling an appointment at Sidawi Garage? Thank you!');

  const message = parts.join('\n');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
