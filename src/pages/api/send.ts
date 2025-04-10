import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { supabase } from '@/utils/supabaseClient';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, messageType, userId } = req.body;

  if (!phone || !messageType || !userId) {
    return res.status(400).json({ message: 'Missing phone, message type, or user ID' });
  }

  const messages: { [key: string]: string } = {
    'Appointment Reminder': 'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
    'Healing Follow-up': 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
    'We Miss You': 'Hi, this is Seven Tattoo Studio. It’s been a while! If you\'re thinking about your next piece, we’d love to help.',
    'Thank You': 'Thank you for choosing Seven Tattoo Studio! We appreciate you.',
    'Confirmation': 'This is Seven Tattoo Studio confirming your appointment. See you soon!',
  };

  const body = messages[messageType];

  if (!body) {
    return res.status(400).json({ message: 'Invalid message type' });
  }

  try {
    const message = await client.messages.create({
      body,
      from: fromNumber,
      to: phone,
    });

    await supabase.from('sms_logs').insert([
      {
        phone,
        message_type: messageType,
        sent_by: userId,
      },
    ]);

    res.status(200).json({ message: 'SMS sent successfully', sid: message.sid });
  } catch (error) {
    console.error('Twilio send failed:', error);
    res.status(500).json({ message: 'Failed to send SMS', error });
  }
}

